import React, { FC, ReactElement, useState, useEffect } from 'react';
import { useAddTags } from "@hooks/useAddTags"
import styles from "./index.module.less"
import { } from 'antd'
interface IProps {

}
const AppleOrder = (props: IProps): ReactElement => {
    useAddTags();
    return (
        <div className={styles['apple-order-page']}>
            苹果订单
        </div>
    )
}

export default AppleOrder