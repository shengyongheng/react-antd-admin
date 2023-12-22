import { $http } from '@/utils/request'
import { get } from "lodash";

// 获取用户表格数据
export const getTableData = async <T, K>(params: K): Promise<T> => {
    const response = await $http.get<T>('/api/user/list');
    return get(response, 'data.data');
}

// 新增用户
export const addUsersApi = async <T, K>(data: K): Promise<T> => {
    const response = await $http.post<T>('/api/user/add', data);
    return get(response, 'data.data');
}

// 删除用户
export const deleteUsersApi = async <T, K>(id: K): Promise<T> => {
    const response = await $http.delete<T>('/api/user/delete', {
        data: {
            id
        }
    });
    return get(response, 'data.data');
}

// 获取用户详情
export const getUsersDetailApi = async <T, K>(id: K): Promise<T> => {
    const response = await $http.get<T>('/api/user/detail', {
        params: {
            id
        }
    });
    return get(response, 'data.data');
}