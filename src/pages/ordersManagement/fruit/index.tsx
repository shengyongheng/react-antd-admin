import React, { FC, useState, useEffect } from 'react';
import { } from 'antd'
import AppRouter from '../../../router/AppRouter';
interface IProps {
    routes: Routes[]
}
const Fruit = (props: IProps): React.JSX.Element => {
    const { routes } = props
    return (
        <>
            <div className="friut">
                <AppRouter routes={routes}></AppRouter>
            </div>
        </>
    )
}

export default Fruit