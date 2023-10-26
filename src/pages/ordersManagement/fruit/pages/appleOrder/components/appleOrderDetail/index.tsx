import React, { FC, ReactElement, useState, useEffect } from 'react';
import { useAddTags } from "@hooks/useAddTags"
import { } from 'antd'
interface IProps {

}
const AppleOrderDetail: FC = (props: IProps): ReactElement => {
    useAddTags('苹果订单详情')
    return (
        <>
            苹果订单详情
            <br />
            xxx
        </>
    )
}

export default AppleOrderDetail