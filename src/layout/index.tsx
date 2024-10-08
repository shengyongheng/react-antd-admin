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
        width: inlineCollapsed ? '80px' : '220px',
        height: '100%',
        overflow: 'hidden',
        transition: 'all 0.2s ease 0s'
    }
    return (
        <>
            <Layout>
                <div style={seizeStyle} />
                <Sider collapsed={inlineCollapsed} width={220} style={{ background: '#001529' }}>
                    <Logo></Logo>
                    <SiderView></SiderView>
                </Sider>
                <Layout style={{ height: '100vh', width: inlineCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 220px)' }}>
                    <Header style={{ width: "100%" }}>
                        <HeaderView></HeaderView>
                    </Header>
                    <Content>
                        {/* <Tags></Tags> */}
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