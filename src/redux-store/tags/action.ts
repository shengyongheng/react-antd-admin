import { ADD_TAGS, DEL_TAGS, SWITCH_TAGS, CLEAR_OTHER_TAGS, CLEAR_ALL_TAGS } from "./constant";

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

export const clearOtherTags = () => ({
    type: CLEAR_OTHER_TAGS,
    payload: null
})

export const clearALLTags = () => ({
    type: CLEAR_ALL_TAGS,
    payload: null
})