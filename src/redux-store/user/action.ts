import { SET_TOKEN } from "./constant";

export const setToken = (data: { token: string, userType: string }) => ({
    type: SET_TOKEN,
    payload: data
})