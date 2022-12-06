// @flow
import * as React from 'react';
import {Avatar, Button, Layout, Menu, theme} from "antd";
import Sider from "antd/es/layout/Sider";
import { Outlet } from 'react-router-dom';
import {useState} from "react";
import {HeaderMenu} from "./Header";
import {SidebarMenu} from "./Sidebar";

export const MainLayout = () => {

  const [collapsed, setCollapse] = useState<boolean>(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();


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
        width={250}
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          setCollapse(collapsed);
        }}
      >
        <SidebarMenu/>
      </Sider>
      <Layout style={{marginLeft: collapsed ? 0 : 250 }}>
        <HeaderMenu/>
        <div style={{padding: 8}}>
          <Outlet/>
        </div>
      </Layout>
    </Layout>
  );
};
