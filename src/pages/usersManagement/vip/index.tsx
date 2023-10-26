import React, { FC, useState, useEffect } from 'react';
import { useAddTags } from "@hooks/useAddTags"
import { } from 'antd'
interface IProps {

}
const VipManagement: FC = (props: IProps): React.JSX.Element => {
    const [xxx, setXxx] = useState('')
    useAddTags()

    return (
        <>
            VipManagement
        </>
    )
}

export default VipManagement