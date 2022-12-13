import { Header } from 'antd/es/layout/layout';
import * as React from 'react';
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Button, Menu, Popover} from "antd";
import {useAuth} from "../hooks/useAuth";
import {useCallback, useMemo} from "react";
import {AuthState} from "../contexts/UserContext";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const HeaderMenu = () => {

  const navigate = useNavigate();
  const {logout, user, authState} = useAuth();

  const onClickLogout = useCallback(() => {
    logout();
    toast('Vous avez été déconnecter avec succès !', {type: 'success'});
  }, [logout]);

  const onClickProfile = useCallback(() => navigate('/profile'), [navigate]);

  const items = useMemo(() => {
    return [
      { label: 'Mon profile', key: 'profile', danger: false, onClick: onClickProfile}, // remember to pass the key prop
      { label: 'Se déconnecter', key: 'logout', danger: true, onClick: onClickLogout}, // which is required
    ]
  }, [onClickLogout, onClickProfile]);


  const authMenu = useMemo(() => {
    if (authState === AuthState.Loading || authState === AuthState.NotLogged) {
      return (
        <div style={{gap: '10px', display: 'flex', flexDirection: 'row'}}>
          <Button onClick={() => navigate('/auth')}>Se connecter</Button>
          <Button onClick={() => navigate('/auth')}>S'inscrire</Button>
        </div>
      )
    } else {
      return (
        <Popover placement="bottomRight" title={`${user?.firstname} ${user?.lastname}`} content={<Menu items={items} />} trigger="hover">
          <Avatar size={40} icon={<UserOutlined />} style={{cursor: 'pointer', backgroundColor: 'grey'}} />
        </Popover>
      )
    }
  }, [authState, items, navigate, user]);

  return (
    <Header style={{background: '#001529', padding: 0}}>
      <div style={{width: '100%', height: '100%', paddingLeft:'0.8em', paddingRight: '0.8em', display: 'flex', flexDirection: 'row', alignContent: 'space-around', alignItems: 'center', justifyItems: 'center', justifyContent: 'space-between'}}>
        <div>

        </div>
        <div>
          {authMenu}
        </div>
      </div>
    </Header>
  );
};
