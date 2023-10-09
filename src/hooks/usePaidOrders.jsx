

import React, { useContext, useEffect, useState } from 'react';

const usePaidOrders = () => {
    const [orderPaid, setOrderPaid] = useState([]);
    // const { user } = useContext(AuthContext);
    // const userEmail = user?.email;

    useEffect(() => {
        const getOrders = async () => {
            const response = await fetch('https://mserver.printbaz.com/orderPaid'); //for main site
            // const response = await fetch('http://localhost:5000/orderPaid'); //for testing site
            const data = await response.json();
            setOrderPaid(data);
// Update local storage for order list
// localStorage.setItem('orderList', JSON.stringify(data));
           
        };
       
        
        getOrders();
    }, [orderPaid]);

    return { orderPaid };
};

export default usePaidOrders;
