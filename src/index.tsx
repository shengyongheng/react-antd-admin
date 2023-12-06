import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
// import { Provider } from 'mobx-react'
// import store from './mobx-store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from './redux-store'
// import 'antd/dist/antd.min.css'
import 'antd/dist/antd.variable.min.css'
import './styles/index.scss';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// 替换主题
ConfigProvider.config({
  prefixCls: 'ant',
  theme: {
    primaryColor: '#47a992', // 全局主色
    infoColor: '#780650', // info 颜色，Alert 组件的 info 类型的 bg color
    successColor: '#092b00', // 成功色
    processingColor: '#1890ff', // 这个颜色暂时不知道具有作用在哪些组件里面，在 ConfigProvider 组件中搜索也没有发现使用的记录
    warningColor: '#613400', // 警告色
    errorColor: '#5c0011', // 错误色
  },
});

root.render(
  <ConfigProvider prefixCls='ant'>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Suspense fallback={<div>loading...</div>}>
            <App />
          </Suspense>
        </Router>
      </PersistGate>
    </Provider>
  </ConfigProvider>
);
