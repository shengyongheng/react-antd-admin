import React, { FC, useState, useEffect, useRef } from 'react';
import { Button } from 'antd'
import { useAddTags } from "@hooks/useAddTags"

interface IProps {

}
const UseRef: FC = (props: IProps): React.JSX.Element => {
    const [count, setCount] = useState(1)
    useAddTags()
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
            <Child />
        </>
    )
}

export default UseRef

const Child = () => {
    // 浅谈 React Hook 中的一个坑，并且聊聊 useRef
    // https://juejin.cn/post/7198114225607901243
    const [count, setCount] = useState(0);
    const [name, setName] = useState('zhangsan');
    const event = 'keydown';
    // 1. useCallBack 解决方案
    // 每点击一次按钮之后，useEffect 会产生一个新的回调，会重新创建一个绑定函数，如此反复创建、移除，对性能上会产生影响。
    // const handlekKeydown = useCallback(
    //   (e: ISafeAny) => {
    //     if (e.code === 'Enter') {
    //       console.log('current count: ', count);
    //     }
    //   },
    //   [count],
    // );

    // useEffect(() => {
    //   window.addEventListener(event, handlekKeydown);
    //   return () => {
    //     window.removeEventListener(event, handlekKeydown);
    //     console.log('清除函数被调用');
    //   };
    // }, [handlekKeydown]);

    // 2. useRef 存储状态解决方案
    // 如果处理函数涉及多个状态，那么每个状态都要重新定义一个 ref 用于存取值，这样的话代码会又臭又长。
    // const ref = useRef(count);
    // const handlekKeydown = (e: ISafeAny) => {
    //   if (e.code === 'Enter') {
    //     console.log('current count: ', ref.current);
    //   }
    // };

    // useEffect(() => {
    //   ref.current = count;
    // });

    // useEffect(() => {
    //   window.addEventListener(event, handlekKeydown);
    //   return () => {
    //     window.removeEventListener(event, handlekKeydown);
    //   };
    // }, []);

    // 3. useRef 存储处理函数
    // 最佳实践
    // const handlekKeydown = (e: ISafeAny) => {
    //   if (e.code === 'Enter') {
    //     console.log('current count: ', count);
    //     console.log('current name: ', name);
    //   }
    // };
    // const ref = useRef(handlekKeydown);
    // useEffect(() => {
    //   ref.current = handlekKeydown;
    // });
    // useEffect(() => {
    //   const cb = (e: ISafeAny) => ref.current(e); // 【注意这里通过回调拿到最新值】
    //   window.addEventListener(event, cb);
    //   return () => {
    //     window.removeEventListener(event, cb);
    //   };
    // }, []);

    // useEffect 的 cleanup 及其调用的两种情况
    // 情况一: 组件卸载
    // 情况二：当 useEffect 的依赖数组中的状态发生改变时
    useEffect(() => {
        console.log('挂载完成');
        return () => {
            console.log('清除函数被调用');
        };
    }, [count]);
    return (
        <div>
            child
            <button onClick={() => setCount(count + 1)}>Increase</button>
            <button onClick={() => setName(name + '~')}>NewName</button>
        </div>
    );
};
