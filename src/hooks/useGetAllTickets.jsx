import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useGetAllTickets = () => {
  const[fetchAllTicket,setFetchAllTicket]=useState([])
  useEffect(()=>{
    fetchOrderIddata()
  },[])
    const fetchOrderIddata = async () => {
     
        try {
          // const response = await axios.get('http://localhost:5000/allTicket');
          const response = await axios.get('https://mserver.printbaz.com/allTicket');
          setFetchAllTicket(response.data);
       
        } catch (err) {
          console.error(err);
        }
      };
      console.log("fetchAllTicket",fetchAllTicket);
    
      return{fetchAllTicket}
};

export default useGetAllTickets;