import React, { ReactElement, useState, useEffect } from 'react';
import { } from 'antd'
interface IProps {

}
const Tags = (props: IProps): ReactElement => {
    useEffect(() => {
        console.log(document);
    }, [document.title]);
    return (
        <>
            <div className={'tags'}>多页签{document.title}</div>
        </>
    )
}

export default Tags