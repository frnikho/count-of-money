import { Button, Checkbox, Form, Input, Tabs, Row, Col, Divider } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import "./auth.scss"

function onFinish(values: any) {
    console.log('Success:', values);
};

function onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo);
};

const tabMarginSpan = {
    lg: 9,
    md: 8,
    sm: 6,
    xs: 2,
}

const tabSpan = {
    lg: 6,
    md: 8,
    sm: 12,
    xs: 20,
}

const buttonResponsive = {
    wrapperCol: {
        lg: { offset: 6, span: 12 },
        md: { offset: 6, span: 12 },
        sm: { offset: 6, span: 12 },
        xs: { offset: 2, span: 20 },
    }
}

export function Auth() {
    return (
        <div>
            <Row justify="center" align="middle">
                <Col {...tabSpan} style={{paddingTop: "10vh", paddingBottom: "5vh"}}>
                    <img src="../assets/logo.svg" alt="logo" style={{width: "100%", margin: "auto", display: "block"}}/>
                </Col>
            </Row>
            <Row>
                <Col {...tabMarginSpan}></Col>
                <Col {...tabSpan}>
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="Connexion" key="1">
                            <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                style={{ margin: '0 auto' }}
                            >
                                <Form.Item
                                    name="mail"
                                    rules={[{ required: true, message: 'Merci de rentrer votre adresse email!' }]}
                                >
                                    <Input className="toAlign" placeholder="Addresse email" prefix={<UserOutlined className="site-form-item-icon" />} />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Merci de rentrer votre mot de passe!' }]}
                                >
                                    <Input.Password placeholder="Mot de passe" prefix={<LockOutlined className="site-form-item-icon" />} className="toAlign" />
                                    <a className="login-form-forgot" href="">
                                        Mot de passe oublié ?
                                    </a>
                                </Form.Item>

                                <Form.Item name="remember" valuePropName="checked">
                                    <Checkbox>Se souvenir de moi</Checkbox>
                                </Form.Item>

                                <Form.Item {...buttonResponsive}>
                                    <Button type="primary" htmlType="submit" block>
                                        Connexion
                                    </Button>
                                </Form.Item>
                                <Divider />
                                <Form.Item wrapperCol={{span: 24}}>
                                    <Button type="primary" icon={<GoogleOutlined />} block>
                                        Connexion avec Google
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Tabs.TabPane>
                        <Tabs.TabPane  tab="Inscription" key="2">
                            <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                style={{ margin: '0 auto' }}
                            >
                                <Row>
                                    <Col span={12} style={{ paddingRight: '5px' }}>
                                        <Form.Item
                                            name="Prénom"
                                            hasFeedback
                                            rules={[{ required: true, message: 'Merci de rentrer votre prénom!' }]}
                                        >
                                            <Input placeholder="Prénom" className="toAlign" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} style={{ paddingLeft: '5px' }}>
                                        <Form.Item
                                            name="Nom"
                                            hasFeedback
                                            rules={[{ required: true, message: 'Merci de rentrer votre nom!' }]}
                                        >
                                            <Input placeholder="Nom" className="toAlign" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item
                                    name="email"
                                    hasFeedback
                                    rules={[{ required: true, type: "email", message: 'Merci de rentrer votre adresse email!' }]}
                                >
                                    <Input placeholder="Addresse email" className="toAlign" prefix={<UserOutlined className="site-form-item-icon" />} />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    hasFeedback
                                    rules={[{ required: true, message: 'Merci de rentrer votre mot de passe!', min: 8 }]}
                                >
                                    <Input.Password placeholder="Mot de passe" className="toAlign" prefix={<LockOutlined className="site-form-item-icon" />} />
                                </Form.Item>

                                <Form.Item
                                    name="confirmedPassword"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[{ required: true, message: "Vous devez confirmer votre mot de passe" }, ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Les mots de passe ne correspondent pas!');
                                        },
                                    }),]}
                                >
                                    <Input.Password placeholder="Vérification du mot de passe" prefix={<LockOutlined className="site-form-item-icon" />} className="toAlign" />
                                </Form.Item>

                                <Form.Item {...buttonResponsive}>
                                    <Button type="primary" htmlType="submit" block>
                                        Inscription
                                    </Button>
                                </Form.Item>
                                <Divider />
                                <Form.Item wrapperCol={{span: 24}}>
                                    <Button type="primary" icon={<GoogleOutlined />} block>
                                        Inscription avec Google
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Tabs.TabPane>
                    </Tabs>
                </Col>
                <Col {...tabMarginSpan}></Col>
            </Row>
        </div>
    );
}
