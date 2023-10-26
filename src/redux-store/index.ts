import { legacy_createStore as createStore, combineReducers } from 'redux'
import userReducer from "./user/reducer"
import tagsReducer from "./tags/reducer"


const allReducers = combineReducers({ user: userReducer, tags: tagsReducer })

const store = createStore(allReducers);

export default store