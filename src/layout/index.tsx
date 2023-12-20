import React, { FC } from 'react';
import { Layout } from 'antd'
import { useSelector } from 'react-redux'
import HeaderView from './header';
import SiderView from './sider';
import FooterView from './footer';
import MainView from './main';
import Tags from './tags';
import Logo from './logo';
const { Header, Content, Footer, Sider } = Layout;
interface IProps {
    routes: Routes[]
}
const Layouts: FC<IProps> = ({ routes }): React.JSX.Element => {
    const inlineCollapsed = useSelector((state: any) => state.app.inlineCollapsed)
    const seizeStyle = {
        width: '64px',
        overflow: 'hidden',
        flex: '0 0 80px',
        maxWidth: '80px',
        minWidth: '80px',
        transition: 'all 0.2s ease 0s'
    }
    return (
        <>
            <Layout>
                <div style={seizeStyle} />
                <Sider collapsed={inlineCollapsed} width={220}>
                    <Logo></Logo>
                    <SiderView></SiderView>
                </Sider>
                <Layout>
                    <Header>
                        <HeaderView></HeaderView>
                    </Header>
                    <Content>
                        <Tags></Tags>
                        <MainView routes={routes}></MainView>
                    </Content>
                    <Footer>
                        <FooterView></FooterView>
                    </Footer>
                </Layout>
            </Layout >
        </>
    )
}

export default Layouts