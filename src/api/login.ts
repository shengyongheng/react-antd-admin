import { $http } from '@/utils/request'
import { get } from "lodash";

// 登录
export const login = async <T, K>(data: K): Promise<T> => {
    const response = await $http.post<T>('/api/access/login', data);
    return get(response, 'data.data');
}

// 注册
export const register = async <T, K>(data: K): Promise<T> => {
    const response = await $http.post<T>('/api/access/register', data);
    return get(response, 'data.data');
}

