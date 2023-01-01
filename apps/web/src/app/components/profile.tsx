import { Avatar, Button, Col, Form, Input, Row } from "antd";
import {useCallback, useEffect} from "react";
import { useSecure } from "../hooks/useSecure";
import './profile.scss';
import {useAuth} from "../hooks/useAuth";
import {useForm} from "react-hook-form";
import {UserApiController} from "../controllers/UserApiController";
import {toast} from "react-toastify";

const tabSpan = {
  lg: 6,
  md: 8,
  sm: 12,
  xs: 20,
}

const buttonColSpan = {
  lg: { span: 5 },
  md: { span: 16 },
  sm: { span: 24 },
  xs: { span: 24 },
}

const buttonSpaceSpan = {
  lg: { span: 24 },
  md: { span: 12 },
  sm: { span: 20 },
  xs: { span: 20 },
}

const fieldsSpan = {
  lg: { span: 7 },
  md: { span: 22 },
  sm: { span: 22 },
  xs: { span: 22 },
}


type Form  = {
  firstname: string;
  lastname: string;
}

export function Profile() {

  useSecure();
  const {user, getAccessToken} = useAuth();
  const {watch, setValue, getValues} = useForm<Form>({defaultValues: {firstname: '', lastname: ''}})

  const onClickUpdate = useCallback(() => {
    UserApiController.updateUser(getAccessToken(), {firstname: getValues('firstname'), lastname: getValues('lastname')}, (user, error) => {
      if (error) {
        toast('Une erreur est survenue !', {type: 'error'});
      } else {
        toast('Information mise(s) à jour(s) !', {type: 'success'});
      }
    })
  }, [getValues, getAccessToken]);

  useEffect(() => {
    if (user) {
      setValue('firstname', user.firstname);
      setValue('lastname', user.lastname);
    }
  }, [user, setValue])

  return (
    <div>
      <Row justify="center" align="middle">
        <Col style={{ paddingTop: "10vh", paddingBottom: "5vh" }}>
          <h1>Mon profile</h1>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col {...tabSpan} style={{ paddingBottom: "5vh", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Avatar size={{ xs: 64, sm: 80, md: 96, lg: 96, xl: 128, xxl: 128 }} style={{ backgroundColor: '#f56a00' }}>{user?.firstname.slice(0, 1)} {user?.lastname.slice(0, 1)}</Avatar>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col {...fieldsSpan}>
          <Form>
            <Form.Item style={{ marginBottom: '10px' }}>
              <Input placeholder="Prénom" value={watch('firstname')} onChange={(e) => {setValue('firstname', e.currentTarget.value)}}/>
            </Form.Item>
            <Form.Item style={{ marginBottom: '10px' }}>
              <Input placeholder="Nom" value={watch('lastname')} onChange={(e) => {setValue('lastname', e.currentTarget.value)}}/>
            </Form.Item>
            <Form.Item style={{ marginBottom: '10px' }}>
              <Input placeholder="Email" disabled value={user?.email}/>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col {...buttonSpaceSpan} style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Col {...buttonColSpan} style={{ paddingTop: "2vh" }}>
            <Button type="primary" style={{ minWidth: '100%' }} onClick={onClickUpdate}>Mettre à jour</Button>
          </Col>
        </Col>
      </Row>
    </div>
  );
}
