import React, { FC, ReactElement, useState, useEffect } from 'react';
import { Button } from 'antd'
import emitter from '@/mitt';
interface IProps {

}
const MittChild: FC = (props: IProps): ReactElement => {

    return (
        <>
            <Button onClick={() => {
                emitter.emit('onSetMessage', 'Mitt 子组件的message')
            }}>修改Message</Button>
        </>
    )
}

export default MittChild