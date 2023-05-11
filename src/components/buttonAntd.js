import { Button } from "antd";
import { useState } from "react";
import Instance from "../axiosInstance";
import Modals from "./modal";

function ButtonAntd(props) {
  var type = props.type;
  var text = props.text;
  var onclick = props.onclick;
  let orderId = props.orderId;
  let userName = props.userName;
  let token = sessionStorage.getItem('token');
  const [isSuccess, setIsSuccess] = useState(false);
  const doPayment =async ()=>{
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
  const doAcceptOrder = async () => {
      await Instance.put('admin/orders/' + orderId, {
          "isSuccess":1
      }, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then((response) => {
        console.log(response);
        alert("duyệt thành công");
        window.location.reload()
      }).catch((err) => {
        alert('lỗi')
      })
  }
  const doDeclineOrder = async () => {
    await Instance.put('admin/orders/' + orderId, {
      "isSuccess":2
  }, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => {
    alert("Từ chối thành công");
    window.location.reload()
  }).catch((err) => {
    alert('lỗi')
  })
}
  const doOnclick = async ()=>{
    await Instance.delete('carts/'+onclick,{
        headers: {
            'Authorization': 'Bearer ' + token
          }
    }).then((res)=>{
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            window.location.reload();
        }, 500);
    }).catch((err)=>{

    })
  }
  const doDeleteUser = async ()=>{
    // await Instance.delete('carts/'+onclick,{
    //     headers: {
    //         'Authorization': 'Bearer ' + token
    //       }
    // }).then((res)=>{
    //     setIsSuccess(true);
    //     setTimeout(() => {
    //         setIsSuccess(false);
    //         window.location.reload();
    //     }, 500);
    // }).catch((err)=>{
      
    // })
    alert("Xóa user")
  }
  const doUpdateUser = async ()=>{
    window.location.assign("/userDetail?userName="+userName);
  }

    return (
      <div>
        {
          type=='delete'?
          <>
            <Button onClick={doOnclick}>{text}</Button>
            <Modals type='success' text="Xóa giỏ hàng thành công" open={isSuccess}></Modals>
          </>:
          <>
          </>
        }
        {
          type=='deleteUser'?
          <>
            <Button onClick={doDeleteUser} danger>{text}</Button>
            <Modals type='success' text="Xóa người dùng thành công" open={isSuccess}></Modals>
          </>:
          <>
          </>
        }
        {
          type=='updateUser'?
          <>
            <Button onClick={doUpdateUser}>{text}</Button>
            <Modals type='success' text="Xóa người dùng thành công" open={isSuccess}></Modals>
          </>:
          <>
          </>
        }
        {
          type=='payment'?
          <>
            <Button onClick={doPayment}>{text}</Button>
          </>:
          <>
          </>
        }
        {
          type=='accept'?
          <>
            <Button onClick={doAcceptOrder}>{text}</Button>
          </>:
          <>
          </>
        }
        {
          type=='decline'?
          <>
            <Button type="primary" danger onClick={doDeclineOrder}>{text}</Button>
          </>:
          <>
          </>
        }
        
      </div>
    );
}

export default ButtonAntd;