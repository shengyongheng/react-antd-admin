import React, { useState, useRef } from 'react';
import { Table, Space, Tag, Button, Input, Modal, message } from 'antd';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';
import { useAddTags, useTables } from "@hooks/index"
import { getTableData, deleteUsersApi, addUsersApi, getUsersDetailApi, updateUsersApi } from "@/api/table"
import CommonForm from '@components/antdForm'
import { IRefProps, ICommonFormProps } from "@components/antdForm/models"
interface DataType {
    id: number;
    name: string;
    age: number;
    birthdate: string;
    address: string;
    description?: string
}

interface IPramas {
    pageSize: number;
    current: number;
}

interface ITableData {
    items: DataType[];
    total: number;
    current: number;
    pageSize: number;
}

const TableDemo: React.FC = () => {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [updatingId, setUpdatingId] = useState<number>();
    const userFormRef = useRef<IRefProps>(null);
    const history = useHistory();

    // 用户表单
    const usersFormItems: ICommonFormProps['formItems'] = [
        {
            label: '姓名',
            name: 'name',
            itemType: 'Input',
            required: true,
            rules: [
                {
                    // 自定义校验函数
                    validator: (_, value) => {
                        if (!value) {
                            return Promise.reject('用户名不能为空')
                        } else {
                            // 通过验证
                            return Promise.resolve()
                        }
                    }
                },
            ],
            props: {
                placeholder: '请输入用户名',
            }
        },
        {
            label: '生日',
            name: 'birthdate',
            itemType: 'DatePicker',
            required: true,
            rules: [
                {
                    // 自定义校验函数
                    validator: (_, value) => {
                        if (!value) {
                            return Promise.reject('生日日期不能为空')
                        } else {
                            // 通过验证
                            return Promise.resolve()
                        }
                    }
                },
            ],
            props: {
                placeholder: '请选择生日',
            }
        },
        {
            label: '年龄',
            name: 'age',
            itemType: 'InputNumber',
            required: true,
            rules: [
                {
                    // 自定义校验函数
                    validator: (_, value) => {
                        if (!value) {
                            return Promise.reject('年龄不能为空')
                        } else {
                            // 通过验证
                            return Promise.resolve()
                        }
                    }
                },
            ],
            props: {
                placeholder: '请输入年龄',
            }
        },
        {
            label: '地址',
            name: 'address',
            itemType: 'Input',
            required: true,
            rules: [
                {
                    // 自定义校验函数
                    validator: (_, value) => {
                        if (!value) {
                            return Promise.reject('地址不能为空')
                        } else {
                            // 通过验证
                            return Promise.resolve()
                        }
                    }
                },
            ],
            props: {
                placeholder: '请输入地址',
            }
        },
    ]

    useAddTags();

    const columns: ColumnsType<DataType> = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            sorter: true,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            render: (text, record) => {
                const addressLenOver15 = record.address.length > 15;
                return <Tag color={addressLenOver15 ? 'success' : 'processing'}>{record.address}</Tag>
            },
        },
        {
            title: 'Birthdate',
            dataIndex: 'birthdate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type='primary' onClick={() => {
                        history.push(`/antd/table/${record.id}`)
                    }}>详情</Button>
                    <Button onClick={() => {
                        getUsersDetailApi<any, number>(Number(record.id)).then(res => {
                            userFormRef.current?.form.setFieldsValue({
                                ...res,
                                birthdate: moment(res.birthdate),
                            })
                        })
                        setUpdatingId(record.id)
                        setIsFormModalOpen(true);
                    }}>编辑</Button>
                    <Button danger onClick={() => {
                        deleteUsers(record.id);
                    }}>删除</Button>
                </Space>
            ),
        },
    ];

    // 获取表格数据
    const { loading, tableData, rowSelection, selectedRowKeys, pagination, run } = useTables<ITableData, IPramas>(getTableData, {
        // pollingInterval: 3000, // 轮询请求
        manual: false, // 手动触发
        defaultParams: [
            {
                pageSize: 10,
                current: 1
            }
        ],
    });

    const deleteUsers = (userId: number) => {
        deleteUsersApi(userId).then(res => {
            message.success('删除成功');
            run()
        });
    }

    const cancelAdd = () => {
        setIsFormModalOpen(false);
        userFormRef.current?.form.resetFields()
    }

    const handleSubmit = (v: any, updatingId: number | undefined) => {
        const fieldsValue = userFormRef.current?.form.getFieldsValue();
        if (!updatingId) {
            addUsersApi(fieldsValue).then(res => {
                message.success('新增成功');
                cancelAdd()
                run()
            })
        } else {
            updateUsersApi({ ...v, id: updatingId }).then(res => {
                message.success('修改成功');
                cancelAdd()
                run()
            })
        }

    }

    return <>
        {/* <CommonForm
            ref={userFormRef}
            formItems={usersFormItems}
            handleSubmit={handleSubmit}
        /> */}
        <Button onClick={() => {
            setUpdatingId(undefined)
            setIsFormModalOpen(true);
        }}>新增用户</Button>
        <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={tableData}
            loading={loading}
            onChange={
                (pagination, _, sorter) => { // 表格过滤需求不常见
                    console.log(pagination, sorter, 'tableOnChange');
                    run({
                        pageSize: pagination.pageSize as number,
                        current: pagination.current as number
                    })
                }
            }
            expandable={{
                expandedRowRender: (record) => (
                    <p
                        style={{
                            margin: 0,
                        }}
                    >
                        {record.description}
                    </p>
                ),
                rowExpandable: (record) => record.age > 50,
            }}
            pagination={pagination} />
        <Modal
            title={`${updatingId ? '编辑' : '新增'}用户`}
            open={isFormModalOpen}
            onOk={() => {
                userFormRef.current?.onFinish(updatingId)
            }}
            onCancel={cancelAdd}
        >
            <CommonForm
                ref={userFormRef}
                formItems={usersFormItems}
                handleSubmit={handleSubmit}
            />
        </Modal>
    </>;
};

export default TableDemo;