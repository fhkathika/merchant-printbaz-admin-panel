
import Table from 'react-bootstrap/Table';

function GetTotalTshirtDispatched({countTotalTshirtDispatched,whiteQuantity,blackQuantity}) {

  return (
    <div>
    
      
      <Table>
      <thead>
          <tr>
            <th>Total T-shirt Dispatched</th>
            <th>White Quantity</th>
            <th>Black Quantity</th>
           
          </tr>
        </thead>
        <tbody>
        <tr >
           
           <td>{countTotalTshirtDispatched}</td>
           <td>{whiteQuantity}</td>
           <td>{blackQuantity}</td>
         
           
                </tr>
         
        
        
        </tbody>
      </Table>
     
    </div>
  );
}

export default GetTotalTshirtDispatched;