import React, { FC, useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom"
// import { observer } from "mobx-react-lite"
// import { useStore } from "../../../mobx-store"
import { useAddTags } from "@hooks/useAddTags"
import { Button } from 'antd'
import {
    UserOutlined,
} from '@ant-design/icons';
interface IProps {
    name: string
    changeName: (name: string) => void
}
const Icons: FC<IProps> = (props): React.JSX.Element => {
    const history = useHistory();
    const params = useParams();
    useAddTags()
    // const { demoStore: { name, changeNameOfDemo } } = useStore();
    useEffect(() => {
        console.log(params);
        // console.log(name, changeNameOfDemo);
    }, []) //eslint-disable-line
    const goToDemo = () => {
        history.push('/demos/demo?icon=icon');
    }


    return (
        <>
            Antd Icon : <UserOutlined></UserOutlined>
            <br />
            {/* DemoStore 中的数据: {name} */}
            <br />
            {/* <Button onClick={() => { changeNameOfDemo('new Demo') }}>修改DemoStore 中的数据</Button> */}
            <br />
            <Button onClick={goToDemo}>跳转到Demo组件</Button>
        </>
    )
}

// export default observer(Icons)
export default Icons