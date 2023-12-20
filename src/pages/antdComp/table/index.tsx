import React, { useState, useEffect } from 'react';
import { Table, Space, Tag, Button, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAddTags, useTables } from "@hooks/index"
import { getTableData } from "@/api/table"

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    tags: string[];
    address: string;
}

interface IPramas {
    userId: string;
    pageSize: number;
    current: number;
}

interface ITableData {
    items: DataType[];
    total: number;
    current: number;
    pageSize: number;
}

const columns: ColumnsType<DataType> = [
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
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 4 ? 'geekblue' : 'green';
                    return (
                        <Tag color={color} key={tag}>
                            {tag}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const TableDemo: React.FC = () => {
    const [userId, setUserId] = useState('1');
    useAddTags();
    // 获取表格数据
    const { loading, tableData, rowSelection, selectedRowKeys, pagination, run } = useTables<ITableData, IPramas>(getTableData, {
        // pollingInterval: 3000, // 轮询请求
        manual: false, // 手动触发
        defaultParams: [
            {
                userId,
                pageSize: 10,
                current: 1
            }
        ],
    });
    console.log(selectedRowKeys, 'selectedRowKeys');
    return <>
        <Input
            onChange={(e) => setUserId(e.target.value)}
            value={userId}
            placeholder="Please enter userId"
            style={{ width: 140, marginRight: 16 }}
        />
        <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={tableData?.items}
            loading={loading}
            onChange={
                (pagination, _, sorter) => { // 表格过滤需求不常见
                    console.log(pagination, sorter, 'tableOnChange');
                    run({
                        userId,
                        pageSize: pagination.pageSize as number,
                        current: pagination.current as number
                    })
                }
            }
            pagination={pagination} />
    </>;
};

export default TableDemo;