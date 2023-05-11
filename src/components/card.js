import React from "react";
import { Card } from 'antd';
import ButtonBootstrap from "./button";
import { Link } from 'react-router-dom';
function Cards(props) {
    const item = props.item;
    let tmp =item.price.toLocaleString();
    console.log(tmp);
    return (
        <Link style={{ textDecoration:'none'}} to={'/product-detail?id='+item?.id}>
        <Card 
        bordered={true}
            hoverable
            style={{
                width: 350,
                margin: '20px',
            }}
            cover={<img height='240px' alt="example" src={`data:image/png;base64,${item?.avatar}`} />}
        >
            <div style={{ textAlign: 'left' }}>
                <h5>{item?.productName}</h5>
                <div style={{display:"flex", justifyContent:'space-between'}}>
                    <span><h6>Giá bán: {item?.price.toLocaleString()}</h6>  </span>
                    <span><h6 style={{color:'red'}}>Giảm: {item?.percent}%</h6>  </span>
                </div>
                
                  <h6 style={{color:'red'}}>Giá gốc <del>{item?.cost.toLocaleString()}</del></h6>
                <p>Số lượng còn: {item?.quantity}</p>
            </div>
        </Card>
             </Link>

        )
        ;
}
export default Cards;