import { SET_TOKEN } from "./constant";

export const setToken = (data: string) => ({
    type: SET_TOKEN,
    payload: data
})