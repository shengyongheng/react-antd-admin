import React, { FC, ReactElement, useState, useEffect } from 'react';
import emitter from '@/mitt';
import MittChild from './components/mittChild'

const Mitt: FC = (): ReactElement => {
    const [message, setMessage] = useState("默认message");
    const onSetMessage = (data: any) => {
        setMessage(data);
    }
    // 监听mitt事件
    useEffect(() => {
        emitter.on('onSetMessage', onSetMessage)
        return () => {
            emitter.off('onSetMessage', onSetMessage);
        }
    }, [])

    return (
        <>
            <p>
                {message}
            </p>
            <MittChild />
        </>
    )
}

export default Mitt