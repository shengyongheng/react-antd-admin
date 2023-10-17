import React from "react"

export type IItemTypes = 'Input' | 'Password' | 'Select'

interface IFormItemProps {
    label: React.ReactNode
    name: string
    itemType: IItemTypes
    required?: boolean
    rules?: Array<{ validator: (_: any, value: any) => Promise<void> | undefined }> | undefined
    props?: any
}

export interface ICommonFormProps {
    handleSubmit: any
    formItems: IFormItemProps[]
    formConfig?: any
    children?: React.ReactElement
}

// 判断两个TS类型是否相同
type IsEqual<T, K> = (<M>() => M extends T ? 1 : 2) extends (<M>() => M extends K ? 1 : 2) ? true : false

// type II = Pick<ICommonFormProps, 'formItems'>

type II = ICommonFormProps['formItems'] // 获取属性值的类型

// 结果
type E = IsEqual<II, IFormItemProps[]>
