import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Cards from "../components/card";
import Instance from "../axiosInstance";
import { Spin } from "antd";
function Suggestions(props){
    const [suggest, setSuggest] = useState([]);
    const [loading, setLoading] = useState();
    const getSuggested = async () => {
        setLoading(true);
        await Instance.get('search?manufacturer=' +props?.manufacturer ).then(
            (response)=>{
                let tmp = [];
                if(response.data.length >=3){
                    tmp.push(response.data[0]);
                    tmp.push(response.data[1]);
                    tmp.push(response.data[2]);
                }
                else
                    if(response.data.length == 0)
                        tmp = [];
                    else
                        tmp = response.data;
                setSuggest(tmp);
                setLoading(false);
            }
        ).catch((err) => {
            setLoading(false);
            setSuggest([]);
        });
    }
    useEffect(()=>{
        getSuggested();
    },[])
    if(loading)
        return <Spin spinning={true}></Spin>
    else
    return (
        <Spin spinning={loading} >
            <div style={{ paddingLeft: '10px', width: '100%', minHeight: '500px', backgroundColor: 'white', flexWrap: 'wrap', justifyContent: 'flex-start', display: 'flex' }}>
                {
                    suggest.map((item) =>
                        <Cards key={item.id} item={item}></Cards>
                    )
                }
            </div>
        </Spin>
    );
}
export default Suggestions;