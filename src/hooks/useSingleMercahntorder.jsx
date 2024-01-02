import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../authProvider/AuthProvider';

const useSingleMercahntorder = () => {
    const [merchantOrder,setMerchantOrder]=useState([])
    const {user}=useContext(AuthContext);
    const userEmail=user?.email;
    useEffect(()=>{
        const getOrders = async () => {
        //  await fetch(`https://mserver.printbaz.com/getmyorder/${userEmail}`) //for main site
         await fetch(`http://localhost:5000/getmyorder/${userEmail}`) //for testing site
        .then(res=>res.json())
        .then(data => setMerchantOrder(data))
        }
        getOrders()
    },[merchantOrder])
    return {merchantOrder};
};

export default useSingleMercahntorder;