import React, { ReactElement, useState, useEffect } from 'react';
import { Tag } from 'antd'
import styles from "./index.module.scss"
import { useLocation, useHistory } from "react-router-dom"
import { addTags, switchTags, delTags } from 'src/redux-store/tags/action';
import { useSelector, useDispatch } from 'react-redux';
interface IProps {

}
const Tags = (props: IProps): ReactElement => {
    const tags = useSelector(((state: any) => state.tags))
    const dispatch = useDispatch();
    const location = useLocation()
    const history = useHistory()
    const { tagsList, activeTag } = tags
    const closeTags = (path: string) => {
        dispatch(delTags({ path }))
        history.push(activeTag)
    }
    const handleSwitchTags = (path: string) => {
        history.push(path)
        dispatch(switchTags({ path }))
    }
    useEffect(() => {
        const { pathname } = location
        console.log(pathname, activeTag);
        if (pathname !== activeTag) {
            console.log(location);
            const tagLabel = document.title || '首页'
            dispatch(addTags({ path: pathname, label: tagLabel }))
        }
    }, [location]); // eslint-disable-line
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