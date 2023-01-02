import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/';
import { store } from '@/app/store'; // order this early
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import '@/styles/colors.css';
import '@/styles/base.css';
import '@/styles/components.css';
import '@/styles/utils.css';
import '@/styles/main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
