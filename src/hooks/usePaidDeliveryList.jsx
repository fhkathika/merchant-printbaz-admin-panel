
import React, { useContext, useEffect, useState } from 'react';

const usePaidDeliveryList = () => {
    const [deliveryList, setDeliveryList] = useState([]);
    // const { user } = useContext(AuthContext);
    // const userEmail = user?.email;

    useEffect(() => {
        const getOrders = async () => {
            const response = await fetch('https://mserver.printbaz.com/paidDeliveryList'); //for main site
            // const response = await fetch('http://localhost:5000/paidDeliveryList'); //for testing site
            const data = await response.json();
            setDeliveryList(data);
// Update local storage for order list
// localStorage.setItem('orderList', JSON.stringify(data));
         };
        getOrders();
    }, [deliveryList]);

    return { deliveryList };
};

export default usePaidDeliveryList;
