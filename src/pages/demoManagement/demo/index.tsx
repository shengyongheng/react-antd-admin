import { FC, useState, useEffect, useRef, ReactElement } from 'react';
import { useHistory, useLocation } from "react-router-dom"
// import { observer } from "mobx-react-lite"
import { observer, inject } from "mobx-react"
import { Button } from 'antd'
import { useAddTags } from "@hooks/useAddTags"

interface IProps {
    iconsStore?: any
}
const Demo: FC<IProps> = (props): React.JSX.Element => {
    const history = useHistory();
    const location = useLocation();
    useAddTags();
    const goToIcons = () => {
        history.push('/demos/icon/3');
    }

    return (
        <>
            Demo组件
            <div dangerouslySetInnerHTML={{ __html: '<em>教育</em>' }} />
            <br />
            iconsStore 中的 name:{props.iconsStore.name}
            <Button onClick={goToIcons}>跳转到Antd Icons组件</Button>
            <Button onClick={() => { props.iconsStore.changeNameOfIcons() }}>修改 iconsStore 中的 name</Button>
            <br />
            <div style={{ padding: 'calc(100px - 50px)' }}>Demo</div>
        </>
    )
}

export default inject('iconsStore')(observer(Demo))