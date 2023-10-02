
import Table from 'react-bootstrap/Table';

function MerchantList({merchantList=[]}) {
  console.log("merchnatList",merchantList);
  return (
    <div>
    
      
      <Table >
      <thead>
          <tr>
           <th>Client Email</th>
            <th>Client Name</th>
            <th>Whatsapp Number</th>
          </tr>
        </thead>
        <tbody>
          {
              merchantList?.flatMap(merchant=>(

                merchant?.map(merch=>
                  <tr  key={merch?._id}>
                  <td>{merch?.email}</td>
                   <td>{merch?.name}</td>
                   <td>{`'${merch?.whatsapp}`}</td>

                 
                </tr>
                  )
              ))
            
              
          } 
        
        
        </tbody>
      </Table>
     
    </div>
  );
}

export default MerchantList;