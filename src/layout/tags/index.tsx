import React, { ReactElement, useState, useEffect } from 'react';
import { Tag } from 'antd'
import styles from "./index.module.scss"
import { useHistory } from "react-router-dom"
import { switchTags, delTags } from 'src/redux-store/tags/action';
import { useSelector, useDispatch } from 'react-redux';
interface IProps {

}
const Tags = (props: IProps): ReactElement => {
    const tags = useSelector(((state: any) => state.tags))
    const dispatch = useDispatch();
    const history = useHistory()
    const { tagsList, activeTag } = tags
    const closeTags = (path: string) => {
        dispatch(delTags({ path, history }))
    }
    
    const handleSwitchTags = (path: string) => {
        history.push(path)
        dispatch(switchTags({ path }))
    }
    return (
        <>
            <div className={styles['tags']}>
                {tagsList.map((item: { path: string, label: string }, index: number) => {
                    return <Tag key={item.path} color={item.path === activeTag ? "processing" : 'default'} closable={index !== 0} onClose={() => {
                        closeTags(item.path)
                    }} onClick={() => {
                        handleSwitchTags(item.path)
                    }}>{item.label}</Tag>
                })}
            </div>
        </>
    )
}

export default Tags