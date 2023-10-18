import { useState, useEffect } from 'react';

export const useOpenSelectKeys = (history: any) => {
    const [openKeys, setOpenKeys] = useState(['']);
    const [selectedKeys, setSelectedKeys] = useState(['/']);
    const onSetOpenSelectedKeys = (pathname: string) => {
        setOpenKeys(['/' + pathname.split("/")[1]])
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
