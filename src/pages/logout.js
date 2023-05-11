import { Spin } from "antd";
import React, { useEffect, useState } from "react";


function LogOut(){
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setLoading(true);
        sessionStorage.clear();
        setTimeout(()=>{
            window.location.assign("/auth");
        },2000);
        setLoading(false);
    },[])
    return(
        <Spin></Spin>
    );
}
export default LogOut;