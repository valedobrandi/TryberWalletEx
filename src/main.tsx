import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import App from './App';
import store from './redux/index';
import { theme } from './styled/theme';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <Provider store={ store }>
      <ThemeProvider theme={ theme }>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
  );
