import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import success from '../assets/success.png';
import VNPay from '../assets/vnpay.png';
import COD from '../assets/cod.jpeg';
import { Col, Container, Row } from 'react-bootstrap';

function Modals(props){
    const doPayment = props.doPayment;
    const setIsSuccess = props.setIsSuccess;
  if(props.type == 'delete')
    return (
        <>
        <Modal title={'Bạn chắc chắn muốn xóa sản phẩm '+props.item.productName} open={props.open} onOk={props.onOk} onCancel={props.onCancel}>
            <p>Giá: {props.item.price}</p>
            <p>Hãng: {props.item.manufacturer}</p>
            <img width='480px' src={`data:image/png;base64,${props.item.avatar}`}></img>
        </Modal>
        </>
    );
    else
        if(props.type == 'success')
        return(
            <Modal width={1000} footer={false} open={props.open}>
                <div >
                    <Container>
                        <Row>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <span><h2>{props.text}</h2></span> 
                            </div>
                        </Row>
                        {
                            doPayment!=null ? <Container style={{width:'100%'}}>
                                <Row>
                                    <Col>
                                        <Row>
                                        <img style={{width:'100%', height:'300px'}} src={VNPay}></img>
                                        </Row>
                                        <Row>
                                        <Button onClick={doPayment}>Thanh toán VNPay</Button>
                                        </Row>
                                    </Col>
                                    <Col>
                                    <Row>
                                        <img style={{width:'100%', height:'300px'}} src={COD}></img>
                                    </Row>
                                    <Row>

                                        <Button onClick={() => { setIsSuccess(false); window.location.reload() }}>Thanh toán khi nhận hàng</Button>
                                    </Row>
                                    </Col>
                                </Row>
                            </Container>
                            :
                                <Row>
                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <img width='480px' height='380px' src={success}></img>
                                    </div>
                                </Row>
                        }
                        
                    </Container>
                </div>
            </Modal>
        );
};

export default Modals;