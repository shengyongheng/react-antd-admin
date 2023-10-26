import React, { FC, useState, useEffect } from 'react';
import { } from 'antd'
import { useAddTags } from "@hooks/useAddTags"
interface IProps {

}
const Wine: FC = (props: IProps): React.JSX.Element => {
    useAddTags();


    return (
        <>
            Wine
        </>
    )
}

export default Wine