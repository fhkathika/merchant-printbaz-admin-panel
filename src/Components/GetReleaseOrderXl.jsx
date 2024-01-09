

import Table from 'react-bootstrap/Table';

function GetReleaseOrderXl({paymentRelasedOrders=[]}) {
  // console.log("object",merchOrders);
  return (
    <div>
    
    <Table responsive>
                    <thead>
                      <tr>
                        <th>Order Id</th>
                        <th >Payment Release Date</th>
                        <th >Collect Amount</th>
                        <th >Delivery Fee</th>
                        <th >Rcv Amount</th>
                        <th >Payment Status</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                    {paymentRelasedOrders?.map((releaseOrder, index) => (
                      <tr key={index}>
                          <td  >{releaseOrder?.orderId}</td>
                          <td  >{releaseOrder?.paymentReleasedDate}</td>
                          <td style={{textAlign:"center"}} >{releaseOrder?.collectAmount}</td>
                          <td style={{textAlign:"center"}} >{releaseOrder?.deliveryFee}</td>
                          <td style={{textAlign:"center"}} >{releaseOrder?.recvMoney}</td>
                          <td style={{textAlign:"center"}} >{releaseOrder?.clientPaymentStatus==="paidToClient"&& "Paid"}</td>
                       
                      </tr>
                     
                      ))}
                    </tbody>
                  </Table>
     
    </div>
  );
}

export default GetReleaseOrderXl;