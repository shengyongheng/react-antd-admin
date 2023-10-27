/**
 * @desc 获取token
 */
export const getToken = (): string | null => {
    return window.localStorage.getItem('token');
}

/**
 * localStorage 设置
 * @param {String} key 键
 * @param {String} val 值
 */
export function setStorage(key: string, val: any) {
    try {
        if (!key) return
        return localStorage.setItem(key, JSON.stringify(val))
    } catch (err) { }
}

/**
 * localStorage 获取
 * @param {String} key 键
 * @return {Boolean} key 对应 localStorage 的值
 */
export function getStorage(key: string) {
    try {
        if (!key) return ''
        return JSON.parse(localStorage.getItem(key) || '')
    } catch (err) {
        return ''
    }
}

/**
 * 清除 localStorage，若不填参数 key ，则清除所有 localStorage
 * @param {String} key 键
 * @return {Boolean} 是否清除成功
 */
export function removeStorage(key: string) {
    try {
        if (typeof key === 'undefined') return localStorage.clear()
        return localStorage.removeItem(key)
    } catch (err) {
        return false
    }
}