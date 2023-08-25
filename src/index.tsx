import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'mobx-react'
import store from './store'
import './styles/index.scss';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider {...store}>
    <Suspense fallback={<div>loading...</div>}>
      <App />
    </Suspense>
  </Provider>
);
