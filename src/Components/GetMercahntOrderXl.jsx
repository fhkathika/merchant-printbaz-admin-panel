
import Table from 'react-bootstrap/Table';

function GetMercahntOrderXl({merchOrders=[]}) {
  console.log("object",merchOrders);
  return (
    <div>
    
      
      <Table >
      <thead>
          <tr>
          <th>Order Id</th>
            <th>Client Name</th>
            <th>Client Number</th>
            <th>Recipient Name</th>
            <th>Recipient Number</th>
            <th>Recipient Address</th>
            <th>Receivable Amount</th>
            <th>Status</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {
              merchOrders?.flatMap(orders=>(

                orders?.map(pending=>
                  <tr  key={pending?._id}>
           
           <td>{pending?._id}</td>
         
                  <td>{pending?.clientName}</td>
                  <td>{pending?.clientPhone}</td>
                  <td>{pending?.name}</td>
                  <td>{pending?.address}</td>
                  <td>{pending?.phone}</td>
                  <td>{pending?.recvMoney}</td>
                  <td>{pending?.orderStatus}</td>
                  <td>{pending?.paymentStatus}</td>
                </tr>
                  )
              ))
            
              
          } 
        
        
        </tbody>
      </Table>
     
    </div>
  );
}

export default GetMercahntOrderXl;