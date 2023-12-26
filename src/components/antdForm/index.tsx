import React, { forwardRef, useImperativeHandle } from 'react'
import { Form, Input, Checkbox, Select, InputNumber, DatePicker } from 'antd';

import { ICommonFormProps, IItemTypes, IRefProps } from "./models"
const { Password } = Input
const { RangePicker } = DatePicker;

const CommonForm = forwardRef<IRefProps, ICommonFormProps>((props, ref): React.JSX.Element => {
    const {
        formItems,
        handleSubmit,
        children,
        initialValues
    } = props;

    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
        form,
        onFinish
    }));

    const renderFormItems = (itemType: IItemTypes, itemProps: any) => {
        switch (itemType) {
            case 'Input': return <Input {...itemProps} />;
            case 'Password': return <Password {...itemProps} />;
            case 'Select': return <Select {...itemProps} />;
            case 'DatePicker': return <DatePicker {...itemProps} />;
            case 'RangePicker': return <RangePicker {...itemProps} />;
            case 'Checkbox': return <Checkbox.Group  {...itemProps} />;
            case 'InputNumber': return <InputNumber {...itemProps} />;
            default: return null;
        }
    }

    const onFinish = (...args: any[]) => {
        form.validateFields()
            .then((v) => {
                handleSubmit(v, ...args)
            })
            .catch(err => {
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
                initialValues={initialValues || {}}
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
})

export default CommonForm
