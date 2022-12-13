import {Navigate, Route, Routes} from 'react-router-dom'
import { Auth } from './components/auth'
import { Home } from './pages/Home'
import { Profile } from './components/profile';
import {MainLayout} from "./layout/MainLayout";
import './app.module.scss';
import {ArticlePage} from "./pages/ArticlePage";
import React from "react";
import {AdminPage} from "./pages/AdminPage";
import {CryptoPage} from "./pages/CryptoPage";
import {MyList} from "./pages/MyList";

export function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>} />
        <Route path="profile">
          <Route index element={<Profile/>} />
        </Route>
        <Route path={"admin"} element={<AdminPage/>}/>
        <Route path="article">
          <Route index element={<Navigate to={'/'}/>}/>
          <Route path={":sourceId/:articleId"} element={<ArticlePage/>}/>
        </Route>
        <Route path={"list"}>
          <Route index element={<MyList/>}/>
        </Route>
        <Route path={"crypto"}>
          <Route index element={<Navigate to={'/'}/>}/>
          <Route path={":id"} element={<CryptoPage/>}/>
        </Route>
      </Route>
      <Route path={"/auth"} element={<Auth/>}/>
    </Routes>
  );
}

export default App;
