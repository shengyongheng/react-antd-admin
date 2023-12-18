import { $http } from '@/utils/request'
import { get } from "lodash";

// 获取表格数据
export const getTableData = async <T>(): Promise<T> => {
    const response = await $http.get<T>('/tableData');
    console.log(response, 'response');
    return get(response, 'data.data');
}