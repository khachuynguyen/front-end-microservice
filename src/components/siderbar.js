import React, { useCallback } from "react";
import { Menu } from 'antd';
import Instance from "../axiosInstance";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
let manufacturers = [];
function Siders() {
    const [loading, setLoading] = useState(true);
    const [manufacturers, setManufacturers] = useState([]);
    const [search, setSearch] = useSearchParams();
    const [key,setKey] = useState('0');
    const onChangeManufacture = (e)=>{
        if(e.key == 0){
            search.delete('manufacturer');
            setSearch(search);
        }
        else{
            manufacturers.forEach(item =>{
                if(item.key == e.key){
                    search.set('manufacturer', item.title);
                    setSearch(search);
                }
            })
        }
    }
    const getData = async () => {
        const response = await Instance.get('manufacturers');
        try {
            const data = await response.data;
            let tmp = [];
            let i=0;
            data.forEach(element => {
                tmp.push({key:++i,title:element});
            });
            setManufacturers(tmp);
            setLoading(false);
        } catch (error) {
            setManufacturers([]);
            setLoading(false);
        }

    }
    useEffect(() => {
        setLoading(true);
        getData();
    }, [])
    if (loading)
        return (<></>);
    else
        return (
            <div>
                <Menu  defaultOpenKeys={'manufacturers'} defaultSelectedKeys={key} onSelect={onChangeManufacture}  mode="inline">
                        <Menu.Item key={0} >Tất cả</Menu.Item>
                        {manufacturers.map((item) => (
                            <Menu.Item key={item.key} >{item.title}</Menu.Item>
                        )
                        )}
                </Menu>
            </div>
        );
}
export default Siders;