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
function OrdersPage() {
    const [search,setSearch] = useSearchParams();
    if(search.has('manufacturer'))
        window.location.assign('/');
    const token = sessionStorage.getItem('token');
    if(token == null)
        window.location.assign('/auth');
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getData = async()=>{
        await Instance.get('orders',{
            headers: {
                'Authorization': 'Bearer ' + token
              }
        }).then((res)=>{
            let tmp= [];
            setIsLoading(true);
            res.data.forEach(order => {
                console.log(res.data);
                tmp.push({
                    key: order.id,
                    orderId: order.id,
                    total: order.total.toLocaleString(),
                    status: (order.isSuccess == 1?<span style={{color:"green", fontWeight:"600"}}> Đợi lấy hàng</span> :(order.isSuccess == 2?<span style={{color:"red", fontWeight:"600"}}>Đã từ chối</span>:<span>Đợi xác nhận</span>)),
                    action:(
                        <div style={{ display:'flex', justifyContent:'flex-start' }}>
                            {
                                !order.payment && order.isSuccess != 2 ?  <>
                                    <ButtonAntd orderId={order.id} type='payment' text="Thanh toán" />
                                </> :<></>
                            }
                            <Link to={'/order-detail?id=' + order.id}>
                                <Button  >Xem chi tiết</Button>
                            </Link>
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
        document.title = "Đơn hàng";
        getData();
    },[])
    return(
        <Spin spinning={isLoading}>
        <Table pagination={false} columns={columns} dataSource={orders}></Table>
        </Spin>
    )
}
export default OrdersPage;