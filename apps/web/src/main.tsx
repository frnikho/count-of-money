import React from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import {BrowserRouter} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {UserContextProvider} from "./app/contexts/UserContext";
import {CookiesProvider} from "react-cookie";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ConfigProvider} from "antd";
import {ThemeConfig} from "antd/lib/config-provider/context";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#2980b9',
  }
}

root.render(
  <GoogleOAuthProvider clientId={process.env["NX_GOOGLE_ID"] ?? ''}>
    <CookiesProvider>
      <ConfigProvider theme={theme}>
        <ToastContainer/>
        <UserContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContextProvider>
      </ConfigProvider>
    </CookiesProvider>
  </GoogleOAuthProvider>
);
