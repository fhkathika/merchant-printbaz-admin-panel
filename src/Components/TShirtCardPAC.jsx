import React, { useState } from 'react';
import countSizeForOrders from '../Formulas/countSizeForOrders';
import useGetMongoData from '../hooks/useGetMongoData';

const TShirtCardPAC = () => {
    const {orderAll}=useGetMongoData()
    const [selectProductTypePAC, setSelectProductTypePAC] = useState('Round Neck');
// 3 type product pending order 
let pendingOrdersRoundNeck =orderAll?.filter(order => 
    order?.orderStatus === "Pending" && 
    (!order.hasOwnProperty("category") || order?.category === "Custom Round Neck" || order?.category === "Blank Round Neck")
  );
  let pendingOrdersDropSholder = orderAll?.filter(users => users?.orderStatus === "Pending"&&(users?.category==="Custom Drop Sholder" || users?.category==="Blank Drop Sholder"));
  
  let pendingOrdersHoodie = orderAll?.filter(users => users?.orderStatus === "Pending"&& (users?.category==="Custom Hoodie" || users?.category==="Blank Hoodie"));
  let pendingOrders= orderAll?.filter(users => users?.orderStatus === "Pending");
  
  // 3 type product approve  order 
  let   approvedOrdersRoundNeck=orderAll?.filter(order => 
    order?.orderStatus === "Approved" && 
    (!order.hasOwnProperty("category") || order?.category === "Custom Round Neck" || order?.category === "Blank Round Neck")
  );
  let   approvedOrdersDropSholder=orderAll?.filter(users=>users?.orderStatus==="Approved"&&(users?.category==="Custom Drop Sholder" || users?.category==="Blank Drop Sholder"));
  let   approvedOrdersHoodie=orderAll?.filter(users=>users?.orderStatus==="Approved"&& (users?.category==="Custom Hoodie" || users?.category==="Blank Hoodie"));
  let   approvedOrders=orderAll?.filter(users=>users?.orderStatus==="Approved");
  // 3 type product pending order 
  let   confirmedOrdersRoundNeck=orderAll?.filter(order => 
    order?.orderStatus === "Confirmed" && 
    (!order.hasOwnProperty("category") || order?.category === "Custom Round Neck" || order?.category === "Blank Round Neck")
  );
  let   confirmedOrdersDropSholder=orderAll?.filter(users=>users?.orderStatus==="confirmed"&&(users?.category==="Custom Drop Sholder" || users?.category==="Blank Drop Sholder"));
  let   confirmedOrdersHoodie=orderAll?.filter(users=>users?.orderStatus==="confirmed"&& (users?.category==="Custom Hoodie" || users?.category==="Blank Hoodie"));
  let   confirmedOrders=orderAll?.filter(users=>users?.orderStatus==="confirmed");
  
     // 3 type product confirm orders 
    // const sizeCountsForConfirmedOrders = countSizeForOrders(confirmedOrders);
    const sizeCountsForConfirmedOrdersRoundNeck = countSizeForOrders(confirmedOrdersRoundNeck);
    const sizeCountsForConfirmedOrdersDropSholder = countSizeForOrders(confirmedOrdersDropSholder);
    const sizeCountsForConfirmedOrdersHoodie = countSizeForOrders(confirmedOrdersHoodie);
      // 3 type product pending orders 
    // const sizeCountsForPendingOrders = countSizeForOrders(pendingOrders);
    const sizeCountsForPendingOrdersRoundNeck = countSizeForOrders(pendingOrdersRoundNeck);
    const sizeCountsForPendingOrdersDropSholder = countSizeForOrders(pendingOrdersDropSholder);
    const sizeCountsForPendingOrdersHoodie = countSizeForOrders(pendingOrdersHoodie);
      // 3 type product approved orders 
    // const sizeCountsForApprovedOrders = countSizeForOrders(approvedOrders);
    const sizeCountsForApprovedOrdersRoundNeck = countSizeForOrders(approvedOrdersRoundNeck);
    const sizeCountsForApprovedOrdersDropSholder = countSizeForOrders(approvedOrdersDropSholder);
    const sizeCountsForApprovedOrdersHoodie = countSizeForOrders(approvedOrdersHoodie);
    const handleInputChangeForPAC = (event) => {
        const { id, value } = event.target;
        switch (id) {
          case 'productType-filterPAC':
            setSelectProductTypePAC(value);
            break; 
          
          default:
            break;
        }
        
      };
    return (
        <div className="">
               
        <div className="card stat-card" style={{height:"375px"}}>
        
          <div className="card-body " >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<h4 htmlFor="productType-filterPAC" style={{ marginBottom: "8px" }}>T-Shirt (PAC)</h4>
<select 
 id="productType-filterPAC" 
 value={selectProductTypePAC} 
 className="form-control mr-5" 
 onChange={(e) => handleInputChangeForPAC(e)} 
 style={{ maxWidth: '150px' }}  // Adjust the width value accordingly
>
 <option value='Round Neck'>Round Neck</option>
 <option value="Drop Sholder">Drop Sholder</option>
 <option value="Hoodie">Hoodie</option>
</select>
</div>

<table>
<thead>
<tr>
<th>Color</th>
<th></th>
<th>M</th>
<th></th>
<th>L</th>
<th></th>
<th>XL</th>
<th></th>
<th>XXL</th>
</tr>
</thead>

{
selectProductTypePAC === "Round Neck" &&
<tbody>
{["black", "white", "maroon", "green"].map((color) => {
// Calculate the sum for each size for the given color
const mCount = 
 (sizeCountsForConfirmedOrdersRoundNeck[color]?.m ?? 0) + 
 (sizeCountsForPendingOrdersRoundNeck[color]?.m ?? 0) + 
 (sizeCountsForApprovedOrdersRoundNeck[color]?.m ?? 0);

const lCount = 
 (sizeCountsForConfirmedOrdersRoundNeck[color]?.L ?? 0) + 
 (sizeCountsForPendingOrdersRoundNeck[color]?.L ?? 0) + 
 (sizeCountsForApprovedOrdersRoundNeck[color]?.L ?? 0);

const xlCount = 
 (sizeCountsForConfirmedOrdersRoundNeck[color]?.XL ?? 0) + 
 (sizeCountsForPendingOrdersRoundNeck[color]?.XL ?? 0) + 
 (sizeCountsForApprovedOrdersRoundNeck[color]?.XL ?? 0);

const xxlCount = 
 (sizeCountsForConfirmedOrdersRoundNeck[color]?.XXL ?? 0) + 
 (sizeCountsForPendingOrdersRoundNeck[color]?.XXL ?? 0) + 
 (sizeCountsForApprovedOrdersRoundNeck[color]?.XXL ?? 0);

return (
 <tr 
   style={{
     backgroundColor: color,
     color: ["black", "maroon", "green"].includes(color) ? "white" : "initial"
   }}
 >
   <td>{color}</td>
   <td></td>
   <td>{mCount}</td>
   <td></td>
   <td>{lCount}</td>
   <td></td>
   <td>{xlCount}</td>
   <td></td>
   <td>{xxlCount}</td>
 </tr>
);
})}
</tbody>
}

{
selectProductTypePAC==="Drop Sholder" &&
<tbody>
{["black", "white", "maroon", "green"].map((color) => {
// Calculate the sum for each size for the given color
const mCount = 
 (sizeCountsForConfirmedOrdersDropSholder[color]?.m ?? 0) + 
 (sizeCountsForPendingOrdersDropSholder[color]?.m ?? 0) + 
 (sizeCountsForApprovedOrdersDropSholder[color]?.m ?? 0);

const lCount = 
 (sizeCountsForConfirmedOrdersDropSholder[color]?.L ?? 0) + 
 (sizeCountsForPendingOrdersDropSholder[color]?.L ?? 0) + 
 (sizeCountsForApprovedOrdersDropSholder[color]?.L ?? 0);

const xlCount = 
 (sizeCountsForConfirmedOrdersDropSholder[color]?.XL ?? 0) + 
 (sizeCountsForPendingOrdersDropSholder[color]?.XL ?? 0) + 
 (sizeCountsForApprovedOrdersDropSholder[color]?.XL ?? 0);

const xxlCount = 
 (sizeCountsForConfirmedOrdersDropSholder[color]?.XXL ?? 0) + 
 (sizeCountsForPendingOrdersDropSholder[color]?.XXL ?? 0) + 
 (sizeCountsForApprovedOrdersDropSholder[color]?.XXL ?? 0);

return (
 <tr 
   style={{
     backgroundColor: color,
     color: ["black", "maroon", "green"].includes(color) ? "white" : "initial"
   }}
 >
   <td>{color}</td>
   <td></td>
   <td>{mCount}</td>
   <td></td>
   <td>{lCount}</td>
   <td></td>
   <td>{xlCount}</td>
   <td></td>
   <td>{xxlCount}</td>
 </tr>
);
})}
</tbody>
}  
{
selectProductTypePAC==="Hoodie" &&
<tbody>
{["black","darkblue","green", "gray","red"].map((color) => {
// Calculate the sum for each size for the given color
const mCount = 
 (sizeCountsForConfirmedOrdersHoodie[color]?.m ?? 0) + 
 (sizeCountsForPendingOrdersHoodie[color]?.m ?? 0) + 
 (sizeCountsForApprovedOrdersHoodie[color]?.m ?? 0);

const lCount = 
 (sizeCountsForConfirmedOrdersHoodie[color]?.L ?? 0) + 
 (sizeCountsForPendingOrdersHoodie[color]?.L ?? 0) + 
 (sizeCountsForApprovedOrdersHoodie[color]?.L ?? 0);

const xlCount = 
 (sizeCountsForConfirmedOrdersHoodie[color]?.XL ?? 0) + 
 (sizeCountsForPendingOrdersHoodie[color]?.XL ?? 0) + 
 (sizeCountsForApprovedOrdersHoodie[color]?.XL ?? 0);

const xxlCount = 
 (sizeCountsForConfirmedOrdersHoodie[color]?.XXL ?? 0) + 
 (sizeCountsForPendingOrdersHoodie[color]?.XXL ?? 0) + 
 (sizeCountsForApprovedOrdersHoodie[color]?.XXL ?? 0);

return (
 <tr 
   style={{
     backgroundColor: color,
     color: ["black","darkblue","green", "gray","red"].includes(color) ? "white" : "initial"
   }}
 >
   <td>{color}</td>
   <td></td>
   <td>{mCount}</td>
   <td></td>
   <td>{lCount}</td>
   <td></td>
   <td>{xlCount}</td>
   <td></td>
   <td>{xxlCount}</td>
 </tr>
);
})}
</tbody>
}

</table>

            
            </div>
        <div>
        
  
        </div>
       
         
           
        </div>
       
      

      </div>
    );
};

export default TShirtCardPAC;