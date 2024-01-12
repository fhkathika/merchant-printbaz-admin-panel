import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import countSizePerDay from '../../Formulas/countSizePerDay';
import useDeliveryList from '../../hooks/usePaidDeliveryList';
import useGetDeliveryList from '../../hooks/useGetDeliveryList';
import useGetMongoData from '../../hooks/useGetMongoData';
import useOutForDelievry from '../../hooks/useOutForDelievry';
import usePaidOrders from '../../hooks/usePaidOrders';
import usePaymnetReleasedOrder from '../../hooks/usePaymnetReleasedOrder';
import Navigationbar from '../navigationBar/Navigationbar';
import useAllMerchants from '../../hooks/useAllMerchants';

const SalesReport = () => {
  const {orderPaymentRelased}=usePaymnetReleasedOrder()
  const {allMercahnts}=useAllMerchants() 
  const {outForOutForDelivery}=useOutForDelievry()
  const {deliveryList}=useDeliveryList()
  const paymentReleasedOrder=orderPaymentRelased.filter((order) => order?.orderStatus==="payment-released")
  const paidOrderDelivList=deliveryList.filter((order) => order?.orderStatus==="delivered" && order?.paymentStatus==="paid")
  const totalPaymentReleased= paymentReleasedOrder?.reduce((acc, curr) => acc +parseFloat (curr.recvMoney || 0), 0);
  const totalReceived=paidOrderDelivList?.reduce((acc, curr) => acc +parseFloat (curr.printBazRcvable || 0), 0);
 
  console.log("paidOrderDelivList",paidOrderDelivList);
  const dueAbove1000=allMercahnts?.filter(merchant =>  merchant.dueAmountNow>=1000)
  const [selectProductType, setSelectProductType] = useState('Round Neck');
  const [getAllPaymentDetail, setGetAllPaymentDetail] = useState([]);
  const [inputRcvAmount, setInputRcvAmount] = useState('');
  const navigation=useNavigate()
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case 'productType-filter':
        setSelectProductType(value);
        break; 
      default:
        break;
    }
    
  };  
  const sumOfDuesAmount = allMercahnts?.filter(merchant => merchant.dueAmountNow)
                                       .reduce((acc, merchant) => acc + merchant.dueAmountNow, 0);

                                       const sumOfPaymentReleased = allMercahnts
                                       .map(item => {
                                         // check if the payments array exists and has a length greater than 0
                                         if (item.payments && item.payments.length > 0) {
                                           return item.payments[item.payments.length - 1].totalReleasedAmount || 0;
                                         }
                                         return 0;
                                       })
                                       .reduce((acc, curr) => acc + curr, 0);
                                     
                                     console.log("sumOfPaymentReleased",sumOfPaymentReleased);  // This will print the sum of the last index of totalReleasedAmount for all objects
                                   

  const handleRcvInput = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case 'rcvAmount':
        setInputRcvAmount(value);
        break; 
      default:
        break;
    }  
  };
  console.log("deliveryAll",deliveryList);
    // 3 type product inProduction
    let outForDeliveryOrdersRoundNeck = outForOutForDelivery?.filter(order => 
      (!order.hasOwnProperty("category") || order?.category === "Custom Round Neck" || order?.category === "Blank Round Neck")
    );
    console.log("outForDeliveryOrdersRoundNeck",outForDeliveryOrdersRoundNeck);
    let outForDeliveryOrdersDropSholder=outForOutForDelivery?.filter(users=>users?.orderStatus==="in-production" &&(users?.category==="Custom Drop Sholder" || users?.category==="Blank Drop Sholder"));
    let outForDeliveryOrdersHoodie=outForOutForDelivery?.filter(users=>users?.orderStatus==="in-production" && (users?.category==="Custom Hoodie" || users?.category==="Blank Hoodie"));
    // paid orders filter 
    let paidOrdersRoundNeck = deliveryList?.filter(order => order?.paymentStatus==="paid" && order?.orderStatus==="delivered");
    console.log("outForDeliveryOrdersRoundNeck",outForDeliveryOrdersRoundNeck);
    let paidOrdersDropSholder=deliveryList?.filter(users=>users?.orderStatus==="in-production" &&(users?.category==="Custom Drop Sholder" || users?.category==="Blank Drop Sholder"));
    let paidOrdersHoodie=deliveryList?.filter(users=>users?.orderStatus==="in-production" && (users?.category==="Custom Hoodie" || users?.category==="Blank Hoodie"));
    
    const sizeCountsForOutForDelievryRoundNeck = countSizePerDay(outForDeliveryOrdersRoundNeck);
    const sizeCountsForOutForDelievryDropSholder = countSizePerDay(outForDeliveryOrdersDropSholder);
    const sizeCountsForOutForDelievryHoodie = countSizePerDay(outForDeliveryOrdersHoodie);
    console.log("paidOrdersRoundNeck",paidOrdersRoundNeck);
let grandTotalSoldtshirt = 0;
sizeCountsForOutForDelievryRoundNeck.forEach(record => {
  Object.values(record.counts).forEach(sizes => {
    grandTotalSoldtshirt += (sizes.S || 0);
    grandTotalSoldtshirt += (sizes.M || 0);
    grandTotalSoldtshirt += (sizes.L || 0);
    grandTotalSoldtshirt += (sizes.XL || 0);
    grandTotalSoldtshirt += (sizes.XXL || 0);
  });
});
const handleGotoTotalSoldThsirt=()=>{
  navigation("/allSoldTshirts")
}
const handleGotoTotalRcvPage=()=>{
  navigation("/allRcvAmount")
}

const getPerSegmentPaymentDetailById=async()=>{
  // Fetch the updated order details
await fetch('https://mserver.printbaz.com/getAllPaymentDetail')
// await fetch('http://localhost:5000/getAllPaymentDetail')
.then(res=>res.json())
.then(data => {setGetAllPaymentDetail(data)})
}

useEffect(()=>{
  getPerSegmentPaymentDetailById()
    
      },[getAllPaymentDetail])
      const sortedData = getAllPaymentDetail?.sort((a, b) => {
        const timeA = new Date(a.paymentReleasedDate?.replace(" at ", " "));
        const timeB = new Date(b.paymentReleasedDate?.replace(" at ", " "));
     
        return timeB - timeA;
      });
      const newSumOfTotalReleasedAmount = getAllPaymentDetail.reduce((sum, item) => sum + item.totalRecvableAmount, 0);

return (
        <div>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <title>Admin Dashboard</title>
          <style dangerouslySetInnerHTML={{__html: "\n        * {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n/* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n.sales_report {\n    margin: 50px;\n}\n\n.seals_report_title h1{\n    margin-bottom: 50px;\n    font-weight: 600;\n}\n\n#cardbox1 {\n    -moz-box-shadow: 0 0 5px #888;\n    -webkit-box-shadow: 0 0 5px #888;\n    box-shadow: 0 0 5px #888;\n    color: #e4e5e7;\n    cursor: pointer;\n    background-color: #001846;\n    height: 130px;\n    margin-bottom: 25px;\n    border-radius: 4px;\n}\n\n.statistic-box {\n    padding: 25px;\n}\n\n.pull-right {\n    font-size: 22px !important;\n}\n\n.statistic-box h3 {\n    margin-top: 5px;\n    font-weight: 600;\n    font-size: 22px;\n}\n\n/* Total Number Of Tee Shirts Sold */\n\n.lobipanel {\n    background: white;\n    padding: 25px;\n    margin-top: 25px;\n    margin-bottom: 25px;\n    box-shadow: 0 0 5px #88888850;\n    border-radius: 4px;\n}\n\n.panel-title{\n    padding-bottom: 15px;\n    border-bottom: #001846 1px solid;\n}\n\n.panel-title h4{\n    font-size: 25px;\n    font-weight: 700;\n    text-transform: uppercase;\n}\n\n.panel-button button {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 100%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n}\n\n.panel-button button:hover {\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n}\n\n#overlay {\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background: #999;\n    width: 100%;\n    height: 100%;\n    opacity: 0.5;\n    z-index: 100;\n  }\n  #popup {\n    display: none;\n    position: absolute;\n    top: 25%;\n    left: 25%;\n    background: #fff;\n    width: 50%;\n    height: 50%;\n    z-index: 200;\n    border-radius: 15px;\n  }\n  #popupclose {\n    float: right;\n    font-weight: 700;\n    font-size: 20px;\n    padding: 10px;\n    cursor: pointer;\n  }\n  .popupcontent {\n    padding: 10px;\n  }\n  #button {\n    cursor: pointer;\n  }\n\n  /* popup box */\n\n  .popupcontent {\n    padding: 40px;\n  }\n\n  .popup-title-01 {\n    margin-bottom: 50px;\n  }\n\n  .popup-title-01 h2{\n    font-size: 30px;\n    font-weight: 600;\n    color: #001846;\n    text-transform: uppercase;\n    position: relative;\n    text-align: center;\n  }\n\n  .popup-title-01 h2::before{\n        content: \"\";\n        display: block;\n        width: 100%;\n        height: 3px;\n        background: #001846;\n        left: 0;\n        top: 100%;\n        position: absolute;\n  }\n\n   .popup-title-02 h3{\n    font-size: 20px;\n    font-weight: 600;\n    margin-bottom: 20px;\n  }\n\n  .popup-title-03 h4{\n    font-size: 18px;\n    margin-bottom: 20px;\n  }\n\n  .popupcontent input{\n    width: 100px;\n  }\n\n   .popupcontent button{\n    margin-top: 20px;\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 100%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n  .popupcontent button:hover{\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n  }\n\n    .panel-button-tr input {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 100%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n  .panel-button-tr button {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 100%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n   .panel-button-tr button:hover{\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n  }\n    " }} />
          <Navigationbar/>
          <section className="sales_report ">
            <div className="row">
              <div className="col-12">
              <div className="panel-title seals_report_title">
                    <h1>Sales Report <span style={{float: 'right'}}>    <select 
        id="productType-filter" 
        value={selectProductType} 
        className="form-control mr-5" 
        onChange={(e) => handleInputChange(e)} 
        style={{ maxWidth: '150px' }}  // Adjust the width value accordingly
    >
        <option value='Round Neck'>Round Neck</option>
        <option value="Drop Sholder">Drop Sholder</option>
        <option value="Hoodie">Hoodie</option>
    </select></span></h1>
               
                  </div>
              
              </div>
            </div>
            <div className="row non-input-bar-01">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <div id="cardbox1">
                  <div className="statistic-box">
                    <h3>Total Sales</h3>
                    <div className="counter-number pull-right">
                      <span className="count-number">{Math.floor(totalReceived)}</span>
                      <span className="slight" style={{fontWeight: 'bolder'}}>৳</span>
                    </div>
                  </div>
                
                </div>
              </div>
              {/* <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
                <div id="cardbox1">
                  <div className="statistic-box">
                    <h3> Amount Receivable From Courier</h3>
                    <div className="counter-number pull-right">
                      <span className="count-number">6,750</span>
                      <span className="slight" style={{fontWeight: 'bolder'}}>৳</span>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <div id="cardbox1">
                  <div className="statistic-box">
                    <h3>Brand Cost Released Payment</h3>
                    <div className="counter-number pull-right">
                      {/* <span className="count-number">{ Math.floor(sumOfPaymentReleased)}</span> */}
                      <span className="count-number">{ Math.floor(newSumOfTotalReleasedAmount)}</span>
                      <span className="slight" style={{fontWeight: 'bolder'}}>৳</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                <div id="cardbox1">
                  <div className="statistic-box">
                    <h3>Amount Payable</h3>
                    <div className="counter-number pull-right">
                      <span className="count-number">{Math.floor(sumOfDuesAmount)}</span>
                      <span className="slight" style={{fontWeight: 'bolder'}}>৳</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row input-bar-01">
              {/* <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="lobipanel">
                  <div className="panel-title">
                    <h4>Total Number Of Tee Shirts Sold <span style={{float: 'right'}}>{grandTotalSoldtshirt} PCS</span></h4>
               
                  </div>
                  <div className="panel-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>T-Shirt Color</th>
                          <th>Size: S</th>
                          <th>Size: M</th>
                          <th>Size: L</th>
                          <th>Size: XL</th>
                          <th>Size: XXL</th>
                          <th>Date Added</th>
                        </tr>
                      </thead>
                      {
                         selectProductType=== "Round Neck" &&
                         <tbody>
                         {
                             sizeCountsForOutForDelievryRoundNeck.map((record) => (
                                 Object.entries(record.counts)
                                 .filter(([color, sizes]) => Object.values(sizes).some(sizeCount => sizeCount > 0)) // Filter colors with no updates
                                 .map(([color, sizes]) => (
                                     <tr key={color + record.date}>
                                         <td>{color.charAt(0).toUpperCase() + color.slice(1)}</td>
                                         <td>{sizes.S ?? 0}</td>
                                         <td>{sizes.M ?? 0}</td>
                                         <td>{sizes.L ?? 0}</td>
                                         <td>{sizes.XL ?? 0}</td>
                                         <td>{sizes.XXL ?? 0}</td>
                                         <td>{record.date}</td>
                                     </tr>
                                 ))
                             ))
                         }
                         </tbody>
                         
                         
                      } {
                         selectProductType=== "Drop Sholder" &&
                         <tbody>
                         {
                             sizeCountsForOutForDelievryDropSholder.map((record) => (
                                 Object.entries(record.counts)
                                 .filter(([color, sizes]) => Object.values(sizes).some(sizeCount => sizeCount > 0)) // Filter colors with no updates
                                 .map(([color, sizes]) => (
                                     <tr key={color + record.date}>
                                         <td>{color.charAt(0).toUpperCase() + color.slice(1)}</td>
                                         <td>{sizes.S ?? 0}</td>
                                         <td>{sizes.M ?? 0}</td>
                                         <td>{sizes.L ?? 0}</td>
                                         <td>{sizes.XL ?? 0}</td>
                                         <td>{sizes.XXL ?? 0}</td>
                                         <td>{record.date}</td>
                                     </tr>
                                 ))
                             ))
                         }
                         </tbody>
                      } {
                         selectProductType=== "Hoodie" &&
                         <tbody>
                         {
                             sizeCountsForOutForDelievryHoodie.map((record) => (
                                 Object.entries(record.counts)
                                 .filter(([color, sizes]) => Object.values(sizes).some(sizeCount => sizeCount > 0)) // Filter colors with no updates
                                 .map(([color, sizes]) => (
                                     <tr key={color + record.date}>
                                         <td>{color.charAt(0).toUpperCase() + color.slice(1)}</td>
                                         <td>{sizes.S ?? 0}</td>
                                         <td>{sizes.M ?? 0}</td>
                                         <td>{sizes.L ?? 0}</td>
                                         <td>{sizes.XL ?? 0}</td>
                                         <td>{sizes.XXL ?? 0}</td>
                                         <td>{record.date}</td>
                                     </tr>
                                 ))
                             ))
                         }
                         </tbody>
                      }
            
                    </table>
                  </div>
                  <div className="panel-button">
                    <button id="button" onClick={handleGotoTotalSoldThsirt} sizeCountsForOutForDelievryHoodie={sizeCountsForOutForDelievryHoodie}sizeCountsForOutForDelievryDropSholder={sizeCountsForOutForDelievryDropSholder} sizeCountsForOutForDelievryRoundNeck={sizeCountsForOutForDelievryRoundNeck}>View More</button>
                 
                  </div>
               
                </div>
              </div> */}
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="lobipanel">
                  <div className="panel-title">
                    <h4>Total Received<span style={{float: 'right'}}>{Math.floor(totalReceived)} ৳</span></h4>
                  </div>
                  <div className="panel-body">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Order ID</th>
                          <th>Delivery Status</th>
                          <th>Delivery Service</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          paidOrderDelivList?.slice(0,4).map(paidOrders=>
                            <tr className="info">
                            <td>{paidOrders?.statusDate}</td>
                            <td><a href={`/viewOrder/${paidOrders?.orderId}`} target="_blank" rel="noreferrer">{paidOrders?.orderId}</a></td>
                            <td><p style={{padding:"5px",backgroundColor:"green",color:"white",width:"150px",textAlign:"center",borderRadius:"5px"}}>{paidOrders?.orderStatus}</p> </td>
                            <td> <p style={{padding:"5px",backgroundColor:"orange",color:"white",width:"150px",textAlign:"center",borderRadius:"5px"}}>{paidOrders?.deliveryAssignTo}</p></td>
                            <td>{Math.floor(paidOrders?.printBazRcvable)}  tk</td>
                          </tr>
                            )
                        }
                       </tbody>
                    </table>
                  </div>
                  <div className="panel-button-tr">
                    {/* <input type="text" id="rcvAmount"  value={inputRcvAmount} placeholder="Type ammount & update" style={{paddingLeft: '5px'}}  onClick={handleRcvInput}/> */}
                  
                    <button id="button" style={{paddingLeft: '5px'}} onClick={handleGotoTotalRcvPage}>View More</button>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="lobipanel">
                  <div className="panel-title">
                    <h4>Brand Payment released<span style={{float: 'right'}}>{ Math.floor(newSumOfTotalReleasedAmount)}৳</span></h4>
                  </div>
                  <div className="panel-body">
                  <table className="table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Brand</th>
                    <th>Contact</th>
                    <th>Payment Released Amount</th>
                    <th>Due Amount</th>
                </tr>
            </thead>
            <tbody>
    {/* {dueAbove1000?.map(merchant => {
        if (!merchant?.payments || merchant.payments.length === 0) {
            // This merchant has no payments, so return null or a placeholder row
            return null;
        }
        
        const lastPayment = merchant.payments[merchant.payments.length - 1];
        return (
            <tr className="info" key={lastPayment.paymentReleasedDate}>
                <td>{lastPayment.paymentReleasedDate}</td>
                <td>
                       {merchant.brandName}
                 
                </td>
                <td>{merchant.phone}</td>
                <td style={{textAlign:"center"}}>{lastPayment.paymentReleasedAmount}</td>
                <td>{Math.floor(merchant.dueAmountNow)}</td>
            </tr>
        );
    })} */}

    {
      sortedData?.map(orders=>
        <tr>
          <td>{orders?.paymentReleasedDate}</td>
          <td>{orders?.clinetBrandName}</td>
          <td>{orders?.clientNumber}</td>
          <td>{orders?.totalRecvableAmount}</td>
          <td>{orders?.totalDueAmount}</td>
        </tr>
      )
    }
</tbody>


        </table>
                  </div>
                  {/* <div className="panel-button-tr">
                    <input type="text" placeholder="Type ammount & update" style={{paddingLeft: '5px'}} />
                    <button id="button" style={{float: 'right'}}>View More</button>
                    <button style={{float: 'right'}}>Update</button>
                  </div> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      );
};

export default SalesReport;
