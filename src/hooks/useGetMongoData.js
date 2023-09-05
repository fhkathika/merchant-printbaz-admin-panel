import React, { useContext, useEffect, useState } from 'react';

const useGetMongoData = () => {
    const [orderAll, setOrderAll] = useState([]);
    // const { user } = useContext(AuthContext);
    // const userEmail = user?.email;

    useEffect(() => {
        const getOrders = async () => {
            const response = await fetch('https://mserver.printbaz.com/allorder'); //for main site
            // const response = await fetch('http://localhost:5000/allorder'); //for testing site
            const data = await response.json();
            setOrderAll(data);
// Update local storage for order list
// localStorage.setItem('orderList', JSON.stringify(data));
           
        };
       
        
        getOrders();
    }, [orderAll]);

    return { orderAll };
};

export default useGetMongoData;
