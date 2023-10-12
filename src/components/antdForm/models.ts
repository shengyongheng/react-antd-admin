import React from "react"

export type IItemTypes = 'Input' | 'Password' | 'Select'

export interface IFormItemProps {
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
