import React, { useState } from 'react';
import { EditableTable, IEditableTableColumns } from './components/editableTable';
import { Input, Select } from 'antd';
import { find, get } from 'lodash';

interface IPerson {
    id: string;
    name: string;
    desc: string;
    gender: 0 | 1;
}

const GENDER_OPTIONS = [
    {
        value: 1,
        label: '男'
    },
    {
        value: 0,
        label: '女'
    }
];
export default () => {
    const [persons, setPersons] = useState<IPerson[]>([
        {
            id: '1',
            name: 'bixi',
            desc: 'i am bixi',
            gender: 1
        }
    ]);

    const onChange = (newPersons: IPerson[]) => {
        console.log('newPersons', newPersons);
        setPersons(newPersons);
    };

    const columns: IEditableTableColumns<IPerson> = [
        {
            title: '名字',
            dataIndex: 'name',
            formComponent: <Input allowClear />,
            formItemProps: { rules: [{ required: true }] }
        },
        {
            title: '介绍',
            dataIndex: 'desc',
            formComponent: <Input allowClear />,
            formItemProps: { rules: [{ required: true }] }
        },
        {
            title: '性别',
            dataIndex: 'gender',
            render(value: string) {
                return get(find(GENDER_OPTIONS, { value }), 'label');
            },
            formItemProps: { rules: [{ required: true }] },
            formComponent: (
                <Select placeholder='请选择'>
                    {GENDER_OPTIONS.map((row) => {
                        return (
                            <Select.Option key={row.value} value={row.value}>
                                {row.label}
                            </Select.Option>
                        );
                    })}
                </Select>
            )
        }
    ];

    return (
        <div>
            <EditableTable rowKey='id' columns={columns} value={persons} onChange={onChange} />
            <br />
            {JSON.stringify(persons)}
        </div>
    );
};
