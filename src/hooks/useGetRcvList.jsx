import React, { useContext, useEffect, useState } from 'react';

const useGetRcvList = () => {
    const [rcvAll,setrcvAll]=useState([])
    // const {user}=useContext(AuthContext);
    // const userEmail=user?.email;
    useEffect(()=>{
        const getOrders = async () => {
         await fetch('https://mserver.printbaz.com/allRcvPaymentList') //for main site
        //  await fetch('http://localhost:5000/allRcvPaymentList') //for testing site
        .then(res=>res.json())
        .then(data => setrcvAll(data))
        }
        getOrders()
    },[rcvAll])

    return {rcvAll};
};

export default useGetRcvList;