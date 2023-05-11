import { Empty } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
function EmptyAntd(){
    const navigate = useNavigate();
    const [search, setSearch] = useSearchParams();
    if(search.has('manufacturer'))
       alert("123");
    useEffect(()=>{
    },[search]);    
    return(<Empty></Empty>);
}
export default EmptyAntd;