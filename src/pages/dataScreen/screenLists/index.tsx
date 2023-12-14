import React, { FC, ReactElement, useState, useEffect } from 'react';
import { } from 'antd'
import styles from "./index.module.less"
import { useAddTags } from "@hooks/useAddTags"
interface IProps {

}
const ScreenLists: FC = (props: IProps): ReactElement => {
    useAddTags();
    return (
        <>
            ScreenLists
        </>
    )
}

export default ScreenLists