import React, { FC, useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { useAddTags } from "@hooks/useAddTags"
import { Button } from 'antd'
interface IProps {

}

interface IRefProps {
    child: string;
    setChild: setStateProp<IRefProps['child']>
}

const UseImperativeHandle: FC = (props: IProps): React.JSX.Element => {
    const parentRef = useRef<IRefProps>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    useAddTags()
    const onGetChildInputVal = () => {
        console.log((parentRef.current as any).input.value);
    }

    useEffect(() => {
        console.log(divRef.current)
    }, []);

    return (
        <>
            <h2>父组件</h2>
            <Button onClick={() => { (parentRef.current as any).setChild((pre: string) => '我是' + pre) }}>修改child</Button>
            {/* 原生标签使用 ref */}
            <div ref={divRef}>父组件 DIV</div>
            <br />
            {/* 
                组件使用 ref
                forwardRef 包裹组件，使其支持 ref，把 ref 转发到组件内部来设置
                这样就把组件内的 input 通过 ref 的方式传递到了组件外。
            */}
            <Child1 ref={inputRef} />
            <br />
            {/* 
                但有的时候，我不是想把原生标签暴露出去，而是暴露一些自定义方法和变量。
                这时候就需要 useImperativeHanlde 自定义 ref 对象。
            */}
            <Button onClick={onGetChildInputVal}>获取子组件文本框的内容</Button>
            <Child2 ref={parentRef} data="父组件数据" child2Style={{ color: 'red' }}>
                <div className="first">first div</div>
                <div className="second">second div</div>
                third text
            </Child2>
        </>
    )
}

const Child1 = forwardRef<HTMLInputElement>((_, parentRef) => {
    return (
        <>
            <input ref={parentRef} placeholder='输入内容...'></input>
        </>
    )
})

interface IChild1Props {
    data: string;
    children: any;
    child2Style?: React.CSSProperties
}

const Child2 = forwardRef<IRefProps, IChild1Props>((props, parentRef) => {
    const { children, child2Style } = props
    const [child, setChild] = useState('子组件数据');
    const [child2] = useState('子组件数据2');
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
            <h2 style={child2Style}>子组件</h2>
            {props.data}
            <br />
            <br />
            {child}
            <br />
            {children[1]}
        </>
    )
})



export default UseImperativeHandle