import React, { FC } from 'react';
import AppRouter from '../../router/AppRouter';
interface IProps {
    routes: Routes[]
}
const Main: FC<IProps> = ({ routes }): React.JSX.Element => {

    return (
        <>
            <AppRouter routes={routes}></AppRouter>
        </>
    )
}

export default Main