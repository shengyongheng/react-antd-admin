import { SET_TOKEN } from './constant'
export interface IUserInit {
    token: string;
    userType: string
}

const initStates: IUserInit = {
    token: '',
    userType: ''
}

const userReducer = (initState: { token: string, userType: string } = initStates, action: { type: string; payload: any }) => {
    const { payload } = action
    switch (action.type) {
        case SET_TOKEN:
            initState = payload
            return { ...initState };
        default:
            return initState
    }
}

export default userReducer