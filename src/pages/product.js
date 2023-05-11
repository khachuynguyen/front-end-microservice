import React, { useEffect, useState } from "react";
import { Card, Spin } from 'antd';
import { useSearchParams } from "react-router-dom";
import Cards from "../components/card";
import axios from "axios";
import Searchs from "../components/search";
const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    timeout: 10000,
});


function Product() {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [search, setSearch] = useSearchParams();
    const getData= async ()=>{
        let api = '';
        if(search.has('manufacturer') || search.has('find')){
            api= 'search?'+search.toString();
        }
            // api= 'search?manufacturer='+search.get('manufacturer');
        else{
            api = 'products';
        }
        const response = await instance.get(api);
        axios.get('')
        try {
            const data = await response.data;
            setList(data); 
            setLoading(false);
            console.log(data);
        } catch (error) {
            setList([]);
            setLoading(false);
        }
        
    }
    useEffect(()=>{
        document.title = "Sản phẩm";
        setLoading(true);
        getData();
    },[search])
        return (
            <Spin spinning={loading}>
            <div style={{ width: '100%' }}>
                <Searchs></Searchs>
                <div style={{ background: 'black', paddingLeft: '10px', width: '100%', minHeight: '500px', backgroundColor: 'white', flexWrap: 'wrap', justifyContent: 'flex-start', display: 'flex' }}>
                    {
                        list.map((item) =>
                            <Cards key ={item.id} item={item}></Cards>
                        )
                    }
                </div>

            </div></Spin>
        );
}
export default Product;