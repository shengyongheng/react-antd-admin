import React, { FC, ReactElement, useState, useEffect } from 'react';
import { } from 'antd'
import { useAddTags } from "@hooks/useAddTags"

interface IProps {

}
const WatermelonOrder = (props: IProps): ReactElement => {
    console.log('西瓜订单');
    useAddTags()
    return (
        <>
            西瓜订单
        </>
    )
}

export default WatermelonOrder