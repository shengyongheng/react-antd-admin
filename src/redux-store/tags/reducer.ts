import { ADD_TAGS, DEL_TAGS, SWITCH_TAGS } from './constant'
import { setStorage, getStorage } from '@utils/storages'

export interface ITagsInit {
    tagsList: Array<{ path: string, label: string, params?: any }>
    activeTag: string
}

const initStates: ITagsInit = getStorage('tags-list') || {
    tagsList: [
        {
            path: '/home',
            label: '首页',
            params: {}
        }
    ],
    activeTag: "/home"
}

const tagsReducer = (initState: ITagsInit = initStates, action: { type: string; payload: any }) => {
    const { payload } = action
    let { tagsList, activeTag } = initState
    switch (action.type) {
        case DEL_TAGS:
            tagsList.forEach((item: any, index: number) => {
                if (item.path === payload.path) {
                    console.log(index, tagsList);
                    if (activeTag === payload.path) {
                        tagsList.splice(index, 1)
                        activeTag = tagsList[index - 1].path
                    } else {
                        tagsList.splice(index, 1)
                    }
                }
            })
            setStorage('tags-list', { tagsList, activeTag })
            return { tagsList, activeTag };
        case ADD_TAGS:
            if (tagsList.every(item => item.path !== payload.path)) {
                tagsList.push(payload)
                activeTag = payload.path
            }
            setStorage('tags-list', { tagsList, activeTag })
            return { tagsList, activeTag };
        case SWITCH_TAGS:
            activeTag = payload.path
            setStorage('tags-list', { tagsList, activeTag })
            return { tagsList, activeTag };
        default:
            return initState
    }
}

export default tagsReducer