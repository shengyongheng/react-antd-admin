import React, { FC, useState, useEffect, useRef } from 'react';
import { Button } from 'antd'
interface IProps {

}
const UseRef: FC = (props: IProps): React.JSX.Element => {
    const [count, setCount] = useState(1)
    const countRef = useRef(count);
    const nameRef = useRef('李四');
    let sex = '男';
    console.log('nameRef.current', nameRef.current);
    console.log('sex', sex);
    const logCountAsyn = (count: number) => {
        console.log(count);
    }
    return (
        <>
            {sex}
            <Button onClick={() => {
                setCount(count + 1);
            }}>加1</Button>
            <Button onClick={() => sex = '女'}>修改性别</Button>
            <Button onClick={() => nameRef.current = nameRef.current + '~'}>修改nameRef</Button>
            <Button onClick={() => {
                setCount(count + 1);
                countRef.current = count + 1
                logCountAsyn(countRef.current);
            }}>使用useRef同步获取useState的值</Button>
        </>
    )
}

export default UseRef