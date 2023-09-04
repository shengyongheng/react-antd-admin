import React, { FC } from 'react';
import { Layout } from 'antd'
import HeaderView from './header';
import SiderView from './sider';
import FooterView from './footer';
import MainView from './main';
import Logo from './logo';
const { Header, Content, Footer, Sider } = Layout;
interface IProps {
    routes: Routes[]
}
const Layouts: FC<IProps> = ({ routes }): React.JSX.Element => {

    return (
        <>
            <Layout style={{ height: '100vh' }}>
                <Sider>
                    <Logo></Logo>
                    <SiderView></SiderView>
                </Sider>
                <Layout>
                    <Header>
                        <HeaderView></HeaderView>
                    </Header>
                    <Content>
                        <MainView routes={routes}></MainView>
                    </Content>
                    <Footer>
                        <FooterView></FooterView>
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default Layouts