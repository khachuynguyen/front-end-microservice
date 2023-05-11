import { Button, Space, Spin, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Instance from "../axiosInstance";
import ButtonAntd from "../components/buttonAntd";

const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
        title: 'Tổng cộng',
        dataIndex: 'total',
        key: 'total',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
        key: 'action',
    },
]
const data = [
    {
        key: '1',
        orderId: "orderId1",
        total: "Tổng cộng",
        status: "Trạng thái",
        action: "thanh toán"
      }
]
function OrderManagement() {
    let isAdmin = sessionStorage.getItem('role')?.toUpperCase()=="ADMIN"?true:false;
    const [search,setSearch] = useSearchParams();
    if(search.has('manufacturer'))
        window.location.assign('/');
    const token = sessionStorage.getItem('token');
    if(!isAdmin)
        window.location.assign('/');
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getData = async()=>{
        await Instance.get('admin/orders',{
            headers: {
                'Authorization': 'Bearer ' + token
              }
        }).then((res)=>{
            console.log(res.data);
            let tmp= [];
            res.data.forEach(order => {
                tmp.push({
                    key: order.id,
                    orderId: order.id,
                    total: order.total.toLocaleString(),
                    status: ( (order.payment)?"Đã thanh toán, ":"Chưa thanh toán, ")+(order.isSuccess == 0 ?"Đợi xác nhận": order.isSuccess ==1 ?"Đợi lấy hàng":"Đã từ chối"),
                    action:(
                        <div style={{ display:'flex', justifyContent:'space-evenly' }}>
                            {
                                
                                (
                                    order.isSuccess == 0 ? <>
                                    <ButtonAntd orderId={order.id} type='accept' text="Duyệt" />
                                    <ButtonAntd orderId={order.id} type='decline' text="Từ chối" />
                                    </> : <></> 
                                )
                            }
                            <Link to={'/order-detail?id=' + order.id}>
                                <Button  >Xem chi tiết</Button>
                            </Link>
                            {
                                
                                (
                                    order.is_success == 1 ? <>
                                    <h5 style={{marginLeft:'5px'}}>Đã duyệt</h5>
                                    </> : <></> 
                                )
                            }
                            {
                                
                                (
                                    order.is_success == 2 ? <>
                                    <h5 style={{marginLeft:'5px'}}>Đã từ chối</h5>
                                    </> : <></> 
                                )
                            }
                        </div>
                    ) 
                });
            });
            setOrders(tmp);
            setIsLoading(false);
        }).catch((err)=>{
            setIsLoading(false);
        })
    }

    useEffect(()=>{
        document.title = "Quản lí đơn hàng";
        getData();
    },[])
    return(
        <Spin spinning={isLoading}>
        <Table pagination={false} columns={columns} dataSource={orders}></Table>
        </Spin>
    )
}
export default OrderManagement;