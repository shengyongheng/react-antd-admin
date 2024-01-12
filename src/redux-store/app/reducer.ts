import { SET_INLINECOLLAPSED } from './constant'
import { setStorage, getStorage } from '@utils/storages'

export interface IAppInit {
    inlineCollapsed: boolean;
}

const initStates: IAppInit = getStorage('app') || {
    inlineCollapsed: false
}

const appReducer = (initState: IAppInit = initStates, action: { type: string; payload: any }) => {
    const { payload } = action
    switch (action.type) {
        case SET_INLINECOLLAPSED:
            return { ...initState, inlineCollapsed: !initState.inlineCollapsed };
        default:
            return initState
    }
}

export default appReducer