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

    return (
        <>
            <Layout style={{ height: '100vh' }}>
                <Sider collapsed={inlineCollapsed} width={220}>
                    {/* <Logo></Logo> */}
                    <SiderView></SiderView>
                </Sider>
                <Layout>
                    <Header>
                        <HeaderView></HeaderView>
                    </Header>
                    {/* <Content>
                        <Tags></Tags>
                        <MainView routes={routes}></MainView>
                    </Content> */}
                    <Footer>
                        <FooterView></FooterView>
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default Layouts