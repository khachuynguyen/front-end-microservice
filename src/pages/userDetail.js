import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Spin, message } from 'antd';
import Instance from '../axiosInstance';
import { useSearchParams } from "react-router-dom";
function UserDetail(params) {
    const [search, setSearch]= useSearchParams();
    const token = sessionStorage.getItem('token');
    let userName = sessionStorage.getItem('userName');
    const role = sessionStorage.getItem('role');
    if(search.has("userName"))
        userName = search.get("userName");
    console.log(userName);
    const [loading,setLoading] = useState();
    const [user,setUser] = useState();
    if(token == null)
        window.location.assign("/auth");
    const getData= async()=>{
        setLoading(true);
        await Instance.get('user/'+userName,{
                headers: {
                    'Authorization': 'Bearer ' + token
                  }
        }).then((res)=>{
            console.log(res.data);
            setUser(res.data);
            setLoading(false);
        }).catch((err)=>{
            setLoading(false);
        })
    }
    useEffect(()=>{
        document.title = "Chi tiết người dùng";
        setLoading(true);
        getData();
    },[]);
    const onFinishRegister = async(values) => {
        setLoading(true);
        await Instance.post('user/'+values.id,values,{
                headers: {
                    'Authorization': 'Bearer ' + token
                  }
        }).then((res)=>{
            // setUser(res.data);\
            setLoading(false);
            window.location.reload();
        }).catch((err)=>{
            setLoading(false);
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    if(loading)
        return <Spin spinning={loading}></Spin>
    else
    return(
        <Spin spinning={loading}>
        <div>
            <Form initialValues={{ id:user?.id , email: user?.email, userName : user?.userName, fullName: user?.fullName, phone: user?.phone, address: user?.address} } name="basic" labelCol={{ span: 5, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 1024, }}
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
                            ]}>
                            <Input />
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
                            label="" name="id" rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            <Input type='hidden' />
                        </Form.Item>
                        {/* <Form.Item>
                            <div style={{ display:'flex' ,color:'red', justifyContent:'center', alignItems:'center'}}>
                            </div>
                        </Form.Item> */}
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Lưu
                            </Button>
                        </Form.Item>
                    </Form>
        </div>
        </Spin>
    );
}
export default UserDetail;