/// <reference types="react-scripts" />
declare module 'react-router-dom'

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
