import { Spin } from "antd";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Instance from "../axiosInstance";

function SuccessPayment() {
    
    const [search,setSearch]= useSearchParams();
    let token = sessionStorage.getItem('token');
    if(token == null) 
        window.location.assign("/");
    let vnp_BankTranNo = search.get('vnp_BankTranNo');
    let vnp_CardType = search.get('vnp_CardType');
    let vnp_TxnRef = search.get('vnp_TxnRef');
    let orderId = parseInt(vnp_TxnRef.slice(7,vnp_TxnRef.length)) ;
    const getdata = async()=>{
        if(vnp_BankTranNo == null)
            window.location.assign("/")
        await Instance.put('orders/'+orderId,{
            "vnpBankTranNo":vnp_BankTranNo,
            "vnpCardType":vnp_CardType
        },{
            headers: {
                'Authorization': 'Bearer ' + token
              }
        }
        ).then((res)=>{
            window.location.assign("/order")
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
            alert(err.response.data)
        })
    }
    useEffect(()=>{
        getdata();
    },[])
    
    return(
        <Spin></Spin>
    );
}
export default SuccessPayment;