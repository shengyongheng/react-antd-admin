import React, { FC, useState, useEffect } from 'react';
import { } from 'antd'
import { useAddTags } from "@hooks/useAddTags"

interface IProps {

}
const AdminManagement: FC = (props: IProps): React.JSX.Element => {
    const [xxx, setXxx] = useState('')
    useAddTags()

    return (
        <>
            AdminManagement
        </>
    )
}

export default AdminManagement