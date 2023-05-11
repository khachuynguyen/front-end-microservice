import React, { useState } from 'react';
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import { Button, Checkbox, Form, Input, message } from 'antd';
import Instance from '../axiosInstance';
import { useSearchParams } from 'react-router-dom';


const onFinishRegister = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

function AuthPage() {
    const [search,setSearch] = useSearchParams();
    const [token, setToken] = useState(null);
    const [justifyActive, setJustifyActive] = useState('tab1');;
    const [message,setMessage] = useState();
    const [messageRegiter,setMessageRegister] = useState();
    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };
    if(search.has('manufacturer'))
        window.location.assign('/');
    const onFinishLogin = async (values) => {
        console.log(values);
        await Instance.post('auth/login', values).then((res) => {
            sessionStorage.clear();
            sessionStorage.setItem('userName', (res.data.userName));
            sessionStorage.setItem('role', (res.data.role));
            sessionStorage.setItem('token', (res.data.token));
            window.location.assign('/');
        }).catch((err) => {
            setMessage(err.response.data)
        });
    };
    const onFinishRegister = async (values) => {
        console.log(values);
        await Instance.post('auth/register', values).then((res) => {
            setMessageRegister("Đăng ký thành công");
        }).catch((err) => {
            setMessageRegister(err.response.data)
        });
    };
    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Đăng Nhập
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Đăng Ký
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>

                <MDBTabsPane show={justifyActive === 'tab1'}>
                    <Form name="basic" labelCol={{ span: 5, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }}
                        onFinish={onFinishLogin}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="UserName" name="userName" rules={[
                                {
                                    required: true,
                                    message: 'Please input your UserName!',
                                },
                            ]}>
                            <Input type='text' />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>

                            <div style={{ display:'flex' ,color:'red', justifyContent:'center', alignItems:'center'}}>
                                <span>{message}</span>
                            </div>
                        </Form.Item>
                          
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            
                            <Button type="primary" htmlType="submit">
                                Đăng Nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </MDBTabsPane>

                <MDBTabsPane show={justifyActive === 'tab2'}>
                    <Form name="basic" labelCol={{ span: 5, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }}
                        onFinish={onFinishRegister}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email" name="email" rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}>
                            <Input type='email' />
                        </Form.Item>
                        <Form.Item
                            label="Username" name="userName" rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Your Fullname" name="fullName" rules={[
                                {
                                    required: true,
                                    message: 'Please input your fullname!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Phone" name="phone" rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone!',
                                },
                                {
                                    message: 'Số điện thoại chưa đúng',
                                    validator: (_, value) => {
                                        let pattern = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
                                        if (!pattern.test(value)) {
                                            return Promise.reject();
                                        } else 
                                        if (value.length !== 10) {
                                            return Promise.reject();
                                        }
                                        return Promise.resolve();
                                        // if ( (value).length >=10 && (value).length <=11 ) {
                                        //     return Promise.resolve();
                                        // } else {
                                        //     return Promise.reject();
                                        // }
                                    }
                                }
                            ]}>
                            <Input type='text' />
                        </Form.Item>
                        <Form.Item
                            label="Address" name="address" rules={[
                                {
                                    required: true,
                                    message: 'Please input your address!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        
                        <Form.Item>
                            <div style={{ display:'flex' ,color:'red', justifyContent:'center', alignItems:'center'}}>
                                <span>{messageRegiter}</span>
                            </div>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                </MDBTabsPane>

            </MDBTabsContent>

        </MDBContainer>
    );
}

export default AuthPage;