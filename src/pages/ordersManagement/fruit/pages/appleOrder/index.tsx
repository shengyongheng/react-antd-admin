import React, { FC, ReactElement, useState, useEffect } from 'react';
import { useAddTags } from "@hooks/useAddTags"
import { } from 'antd'
interface IProps {

}
const AppleOrder = (props: IProps): ReactElement => {
    useAddTags();
    return (
        <>
            苹果订单
        </>
    )
}

export default AppleOrder