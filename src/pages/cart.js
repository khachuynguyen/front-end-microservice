import { Button, Form, Spin } from "antd";
import { Checkbox, Col, Row } from 'antd';
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Instance from "../axiosInstance";
import { Space, Tag } from 'antd';
import ButtonAntd from "../components/buttonAntd";
import {  notification } from 'antd';
import Modals from "../components/modal";
import { Tab, Table } from "react-bootstrap";
const columns = [
    {
      title: 'Tên Sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Số lượng',
        dataIndex: 'count',
        key: 'count',
    },
    {
        title: 'Tổng cộng',
        dataIndex: 'total',
        key: 'total',
    },
    {
        title: 'Hành động',
        dataIndex: 'delete',
        key: 'delete',
    },
]
    
function Carts(){
    let token = sessionStorage.getItem('token');
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
      };
    
    const onFinish = async (value)=>{
        if(Object.keys(carts).length == 0)
            {
                api['error']({
                    message: 'Giỏ hàng trống',
                });
            }
        else{
            if(value.listProduct.length == 0)
            {
                api['error']({
                    message: 'Vui lòng chọn sản phẩm cần đặt',
                });
            }
            else{
                if(token == null)
                {
                    alert("Chưa đăng nhập, mời bạn đăng nhập")
                    window.location.assign('/');
                }
                else{
                    await Instance.post('/orders',value,{
                    headers: {
                        'Authorization': 'Bearer ' + token
                      }
                    }).then((res)=>{
                        setOrderId(res.data.id);
                        setIsSuccess(true);
                    }).catch((err)=>{
                        api['error']({
                            message: 'Lỗi đặt hàng',
                        });
                        console.log(err.response);
                    })
                }
                
            }
            
            
        }
    }
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const [search, setSearch] = useSearchParams(); 
    const [carts, setCarts] = useState([]); 
    const [orderId, setOrderId] = useState(); 
    const [loading, setLoading] = useState(true); 
    const [success, setIsSuccess] = useState(false); 
    if(search.has('manufacturer'))
        window.location.assign('/');
    if(token == null)
        window.location.assign('/auth');
    // const doCheckOut = async () =>{
    //     if(Object.keys(carts).length == 0)
    //         {
    //             api['error']({
    //                 message: 'Giỏ hàng trống',
    //             });
    //         }
    //     else{
    //         await Instance.post('/orders',{

    //         },{
    //             headers: {
    //                 'Authorization': 'Bearer ' + token
    //               }
    //         }).then((res)=>{
    //             setOrderId(res.data.id);
    //             setIsSuccess(true);
    //         }).catch((err)=>{
    //             api['error']({
    //                 message: 'Lỗi đặt hàng',
    //             });
    //             console.log(err);
    //         })
            
    //     }
    // }
    const doPayment = async () =>{
        setIsSuccess(false);
        api['success']({
            message: 'Thanh toán online',
        });
        await Instance.post('orders/'+orderId,{
            "returnUrl": "http://localhost:3000/success"
        },{
            headers: {
                'Authorization': 'Bearer ' + token
              }
        }).then((response)=>{
            window.location.replace(response.data);
        }).catch((err)=>{
            alert('lỗi')
        })
    }
    const getData = async()=>{
        await Instance.get('carts',{
            headers: {
                'Authorization': 'Bearer ' + token
              }
        }).then((res)=>{
            console.log(res.data);
            let tmp = []
            let i = 0;
            res.data.forEach(element => {
                tmp.push({
                    key: element.productId,
                    name: element.productName,
                    avatar: (<img style={{ width:'75px', height:'50px'}} src={`data:image/png;base64,${element.avatar}`}></img>),
                    price: element.price,
                    total: element.total,
                    count: element.quantity,
                      delete: (
                          <Space size="middle">
                          <ButtonAntd type="delete" onclick={element.productId} text = "Delete"></ButtonAntd>
                      </Space>
                      )
                  })
            });
            setCarts(tmp);
            setLoading(false);
        }).catch((err)=>{
            setLoading(false);
        })
    }
    useEffect(()=>{
        document.title = "Giỏ hàng";
        getData();
    },[]);
    return(
        
        <Spin spinning={loading} size="large">
            {contextHolder}
            <Modals setIsSuccess={setIsSuccess}  doPayment={doPayment} open={success} text="Đặt hàng thành công, chọn phương thức thanh toán" type='success'>
            
            </Modals>
            <Form style={{ width:'100%' }} onFinish={onFinish}>
            <Form.Item style={{ width:'100%' }} name="listProduct" > 
            <Checkbox.Group style={{ width:'100%' }} onChange={onChange}>
                <Table  striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên sản phẩm</th>
                            <th>Avatar</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Tổng cộng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                                carts.map((item) => <tr>
                                    <td><Checkbox value={item.key}></Checkbox></td>
                                    <td>{item.name}</td>
                                    <td>{item.avatar}</td>
                                    <td>{item.count}</td>
                                    <td>{item.price}</td>
                                    <td>{item.total}</td>
                                    <td>{item.delete}</td>
                                </tr>)
                        }
                    </tbody>
                </Table>
                </Checkbox.Group>
                </Form.Item>
            {/* <Table pagination={false} dataSource={carts} columns={columns}></Table> */}
            
            <div style={{display:'flex', justifyContent:'center', margin:'10px'}}>
                {/* <Button onClick={doCheckOut}>Đặt hàng</Button> */}
                <Form.Item>

                <Button htmlType="submit">Đặt hàng</Button>
                </Form.Item>
            </div>
            </Form>
        </Spin>
    );
}
export default Carts;