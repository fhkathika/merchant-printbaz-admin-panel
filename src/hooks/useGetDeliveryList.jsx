
import React, { useContext, useEffect, useState } from 'react';

const useGetDeliveryList = () => {
    const [deliveryAll,setdeliveryAll]=useState([])
    // const {user}=useContext(AuthContext);
    // const userEmail=user?.email;
    useEffect(()=>{
        const getOrders = async () => {
         await fetch('https://mserver.printbaz.com/allDeliveryList') //for main site
        //  await fetch('http://localhost:5000/allDeliveryList') //for testing site
        .then(res=>res.json())
        .then(data => setdeliveryAll(data))
        }
        getOrders()
    },[deliveryAll])

    return {deliveryAll};
};

export default useGetDeliveryList;