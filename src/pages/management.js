import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardsManagement from "../components/cardManagement";
import axios from "axios";
import FormProducts from "../components/formProduct";
import { Button, Modal } from "antd";
import Searchs from "../components/search";
const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    timeout: 10000,
});


function Managements() {
    let isAdmin = sessionStorage.getItem('role')?.toUpperCase()=="ADMIN"?true:false;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [search, setSearch] = useSearchParams();
    const getData= async ()=>{
        let api = '';
        if(search.has('manufacturer') || search.has('find')){
            api= 'search?'+search.toString();
        }
        else{
            api = 'products';
        }
        const response = await instance.get(api);
        try {
            const data = await response.data;
            setList(data); 
            setLoading(false);
        } catch (error) {
            setList([]);
            setLoading(false);
        }
        
    }
    useEffect(()=>{
        document.title="Quản lí sản phẩm";
        setLoading(true);
        getData();
    },[search])
    if(!isAdmin)
        return(
            <div>
                Access denied
            </div>
        );
    if (loading)
        return (<div></div>);
    else
        return (
            <div style={{ padding:'20px' , width: '100%' }}>
                <div>
                    <Button type="primary" onClick={showModal}>
                        Thêm sản phẩm
                    </Button>
                    <Modal footer={false} width={1000} title="Thêm sản phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <FormProducts setIsModalOpen={setIsModalOpen} method='post'></FormProducts>
                    </Modal>
                </div>
                <Searchs></Searchs>
                <div style={{ background: 'black', paddingLeft: '10px', width: '100%', minHeight: '500px', backgroundColor: 'white', flexWrap: 'wrap', justifyContent: 'flex-start', display: 'flex' }}>
                    {
                        list.map((item) =>
                            <CardsManagement list={list} setList={setList} key ={item.id} item={item}></CardsManagement>
                        )
                    }
                </div>
            </div>
        );
}
export default Managements;