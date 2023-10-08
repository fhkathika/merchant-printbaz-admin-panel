
import React, { useContext, useEffect, useState } from 'react';

const useOutForDelievry = () => {
    const [outForOutForDelivery, setOutForOutForDelivery] = useState([]);
    // const { user } = useContext(AuthContext);
    // const userEmail = user?.email;

    useEffect(() => {
        const getOrders = async () => {
            const response = await fetch('https://mserver.printbaz.com/orderByOutForDelievery'); //for main site
            // const response = await fetch('http://localhost:5000/orderByOutForDelievery'); //for testing site
            const data = await response.json();
            setOutForOutForDelivery(data);
// Update local storage for order list
// localStorage.setItem('orderList', JSON.stringify(data));
           
        };
       
        
        getOrders();
    }, [outForOutForDelivery]);

    return { outForOutForDelivery };
};

export default useOutForDelievry;
