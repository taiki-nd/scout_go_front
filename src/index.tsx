import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { CookiesProvider } from 'react-cookie'

axios.defaults.baseURL = 'http://localhost:8000/api/v1';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);
