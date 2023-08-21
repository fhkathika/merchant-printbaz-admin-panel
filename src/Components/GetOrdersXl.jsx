
import Table from 'react-bootstrap/Table';

function GetOrdersXl({filterOutFOrDelivOrders1,
  filterDelivOrders2,
  filterReturnedOrders3}) {
  return (
    <div>
    
      
      <Table >
      <thead>
          <tr>
          <th>Order Id</th>
            
            <th>Brand Name</th>
            <th>Client Name</th>
            <th>Client Number</th>
            <th>Client Email</th>
            <th>Recipient Name</th>
            <th>Recipient Number</th>
            <th>Recipient Address</th>
            <th>Printbaz Cost</th>
            <th>Delivery Cost</th>
            <th>Collect Amount</th>
            <th>Receivable Amount</th>
            <th>Status</th>
            <th>Payment Status</th>
            <th>Created at</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          {
              
              filterOutFOrDelivOrders1?.map(pending=>
                  <tr>
           
           <td>{pending?._id}</td>
         
           <td>{pending?.clientbrandName}</td>
                  <td>{pending?.clientName}</td>
                  <td>{pending?.clientPhone}</td>
                  <td>{pending?.userMail}</td>
                  <td>{pending?.name}</td>
                  <td>{pending?.address}</td>
                  <td>{pending?.phone}</td>
                  <td>{pending?.printbazcost}</td>
                  <td>{pending?.deliveryFee}</td>
                  <td>{pending?.collectAmount}</td>
                  <td>{pending?.recvMoney}</td>
                  <td>{pending?.orderStatus}</td>
                  <td>{pending?.paymentStatus}</td>
                  <td>{pending?.createdAt}</td>
                  <td>{pending?.updatedAt}</td>
                </tr>
                  )
              
          }
        
        
        </tbody>
      </Table>
     
    </div>
  );
}

export default GetOrdersXl;