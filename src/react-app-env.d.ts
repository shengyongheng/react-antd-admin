/// <reference types="react-scripts" />
declare module 'react-router-dom'

type IUserType = Array<'users' | 'admin'>

interface Routes {
  path: string
  component: any
  exact?: boolean
  whiteRoute: boolean
  children?: Routes[]
  meta?: {
    title: string
    authRequired?: Array<string>
  }
}

interface IMenuItem {
  key: string
  label: string
  icon?: React.ReactNode
  children?: IMenuItem[]
  authRequired?: string[]
}

type MenuItemWithAuth<T = Required<MenuProps>['items'][number], K = { authRequired: IUserType }> = Array<T & K & { children?: Array<T & K & { children?: Array<T & K> }> }>

type setStateProp<T> = Dispatch<SetStateAction<T>>