import {Button, Checkbox, Col, Divider, Form, Input, Row, Tabs} from "antd";
import {GoogleOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import "./auth.scss"
import {useGoogleLogin} from "@react-oauth/google";
import {AuthApiController} from "../controllers/AuthApiController";
import {useForm} from "react-hook-form";
import {useCallback, useEffect} from "react";
import {useAuth} from "../hooks/useAuth";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {AuthState} from "../context/UserContext";

function onFinish(values: unknown) {
    console.log('Success:', values);
}

function onFinishFailed(errorInfo: unknown) {
    console.log('Failed:', errorInfo);
}

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

export type AuthForm = {
  password: string;
  email: string;
  firstname: string;
  lastname: string;
}

export function Auth() {

  const navigate = useNavigate();
  const {login, authState} = useAuth();
  const {setValue, getValues, watch} = useForm<AuthForm>({defaultValues: {lastname: '', firstname: '', password: '', email: ''}});

  useEffect(() => {
    if (authState === AuthState.Logged)
      navigate('/');
  }, [navigate, authState]);

  const onClickLoginNative = useCallback(() => {
    login(getValues().email, getValues().password, (user) => {
      navigate('/');
      toast(`Bienvenue ${user.firstname}`, {type: 'success'});
    }, (err) => {
      toast('Impossible de vous connecter !', {type: 'error'});
    });
  }, [login, navigate, getValues]);

  const onClickRegisterNative = () => {
    AuthApiController.nativeRegister(getValues(), (response, error) => {
      console.log(response, error);
    });
  }

  const onClickLoginGoogle = useGoogleLogin({
    scope: 'email profile openid',
    redirect_uri: process.env["NX_GOOGLE_CALLBACK"],
    onError: (errorResponse) => {console.log(errorResponse)},
    onSuccess: (codeResponse) => {
      AuthApiController.redirectGoogleLogin({code: codeResponse.code, scope: codeResponse.scope, prompt: "consent", authuser: 0}, () => {
        //TODO
      });
    },
    flow: 'auth-code'
  });

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
                                    <Input value={watch('email')} onChange={(e) => setValue('email', e.currentTarget.value)} className="toAlign" placeholder="Addresse email" prefix={<UserOutlined className="site-form-item-icon" />} />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Merci de rentrer votre mot de passe!' }]}
                                >
                                    <Input.Password value={watch('password')} onChange={(e) => setValue('password', e.currentTarget.value)} placeholder="Mot de passe" prefix={<LockOutlined className="site-form-item-icon" />} className="toAlign" />
                                    <a className="login-form-forgot" href="/">
                                        Mot de passe oublié ?
                                    </a>
                                </Form.Item>

                                <Form.Item name="remember" valuePropName="checked">
                                    <Checkbox>Se souvenir de moi</Checkbox>
                                </Form.Item>

                                <Form.Item {...buttonResponsive}>
                                    <Button type="primary" onClick={onClickLoginNative} block>
                                        Connexion
                                    </Button>
                                </Form.Item>
                                <Divider />
                                <Form.Item wrapperCol={{span: 24}}>
                                    <Button type="primary" icon={<GoogleOutlined />} block onClick={() => onClickLoginGoogle()}>
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
                                            <Input value={watch('firstname')} onChange={(e) => setValue('firstname', e.currentTarget.value)} placeholder="Prénom" className="toAlign" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} style={{ paddingLeft: '5px' }}>
                                        <Form.Item
                                            name="Nom"
                                            hasFeedback
                                            rules={[{ required: true, message: 'Merci de rentrer votre nom!' }]}
                                        >
                                            <Input value={watch('lastname')} onChange={(e) => setValue('lastname', e.currentTarget.value)} placeholder="Nom" className="toAlign" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item
                                    name="email"
                                    hasFeedback
                                    rules={[{ required: true, type: "email", message: 'Merci de rentrer votre adresse email!' }]}
                                >
                                    <Input value={watch('email')} onChange={(e) => setValue('email', e.currentTarget.value)} placeholder="Addresse email" className="toAlign" prefix={<UserOutlined className="site-form-item-icon" />} />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    hasFeedback
                                    rules={[{ required: true, message: 'Merci de rentrer votre mot de passe!', min: 8 }]}
                                >
                                    <Input.Password value={watch('password')} onChange={(e) => setValue('password', e.currentTarget.value)} placeholder="Mot de passe" className="toAlign" prefix={<LockOutlined className="site-form-item-icon" />} />
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
                                    <Button type="primary" block onClick={onClickRegisterNative}>
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
