

import React, { useContext, useEffect, useState } from 'react';

const useGetPendingOrders = () => {
    const [pendingOrdersAll,setPendingOrdersAll]=useState([])

    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    // const {user}=useContext(AuthContext);
    // const userEmail=user?.email;
    useEffect(()=>{
        const getOrders = async () => {
            const limit = 10;
         await fetch(`https://mserver.printbaz.com/pendingOrders?page=${currentPage}&limit=${limit}`) //for main site
        //  await fetch(`http://localhost:5000/pendingOrders?page=${currentPage}&limit=${limit}`) //for testing site
        .then(res=>res.json())
        .then(data => {setPendingOrdersAll(data?.data);setTotalPages(data.totalPages);
           
        })
            .catch(err => {
                console.error('Error fetching pending orders:', err);
                setError(err);
               
              });
        }
        getOrders()
    },[currentPage])

    return {pendingOrdersAll,
      
        error,
        currentPage,
        totalPages,setCurrentPage};
};

export default useGetPendingOrders;


