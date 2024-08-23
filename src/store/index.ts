import { legacy_createStore as createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import appReducer from './app/reducer'
import userReducer from './user/reducer'
import tagsReducer from './tags/reducer'

const persistConfig = {
  key: 'redux_root',
  storage,
  whitelist: ['app', 'user', 'tags'], // 白名单，只持久化指定reducer的状态
  blackList: [], // 黑名单
}

const allReducers = combineReducers({ user: userReducer, tags: tagsReducer, app: appReducer })

const persistedReducer = persistReducer(persistConfig, allReducers)

const store = createStore(persistedReducer)

export const persistor = persistStore(store)

export default store
