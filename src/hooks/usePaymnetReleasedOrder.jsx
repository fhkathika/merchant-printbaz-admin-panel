

import React, { useContext, useEffect, useState } from 'react';

const usePaymnetReleasedOrder = () => {
    const [orderPaymentRelased, setOrderPaymentRelased] = useState([]);
    // const { user } = useContext(AuthContext);
    // const userEmail = user?.email;

    useEffect(() => {
        const getOrders = async () => {
            const response = await fetch('https://mserver.printbaz.com/orderByPaymentReleased'); //for main site
            // const response = await fetch('http://localhost:5000/orderByPaymentReleased'); //for testing site
            const data = await response.json();
            setOrderPaymentRelased(data);
// Update local storage for order list
// localStorage.setItem('orderList', JSON.stringify(data));
           
        };
       
        
        getOrders();
    }, [orderPaymentRelased]);

    return { orderPaymentRelased };
};

export default usePaymnetReleasedOrder;
