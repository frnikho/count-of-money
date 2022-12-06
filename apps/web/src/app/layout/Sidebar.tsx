import * as React from 'react';
import {HomeOutlined, UserOutlined} from "@ant-design/icons";
import {Menu} from "antd";
import {useAuth} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const items = [
  {
    label: 'Accueil',
    icon: HomeOutlined,
    admin: false,
    link: '/'
  },
  {
    label: 'Administration',
    icon: UserOutlined,
    admin: true,
    link: '/admin'
  }
]

export const SidebarMenu = () => {

  const navigate = useNavigate();
  const {user} = useAuth();

  return (
    <div style={{padding: '0.5em'}}>
      <img style={{padding: 4, marginTop: '0.8em'}} src={"../../assets/blank_logo.png"} alt={"Logo"}/>
      <div style={{marginTop: '2em'}}/>
      <Menu
        style={{gap: 30}}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={items.filter((a) => !a.admin || (a.admin && user?.role === 'Admin')).map(
          (item, index) => ({
            key: String(index + 1),
            icon: React.createElement(item.icon),
            label: item.label,
            onClick: () => {
              navigate(item.link);
            },
            style: {
              marginTop: 10
            }
          }),
        )}
      />
    </div>
  );
};
