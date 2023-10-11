
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../authProvider/AuthProvider';

const useAllMerchants = () => {
    const [merchant,setMerchant]=useState([])
   
      useEffect(()=>{
        const getMerchants = async () => {
         await fetch('https://mserver.printbaz.com/alluser') //for main site
        //  await fetch('http://localhost:5000/alluser') //for testing site
        .then(res=>res.json())
        .then(data => setMerchant(data))
        }
        getMerchants()
    },[merchant])
    let allMercahnts = merchant.reduce((acc, current) => {
        const x = acc.find(item => item.email === current.email);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
      }, []);
    return {allMercahnts};
};

export default useAllMerchants;