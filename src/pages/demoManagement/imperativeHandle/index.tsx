import React, { FC, useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { useAddTags } from "@hooks/useAddTags"
import { Button, Input } from 'antd'
interface IProps {

}
const UseImperativeHandle: FC = (props: IProps): React.JSX.Element => {
    const parentRef = useRef();
    useAddTags()
    const onGetChildInputVal = () => {
        console.log((parentRef.current as any).input.value);
    }
    return (
        <>
            <h2>父组件</h2>
            <Button onClick={() => { (parentRef.current as any).setChild((pre: string) => '我是' + pre) }}>修改child</Button>
            <br />
            <Button onClick={onGetChildInputVal}>获取子组件文本框的内容</Button>
            <Child ref={parentRef} data="父组件数据">
                <div className="first">first div</div>
                <div className="second">second div</div>
                third text
            </Child>
        </>
    )
}

const Child = forwardRef<any, { data: string, children: any }>((props, parentRef) => {
    const { children } = props
    const [child, setChild] = useState('子组件数据');
    const [child2, setChild2] = useState('子组件数据2');
    console.log(children, 'children');
    useImperativeHandle(parentRef, () => ({
        child,
        setChild,
    }));

    useEffect(() => {
        console.log('Component did mount');
        return () => {
            console.log('Component will unmount or re-render');
        };
    }, [child2]);

    return (
        <>
            <h2>子组件</h2>
            {props.data}
            <br />
            <br />
            {child}
            <br />
            <Input ref={parentRef} placeholder='输入内容...'></Input>
            <br />
            {children[1]}
        </>
    )
})

export default UseImperativeHandle