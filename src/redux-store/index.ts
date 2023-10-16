import { legacy_createStore as createStore, combineReducers } from 'redux'
import userReducer from "./user/reducer"


const allReducers = combineReducers({ user: userReducer })

const store = createStore(allReducers);

export default store