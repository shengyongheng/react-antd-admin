import React, { FC, useState, useEffect } from 'react'
import { Form, Input, Select } from 'antd';
import { ICommonFormProps, IItemTypes } from "./models"
const { Password } = Input
const CommonForm = (props: ICommonFormProps): React.JSX.Element => {
    const {
        formItems,
        handleSubmit,
        children
    } = props;

    const [form] = Form.useForm();

    const renderFormItems = (itemType: IItemTypes, itemProps: any) => {
        switch (itemType) {
            case 'Input': return <Input {...itemProps} />;
            case 'Password': return <Password {...itemProps} />;
            case 'Select': return <Select {...itemProps} />;
            default: return null;
        }
    }

    const onFinish = (value: any) => {
        form.validateFields().then(v => {
            handleSubmit()
        }).catch(err => {
            console.log(err);
        })
    }

    const onFinishFailed = ({ values, errorFields, outOfDate }: any) => {
        console.log('表单验证失败', values, errorFields, outOfDate);
    }

    return (
        <div className='user-login'>
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            // initialValues={initialValues}
            >
                {
                    formItems.map((item, index) => {
                        return <Form.Item
                            label={item.label}
                            name={item.name}
                            required={item.required}
                            rules={item.rules}
                            key={item.name + String(index)}
                        >
                            {renderFormItems(item.itemType, item.props)}
                        </Form.Item>
                    })
                }
                {children}
            </Form>
        </div >
    )
}

export default CommonForm
