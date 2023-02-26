import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './layouts/App';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

const baseName =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? '/npm/'
    : '/website/react/sleact-inflearn/alecture/dist/';

root.render(
  <React.StrictMode>
    <BrowserRouter basename={baseName}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
