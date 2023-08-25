import React, { FC, useState, useEffect } from 'react';
import { Layout } from 'antd'
import HeaderView from './header';
import SiderView from './sider';
import FooterView from './footer';
import MainView from './main';
import Logo from './logo';
const { Header, Content, Footer, Sider } = Layout;
interface IProps {
    subRoutes: any
}
const Layouts: FC<IProps> = ({ subRoutes }): React.JSX.Element => {

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
                        <MainView subRoutes={subRoutes}></MainView>
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