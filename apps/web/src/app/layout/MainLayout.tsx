import * as React from 'react';
import {Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import { Outlet } from 'react-router-dom';
import {useState} from "react";
import {HeaderMenu} from "./Header";
import {SidebarMenu} from "./Sidebar";

export const MainLayout = () => {

  const [collapsed, setCollapse] = useState<boolean>(false);

  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        width={200}
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed) => {
          setCollapse(collapsed);
        }}
      >
        <SidebarMenu/>
      </Sider>
      <Layout style={{marginLeft: collapsed ? 0 : 200 }}>
        <HeaderMenu/>
        <div style={{padding: 8, marginLeft: '2.2em', marginTop: '2.2em'}}>
          <Outlet/>
        </div>
      </Layout>
    </Layout>
  );
};
