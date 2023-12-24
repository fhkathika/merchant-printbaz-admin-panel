
import Table from 'react-bootstrap/Table';

function GetTodaysOutForDeliveryOrders({orderList=[]}) {

  return (
    <div>
    
      
      <Table >
      <thead>
          <tr>
          <th>Order Id</th>
            <th>Recipient Name</th>
            <th>Recipient Number</th>
            <th>Recipient Address</th>
            <th>Collect Amount</th>
            <th>Item Quantity</th>
          </tr>
        </thead>
        <tbody>
          {
              orderList?.flatMap(orders=>(

                orders?.map(pending=>
                  <tr  key={pending?._id}>
           
           <td>{pending?._id}</td>
                  <td>{pending?.name}</td>
                  <td>{pending?.address}</td>
                  <td>{pending?.phone}</td>
                  <td>{pending?.collectAmount}</td>
                  <td>
                  {pending?.orderDetailArr?.reduce(
                    (totalQuantity, item) =>
                      totalQuantity + parseInt(item.quantity, 10),
                    0
                  )}
                </td>
                 
                </tr>
                  )
              ))
            
              
          } 
         
        
        
        </tbody>
      </Table>
     
    </div>
  );
}

export default GetTodaysOutForDeliveryOrders;