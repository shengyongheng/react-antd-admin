import React, { ReactElement, useState, useEffect } from 'react';
import { Tag, Button, Dropdown } from 'antd'
import type { MenuProps } from 'antd';
import styles from "./index.module.less"
import { useHistory } from "react-router-dom"
import { switchTags, delTags, clearOtherTags, clearALLTags } from '@/store/tags/action';
import { useSelector, useDispatch } from 'react-redux';
interface IProps {

}
const Tags = (props: IProps): ReactElement => {
    const tags = useSelector(((state: any) => state.tags))
    const dispatch = useDispatch();
    const history = useHistory()
    const { tagsList, activeTag } = tags

    const delOtherTags = () => {
        dispatch(clearOtherTags())
        history.go()
    }

    const delAllTags = () => {
        history.push('/home')
        dispatch(clearALLTags())
    }

    const closeTags = (path: string) => {
        dispatch(delTags({ path, history }))
    }

    const handleSwitchTags = (path: string) => {
        history.push(path)
        dispatch(switchTags({ path }))
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <span onClick={delOtherTags}>删除其他</span>
            ),
        },
        {
            key: '2',
            label: (
                <span onClick={delAllTags}>删除全部</span>
            ),
        },
    ];
    return (
        <>
            <div className={styles['tags']}>
                <div className='tag-items'>
                    {tagsList.map((item: { path: string, label: string }, index: number) => {
                        return <Tag key={item.path} color={item.path === activeTag ? "processing" : 'default'} closable={index !== 0} onClose={() => {
                            closeTags(item.path)
                        }} onClick={() => {
                            handleSwitchTags(item.path)
                        }}>{item.label}</Tag>
                    })}
                </div>
                <div className='more-button'>
                    <Dropdown menu={{ items }} placement="bottom">
                        <Button size='small'>更多</Button>
                    </Dropdown>
                </div>
            </div>
        </>
    )
}

export default Tags