import { useState, useEffect } from 'react';

export const useOpenSelectKeys = (history: any) => {
    const [openKeys, setOpenKeys] = useState(['']);
    const [selectedKeys, setSelectedKeys] = useState(['/home']);
    const onSetOpenSelectedKeys = (pathname: string) => {
        let openKey = pathname.split("/")[1];
        setOpenKeys([openKey])
        setSelectedKeys([pathname])
    }
    useEffect(() => {
        onSetOpenSelectedKeys(history.location.pathname);
        return history.listen((location: any) => {
            onSetOpenSelectedKeys(location.pathname);
        })
    }, [history]);
    return [openKeys, selectedKeys, setOpenKeys]
}
