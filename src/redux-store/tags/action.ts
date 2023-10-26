import { ADD_TAGS, DEL_TAGS, SWITCH_TAGS } from "./constant";

export const addTags = (data: { path: string, label: string }) => ({
    type: ADD_TAGS,
    payload: data
})

export const delTags = (data: { path: string, history: any }) => ({
    type: DEL_TAGS,
    payload: data
})

export const switchTags = (data: { path: string }) => ({
    type: SWITCH_TAGS,
    payload: data
})