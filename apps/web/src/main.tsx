import React from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import {BrowserRouter} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {UserContextProvider} from "./app/contexts/UserContext";
import {CookiesProvider} from "react-cookie";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <GoogleOAuthProvider clientId={process.env["NX_GOOGLE_ID"] ?? ''}>
    <CookiesProvider>
      <ToastContainer/>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </CookiesProvider>
  </GoogleOAuthProvider>
);
