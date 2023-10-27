import axios from 'axios'
import { message } from 'antd'
import baseURL from '../config'
import { getToken } from './storages'
import type {
    AxiosInstance,
    AxiosRequestConfig, // 旧版本配置
    InternalAxiosRequestConfig, // 最新版本配置
    AxiosResponse,
} from 'axios'
// 环境变量取值
let env = process.env.NODE_ENV as 'development' | 'production';
// 假设我们某个项目后端接口不管请求成功与失败，返回的结构永远是code、message、results的话我们可以定义一个这样的数据类型。
interface Result<T> { // T 代表后端返回数据的格式
    code: number;
    message: string;
    results: T;
}
export class Request {
    // axios 实例
    instance: AxiosInstance;
    // 基础配置，url和超时时间
    baseConfig: AxiosRequestConfig = { baseURL: baseURL[env], timeout: 60000 }
    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(Object.assign(this.baseConfig, config));
        // 请求拦截器
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = getToken() as string | null;
                if (token) {
                    config.headers!.Authorization = token;
                }
                return config
            },
            (err: any) => {
                // 请求错误，这里可以用全局提示框进行提示
                message.error(err)
                return Promise.reject(err)
            },
        )
        // 响应拦截器
        this.instance.interceptors.response.use(
            (res: AxiosResponse) => {
                // 直接返回res，当然你也可以只返回res.data
                // 系统如果有自定义code也可以在这里处理
                return res.data
            },
            (err: any) => {
                // 这里用来处理http常见错误，进行全局提示
                let errMessage = "";
                let status = err.response?.status;
                switch (status) {
                    case 400:
                        errMessage = "请求错误(400)";
                        break;
                    case 401:
                        errMessage = "未授权，请重新登录(401)";
                        // 这里可以做清空storage并跳转到登录页的操作
                        break;
                    case 403:
                        errMessage = "拒绝访问(403)";
                        break;
                    case 404:
                        errMessage = "请求出错(404)";
                        break;
                    case 408:
                        errMessage = "请求超时(408)";
                        break;
                    case 500:
                        errMessage = "服务器错误(500)";
                        break;
                    case 501:
                        errMessage = "服务未实现(501)";
                        break;
                    case 502:
                        errMessage = "网络错误(502)";
                        break;
                    case 503:
                        errMessage = "服务不可用(503)";
                        break;
                    case 504:
                        errMessage = "网络超时(504)";
                        break;
                    case 505:
                        errMessage = "HTTP版本不受支持(505)";
                        break;
                    default:
                        errMessage = `连接出错(${status})!`;
                }
                // 这里错误消息可以使用全局弹框展示出来
                message.error(errMessage)
                // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
                return Promise.reject(err.response)
            },
        )
    }
    // 定义请求方法
    public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.instance.request(config);
    };
    public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
        return this.instance.get(url, config);
    };
    public post<T = any>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
        return this.instance.post(url, data, config);
    };
    public put<T = any>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
        return this.instance.put(url, data, config);
    };
    public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
        return this.instance.delete(url, config);
    };
}
// 默认导出Request实例
export default new Request({})