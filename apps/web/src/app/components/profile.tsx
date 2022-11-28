import { Avatar, Button, Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import './profile.scss';

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


export function Profile() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  function showModal() {
    setIsModalVisible(true);
  }
  
  function handleOk() {
    setIsModalVisible(false);
  }
  
  function handleCancel() {
    setIsModalVisible(false);
  }

  return (
    <div>
      <Row justify="center" align="middle">
        <Col style={{ paddingTop: "10vh", paddingBottom: "5vh" }}>
          <h1>Mon profile</h1>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col {...tabSpan} style={{ paddingBottom: "5vh", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Avatar size={{ xs: 64, sm: 80, md: 96, lg: 96, xl: 128, xxl: 128 }} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col {...fieldsSpan}>
          <Form>
            <Form.Item style={{ marginBottom: '10px' }}>
              <Input placeholder="Prénom" />
            </Form.Item>
            <Form.Item style={{ marginBottom: '10px' }}>
              <Input placeholder="Nom" />
            </Form.Item>
            <Form.Item style={{ marginBottom: '10px' }}>
              <Input placeholder="Email" disabled />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col {...buttonSpaceSpan} style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Col {...buttonColSpan} style={{ paddingTop: "2vh" }}>
            <Button type="primary" style={{ minWidth: '100%' }}>Mettre à jour</Button>
          </Col>
        </Col>
        <Col {...buttonSpaceSpan} style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Col {...buttonColSpan} style={{ paddingTop: "2vh" }}>
            <Button type="primary" style={{ width: '100%' }} onClick={showModal}>Changer mon mot de passe</Button>
          </Col>
        </Col>
        <Col {...buttonSpaceSpan} style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Col {...buttonColSpan} style={{ paddingTop: "2vh" }}>
            <Button type="primary" style={{ width: '100%' }} danger>Supprimer mon compte</Button>
          </Col>
        </Col>
      </Row>
      <Modal title="Changer mon mot de passe" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form>
          <Form.Item style={{ marginBottom: '10px' }}>
            <Input placeholder="Ancien mot de passe" />
          </Form.Item>
          <Form.Item style={{ marginBottom: '10px' }}>
            <Input placeholder="Nouveau mot de passe" />
          </Form.Item>
          <Form.Item style={{ marginBottom: '10px' }}>
            <Input placeholder="Confirmer le nouveau mot de passe" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}