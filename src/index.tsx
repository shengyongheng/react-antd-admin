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
// 全局 less 样式
import './styles/index.less';
import SystemSetting from '@components/systemSetting';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ConfigProvider prefixCls='ant'>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Suspense fallback={<div>loading...</div>}>
            <App />
            <SystemSetting ConfigProvider={ConfigProvider}/>
          </Suspense>
        </Router>
      </PersistGate>
    </Provider>
  </ConfigProvider>
);
