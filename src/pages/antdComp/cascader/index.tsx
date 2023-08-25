import React, { FC, ReactElement, useState, useEffect } from 'react';
import { Cascader } from 'antd'
const { SHOW_CHILD } = Cascader;
interface IProps {

}
interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}
const CascaderDemo: FC = (props: IProps): ReactElement => {

    const options: Option[] = [
        {
            label: 'Light',
            value: 'light',
            children: new Array(20)
                .fill(null)
                .map((_, index) => ({ label: `Number ${index}`, value: index })),
        },
        {
            label: 'Bamboo',
            value: 'bamboo',
            children: [
                {
                    label: 'Little',
                    value: 'little',
                    children: [
                        {
                            label: 'Toy Fish',
                            value: 'fish',
                        },
                        {
                            label: 'Toy Cards',
                            value: 'cards',
                        },
                        {
                            label: 'Toy Bird',
                            value: 'bird',
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <>
            <Cascader
                style={{ width: '100%' }}
                options={options}
                multiple
                maxTagCount="responsive"
                showCheckedStrategy={SHOW_CHILD}
                defaultValue={[
                    ['bamboo', 'little', 'fish'],
                    ['bamboo', 'little', 'cards'],
                    ['bamboo', 'little', 'bird'],
                ]}
            />
        </>
    )
}

export default CascaderDemo