import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import { Button, Empty, Form, Input, InputNumber, Spin } from 'antd';
import Col from 'react-bootstrap/Col';
import { useSearchParams, useNavigate } from "react-router-dom";
import Instance from "../axiosInstance";
import Suggestions from "../components/suggestProduct";
import ButtonBootstrap from "../components/button";
import Modals from "../components/modal";

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const onfinish = (values) => {
    console.log(values);
}
function ProductDetail() {
    const [search, setSearch] = useSearchParams();
    const navigate = useNavigate();
    let id = search.get('id');
    const [loading, setLoading] = useState(true);
    let token = sessionStorage.getItem('token');
    const [product, setProduct] = useState([]);
    const [suggest, setSuggest] = useState([]);
    const [isSuccess,setIsSuccess] = useState(false);
    const onFinish = async (values) => {
        if(token == null )
            navigate('/auth');
        await Instance.post('carts',{
            'productId':values.id,
            'quantity':values.count
        },{
            headers: {
                'Authorization': 'Bearer ' + token
              }
        }).then((res)=>{
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                window.location.assign('/cart');
            }, 2000);
        }).catch((err)=>{alert('Thêm vào giỏ hàng thất bại')})
    };
    // if(search.has('id') == false)
    if (search.has('manufacturer') ) {
        search.delete('id');
        navigate("/product?" + search);
    }
    const getData = async () => {
            const response = await Instance.get('products/' + id).then(
                (response)=>{
                    setProduct(response.data);
                    setLoading(false);
                }
            ).catch((err) => {
                // console.log(err);
                if(err.response.status == 404)
                    navigate('/empty');
                setLoading(false);
                setProduct([]);
            });
    }
    
    useEffect(() => {
        document.title = "Chi tiết sản phẩm";
        setLoading(true);
        getData();
    }, [search])
    // useEffect(() => {
    //     getSuggested(product);
    // }, [product])
    if (loading)
        return (<Spin></Spin>);
    else
        return (
            <Container style={{ width: '100%', minHeight: '100vh', backgroundColor: 'white' }}>
                <Row style={{ width: '100%', margin: '10px' }}>
                    <Col style={{ padding: '10px' }}>
                        <h5>{product.product_name}</h5>
                        <img width={'500px'} alt="example" src={`data:image/png;base64,${product.avatar}`} />
                        <h6>Giá bán: {product.price.toLocaleString()} VND</h6>
                        <h6 style={{ color: 'red' }}>Giá gốc <del>{product.cost.toLocaleString()} VND</del></h6>
                        <div>
                            {product.description}
                        </div>
                    </Col>
                    <Col style={{ padding: '10px' }}>
                        <p>Chi tiết</p>
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td>Tên sản phẩm</td>
                                    <td>{product.productName}</td>
                                </tr>
                                <tr>
                                    <td>Hãng sản xuất</td>
                                    <td>{product.manufacturer}</td>
                                </tr>
                                <tr>
                                    <td>Danh mục</td>
                                    <td>{product.category}</td>
                                </tr>
                                <tr>
                                    <td>Size</td>
                                    <td>{product.size}</td>
                                </tr>
                                <tr>
                                    <td>Lốp</td>
                                    <td>{product.tire}</td>
                                </tr>
                                <tr>
                                    <td>Tải trọng</td>
                                    <td>{product.weight}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                count: 1,
                                id: product.id,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <label>Số lượng còn: {product.quantity}</label>
                            <Form.Item label="Số lượng" name="count">
                            <InputNumber size="large" min={1} max={product.quantity} defaultValue={1}/>
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button style={{ backgroundColor:'#ffc007', width:'200px', height:'50px'}} type="dashed" htmlType="submit">
                                    Thêm vào giỏ hàng
                                </Button>
                                <Form.Item name="id">
                                    <Input type="hidden" />
                                </Form.Item>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <Modals  text="Thêm vào giỏ hàng thành công" type="success" open={isSuccess}></Modals>
                <Row>
                    <h3>Gợi ý cho bạn</h3>
                    <Suggestions manufacturer={product.manufacturer}></Suggestions>
                </Row>

                {/* <Suggestions data={product?.suggest}/>  */}

            </Container>
        );
}
export default ProductDetail;