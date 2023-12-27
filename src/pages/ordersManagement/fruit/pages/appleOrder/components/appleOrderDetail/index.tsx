import React, { FC, ReactElement, useState, useEffect } from 'react';
import { useAddTags } from "@hooks/useAddTags"
import { useHistory } from 'react-router';
import { Button } from 'antd'
interface IProps {

}
const AppleOrderDetail: FC = (props: IProps): ReactElement => {
    useAddTags('苹果订单详情');
    const history = useHistory();
    return (
        <>
            <Button type="primary" onClick={() => {
                history.goBack();
            }}>返回</Button>
            <br />
            苹果订单详情
        </>
    )
}

export default AppleOrderDetail