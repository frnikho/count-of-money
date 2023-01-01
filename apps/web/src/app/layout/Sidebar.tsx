import * as React from 'react';
import {HomeOutlined, UnorderedListOutlined, UserOutlined} from "@ant-design/icons";
import {Menu} from "antd";
import {useAuth} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {AuthState} from "../contexts/UserContext";

const items = [
  {
    label: 'Accueil',
    icon: HomeOutlined,
    admin: false,
    link: '/'
  },
  {
    label: 'Mes listes',
    icon: UnorderedListOutlined,
    admin: false,
    requiredLogged: true,
    link: '/list',
  },
  {
    label: 'Administration',
    icon: UserOutlined,
    requiredLogged: true,
    admin: true,
    link: '/admin'
  },
]

export const SidebarMenu = () => {

  const navigate = useNavigate();
  const {user, authState} = useAuth();

  return (
    <div style={{padding: '0.5em'}}>
      <img onClick={() => navigate('/')} style={{cursor: 'pointer', padding: 4, marginTop: '0.8em', width: '13em'}} src={"../../assets/logo.svg"} alt={"Logo"}/>
      <div style={{marginTop: '2em'}}/>
      <Menu
        style={{gap: 30, backgroundColor: 'whitesmoke', border: 'none'}}
        mode="inline"
        defaultSelectedKeys={['4']}
        items={items
          .filter((a) => !a.admin || (a.admin && user?.role === 'Admin'))
          .filter((a) => !a.requiredLogged || (a.requiredLogged && authState === AuthState.Logged))
          .map(
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
