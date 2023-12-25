import React from "react"
import type { FormInstance } from 'antd/es/form';
export type IItemTypes = 'Input' | 'Password' | 'Select' | 'RangePicker' | 'DatePicker' | 'Checkbox' | 'InputNumber'

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
    initialValues?: any
}

export interface IRefProps {
    form: FormInstance<any>,
    onFinish: (...args: any[]) => void
}

// 判断两个TS类型是否相同
type IsEqual<T, K> = (<M>() => M extends T ? 1 : 2) extends (<M>() => M extends K ? 1 : 2) ? true : false

// type II = Pick<ICommonFormProps, 'formItems'>

type II = ICommonFormProps['formItems'] // 获取属性值的类型

// 结果
type E = IsEqual<II, IFormItemProps[]>
