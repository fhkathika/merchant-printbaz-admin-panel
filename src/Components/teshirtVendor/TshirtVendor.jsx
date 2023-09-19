import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetMongoData from '../../hooks/useGetMongoData';
import AddDamage from '../alert/AddDamage';
import AddDeliveryList from '../alert/AddDeliveryList';
import AddTshirtPurchased from '../alert/AddTshirtPurchased';
import Navigationbar from '../navigationBar/Navigationbar';

const TshirtVendor = () => {
  const { orderAll } = useGetMongoData();
  const [showAlert, setShowAlert] = useState(false);
  const [showDamage, setShowDamage] = useState(false);
  const [getPurchaseTshirt, setGetPurchaseTshirt] = useState([]);
  const [getDamagedTshirt, setGetDamagedTshirt] = useState([]);
  const navigate=useNavigate()
  let pendingOrders = orderAll?.filter(users => users?.orderStatus === "Pending");
  let   approvedOrders=orderAll?.filter(users=>users?.orderStatus==="Approved");
  let   confirmedOrders=orderAll?.filter(users=>users?.orderStatus==="confirmed");
  let inProductionOrders=orderAll?.filter(users=>users?.orderStatus==="in-production");
  const [tShirtDetail,setTshirtDetail]=useState([{
    tshirtColor:"",
    sizeM:"",
    sizeL:"",
    sizeXL:"",
    sizeXXL:"",
    sizeS:"",
    perpisCost:"",
    totalCost:"",
    date:""
    
  },

]) 
const handleAddDeliveryPopUp=()=>{
  setShowAlert(true)
  setTshirtDetail([{
    tshirtColor:"",
    sizeM:"",
    sizeL:"",
    sizeXL:"",
    sizeXXL:"",
    sizeS:"",
    perpisCost:"",
    totalCost:"",
    date:""
    
  },

])
  console.log("click delivery system popup",showAlert);
 
} 
 const handleDamagePopUp=()=>{
  setShowDamage(true)
  console.log("click delivery system popup",showDamage);
 
}
const handleaAllPurchasedTshirts=()=>{
  navigate('/allPurchasedTshirt')
}
const handleaAllDamagedTshirts=()=>{
  navigate('/allDamagedTshirt')
}
const fetchData = () => {
  // fetch('http://localhost:5000/getAllPurchasedTshirts')
  fetch('https://mserver.printbaz.com/getAllPurchasedTshirts')
  .then(response => response.json())
  .then(data => {
    console.log("Fetched Data:", data);
    setGetPurchaseTshirt(data)
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
const fetchDamagedThsirt = () => {
  // fetch('http://localhost:5000/getAllDamagedTshirts')
  fetch('https://mserver.printbaz.com/getAllDamagedTshirts')
  .then(response => response.json())
  .then(data => {
    console.log("Fetched Data:", data);
    setGetDamagedTshirt(data)
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
let totalCostOfTshirt=0;
getPurchaseTshirt.forEach((item)=>{
  totalCostOfTshirt+=item.totalCost
})
console.log("totalCostOfTshirt",totalCostOfTshirt);
useEffect(() => {
  fetchData();
  fetchDamagedThsirt()
}, []);

 // Initialize counts
 let totalBlackSizeM = 0;
 let totalBlackSizeL = 0;
 let totalBlackSizeXL = 0;
 let totalBlackSizeXXL = 0;
 let totalBlackSizeS = 0; 
 let totalwhiteSizeM = 0;
 let totalwhiteSizeL = 0;
 let totalwhiteSizeXL = 0;
 let totalwhiteSizeXXL = 0;
 let totalwhiteSizeS = 0;
  // Filter out the records for black t-shirts
  const blackTshirts = getPurchaseTshirt.filter(record => record.tshirtColor === 'black');
  const whiteTshirts = getPurchaseTshirt.filter(record => record.tshirtColor === 'white');
  // Sum the counts
  for (const record of blackTshirts) {
    totalBlackSizeM += Number(record.sizeM || 0);
    totalBlackSizeL += Number(record.sizeL || 0);
    totalBlackSizeXL += Number(record.sizeXL || 0);
    totalBlackSizeXXL += Number(record.sizeXXL || 0);
    totalBlackSizeS += Number(record.sizeS || 0);
  }
  // Sum the counts
  for (const record of whiteTshirts) {
    totalwhiteSizeM += Number(record.sizeM || 0);
    totalwhiteSizeL += Number(record.sizeL || 0);
    totalwhiteSizeXL += Number(record.sizeXL || 0);
    totalwhiteSizeXXL += Number(record.sizeXXL || 0);
    totalwhiteSizeS += Number(record.sizeS || 0);
  }
//damage tshirt 
   // Initialize counts
 let totalDamgBlackSizeM = 0;
 let totalDamgBlackSizeL = 0;
 let totalDamgBlackSizeXL = 0;
 let totalDamgBlackSizeXXL = 0;
 let totalDamgBlackSizeS = 0; 
 let totalDamgwhiteSizeM = 0;
 let totalDamgwhiteSizeL = 0;
 let totalDamgwhiteSizeXL = 0;
 let totalDamgwhiteSizeXXL = 0;
 let totalDamgwhiteSizeS = 0;
  // Filter out the records for black t-shirts
  const blackDmgTshirts = getDamagedTshirt.filter(record => record.tshirtColor === 'black');
  const whiteDmgTshirts = getDamagedTshirt.filter(record => record.tshirtColor === 'white');
  // Sum the counts
  for (const record of blackDmgTshirts) {
    totalDamgBlackSizeM += Number(record.sizeM || 0);
    totalDamgBlackSizeL += Number(record.sizeL || 0);
    totalDamgBlackSizeXL += Number(record.sizeXL || 0);
    totalDamgBlackSizeXXL += Number(record.sizeXXL || 0);
    totalDamgBlackSizeS += Number(record.sizeS || 0);
  }
  // Sum the counts
  for (const record of whiteDmgTshirts) {
    totalDamgwhiteSizeM += Number(record.sizeM || 0);
    totalDamgwhiteSizeL += Number(record.sizeL || 0);
    totalDamgwhiteSizeXL += Number(record.sizeXL || 0);
    totalDamgwhiteSizeXXL += Number(record.sizeXXL || 0);
    totalDamgwhiteSizeS += Number(record.sizeS || 0);
  }

console.log("totalDamgBlackSizeL",totalDamgBlackSizeL);
console.log("totalDamgBlackSizeXL",totalDamgBlackSizeXL);
console.log("totalDamgBlackSizeXXL",totalDamgBlackSizeXXL);
console.log("totalDamgBlackSizeS",totalDamgBlackSizeS);
console.log("totalDamgwhiteSizeM",totalDamgwhiteSizeM);
console.log("totalDamgwhiteSizeL",totalDamgwhiteSizeL);
console.log("totalDamgwhiteSizeXL",totalDamgwhiteSizeXL);
console.log("totalDamgwhiteSizeXXL",totalDamgwhiteSizeXXL);
console.log("totalDamgwhiteSizeS",totalDamgwhiteSizeS);
const totalTshirtPurchased=
totalBlackSizeM+
totalBlackSizeL+
totalBlackSizeXL+
totalBlackSizeXXL+
totalBlackSizeS+
totalwhiteSizeM+
totalwhiteSizeL+
totalwhiteSizeXL+
totalwhiteSizeXXL+
totalwhiteSizeS
const countSizeForOrders = (orders, size) => {
  return orders?.reduce((acc, order) => {
    return (order?.orderDetailArr || []).reduce((innerAcc, item) => {
      if (item.color === "black") {
        // Initialize the size object for black if it doesn't exist
        if (!innerAcc.black[item.teshirtSize]) {
          innerAcc.black[item.teshirtSize] = 0;
        }
        innerAcc.black[item.teshirtSize] += parseInt(item.quantity || 0);
      } else if (item.color === "white") {
        // Initialize the size object for white if it doesn't exist
        if (!innerAcc.white[item.teshirtSize]) {
          innerAcc.white[item.teshirtSize] = 0;
        }
        innerAcc.white[item.teshirtSize] += parseInt(item.quantity || 0);
      }
      return innerAcc;
    }, acc);
  }, { white: {}, black: {} });
};

const sizeCountsForInProduction = countSizeForOrders(inProductionOrders);

console.log("sizeCountsForInProduction",sizeCountsForInProduction);
const whiteM=Number(totalwhiteSizeM)-(Number(sizeCountsForInProduction.white?.m?sizeCountsForInProduction.white?.m:0)+Number(totalDamgwhiteSizeM))
const whiteL= Number(totalwhiteSizeL)-(Number(sizeCountsForInProduction.white?.L?sizeCountsForInProduction.white?.L:0)+Number(totalDamgwhiteSizeL))
const whiteXL=Number(totalwhiteSizeXL)-(Number(sizeCountsForInProduction.white?.XL?sizeCountsForInProduction.white?.XL:0)+Number(totalDamgwhiteSizeXL))
const whiteXXL=Number(totalwhiteSizeXXL)-(Number(sizeCountsForInProduction.white?.XXL?sizeCountsForInProduction.white?.XXL:0)+Number(totalDamgwhiteSizeXXL))
const blackM=Number(totalBlackSizeM)-(Number(sizeCountsForInProduction.black?.m?sizeCountsForInProduction.black?.m:0)+Number(totalDamgBlackSizeM))
const bvlackL=Number(totalBlackSizeL)-(Number(sizeCountsForInProduction.black?.L?sizeCountsForInProduction.black?.L:0)+Number(totalDamgBlackSizeL))
const blackXL= Number(totalBlackSizeXL)-(Number(sizeCountsForInProduction.black?.XL?sizeCountsForInProduction.black?.XL:0)+Number(totalDamgBlackSizeXL))
const blackXXL=Number(totalBlackSizeXXL)-(Number(sizeCountsForInProduction.black?.XXL?sizeCountsForInProduction.black?.XXL:0)+Number(totalDamgBlackSizeXXL))
console.log("Number(totalBlackSizeM)-Number(sizeCountsForInProduction.black?.m?sizeCountsForInProduction.black?.m:0+Number(totalDamgBlackSizeM))",Number(totalBlackSizeM)-(Number(sizeCountsForInProduction.black?.m?sizeCountsForInProduction.black?.m:0)+Number(totalDamgBlackSizeM)));

const TotalDamageTshirt=
totalDamgBlackSizeM+
totalDamgBlackSizeL+
totalDamgBlackSizeXL+
totalDamgBlackSizeXXL+
totalDamgBlackSizeS+
totalDamgwhiteSizeM+
totalDamgwhiteSizeL+
totalDamgwhiteSizeXL+
totalDamgwhiteSizeXXL+
totalDamgwhiteSizeS
const totalTshirtInventory=whiteM+
whiteL+
whiteXL+
whiteXXL+
blackM+
bvlackL+
blackXL+
blackXXL;

const sizeCountsForConfirmedOrders = countSizeForOrders(confirmedOrders);
const sizeCountsForPendingOrders = countSizeForOrders(pendingOrders);
const sizeCountsForApprovedOrders = countSizeForOrders(approvedOrders);

const sumSizeAcrossOrdersWhite = (size) => {
  return [
    // sizeCountsForInProduction,
    sizeCountsForConfirmedOrders,
    sizeCountsForPendingOrders,
    sizeCountsForApprovedOrders
  ].reduce((acc, sizeCounts) => acc + (sizeCounts.white?.[size] || 0), 0);
}; 
  const sumSizeAcrossOrdersBlack= (size) => {
  return [
   
    sizeCountsForConfirmedOrders,
    sizeCountsForPendingOrders,
    sizeCountsForApprovedOrders
  ].reduce((acc, sizeCounts) => acc + (sizeCounts.black?.[size] || 0), 0);
};

const whiteMNeeded = sumSizeAcrossOrdersWhite("m");
const whiteLNeeded = sumSizeAcrossOrdersWhite("L");
const whiteXlNeeded = sumSizeAcrossOrdersWhite("XL");
const whiteXxlNeeded = sumSizeAcrossOrdersWhite("XXL");
const blackMNeeded =  sumSizeAcrossOrdersBlack("m");
const blackLNeeded =  sumSizeAcrossOrdersBlack("L");
const blackXlNeeded = sumSizeAcrossOrdersBlack("XL");
const blackXxlNeeded =sumSizeAcrossOrdersBlack("XXL");
return (
        <div>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <link rel="stylesheet" href="styles.css" />
          <title>Admin Dashboard</title>
          <style dangerouslySetInnerHTML={{__html: "\n        * {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n/* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n.sales_report {\n    margin: 50px;\n}\n\n.seals_report_title h1{\n    margin-bottom: 50px;\n    font-weight: 600;\n}\n\n#cardbox1 {\n    -moz-box-shadow: 0 0 5px #888;\n    -webkit-box-shadow: 0 0 5px #888;\n    box-shadow: 0 0 5px #888;\n    color: #e4e5e7;\n    cursor: pointer;\n    background-color: #001846;\n    height: 130px;\n    margin-bottom: 25px;\n    border-radius: 4px;\n}\n\n.statistic-box {\n    padding: 25px;\n}\n\n.pull-right {\n    font-size: 22px !important;\n}\n\n.statistic-box h3 {\n    margin-top: 5px;\n    font-weight: 600;\n    font-size: 22px;\n}\n\n/* Total Number Of Tee Shirts Sold */\n\n.lobipanel {\n    background: white;\n    padding: 25px;\n    margin-top: 25px;\n    margin-bottom: 25px;\n    box-shadow: 0 0 5px #88888850;\n    border-radius: 4px;\n}\n\n.panel-title{\n    padding-bottom: 15px;\n    border-bottom: #001846 1px solid;\n}\n\n.panel-title h4{\n    font-size: 25px;\n    font-weight: 700;\n    text-transform: uppercase;\n}\n\n.panel-button button {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 48%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n}\n\n.panel-button button:hover {\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n}\n\n#overlay {\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background: #999;\n    width: 100%;\n    height: 100%;\n    opacity: 0.5;\n    z-index: 100;\n  }\n  #popup {\n    display: none;\n    position: absolute;\n    top: 25%;\n    left: 25%;\n    background: #fff;\n    width: 50%;\n    height: 50%;\n    z-index: 200;\n    border-radius: 15px;\n  }\n  #popupclose {\n    float: right;\n    font-weight: 700;\n    font-size: 20px;\n    padding: 10px;\n    cursor: pointer;\n  }\n  .popupcontent {\n    padding: 10px;\n  }\n  #button {\n    cursor: pointer;\n  }\n\n  /* popup box */\n\n  .popupcontent {\n    padding: 40px;\n  }\n\n  .popup-title-01 {\n    margin-bottom: 50px;\n  }\n\n  .popup-title-01 h2{\n    font-size: 30px;\n    font-weight: 600;\n    color: #001846;\n    text-transform: uppercase;\n    position: relative;\n    text-align: center;\n  }\n\n  .popup-title-01 h2::before{\n        content: \"\";\n        display: block;\n        width: 100%;\n        height: 3px;\n        background: #001846;\n        left: 0;\n        top: 100%;\n        position: absolute;\n  }\n\n   .popup-title-02 h3{\n    font-size: 20px;\n    font-weight: 600;\n    margin-bottom: 20px;\n  }\n\n  .popup-title-03 h4{\n    font-size: 18px;\n    margin-bottom: 20px;\n  }\n\n  .popupcontent input{\n    width: 100px;\n  }\n\n   .popupcontent button{\n    margin-top: 20px;\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 100%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n  .popupcontent button:hover{\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n  }\n\n    .panel-button-tr input {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 32%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n  .panel-button-tr button {\n    margin-right: 10px;\n    padding: 5px 0 5px 0;\n    width: 32%;\n    font-size: 18px;\n    border-radius: 5px;\n    border: 1px #cfd7df solid;\n    background: #ffffff;\n  }\n\n   .panel-button-tr button:hover{\n    border: 1px solid #cfd7df;\n    color: #12344d;\n    background: #EBEDF0;\n    transition: .1s ease-in;\n  }\n    " }} />
          <Navigationbar/>
          <section className="sales_report">
            <div className="row">
              <div className="col-12">
                <div className="seals_report_title">
                  <h1>Tee Shirt Vendor Report</h1>
                </div>
              </div>
            </div>
            <div className="row non-input-bar-01">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div id="cardbox1">
                  <div className="statistic-box">
                    <h3>Total Cost Of Tee Shirt</h3>
                    <div className="counter-number pull-right">
                      <span className="count-number">{Number(totalCostOfTshirt)}</span>
                      <span className="slight" style={{fontWeight: 'bolder'}}>৳</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div id="cardbox1">
                  <div className="statistic-box">
                    <h3>Inventory Value</h3>
                    <div className="counter-number pull-right">
                      <span className="count-number">0</span>
                      <span className="slight" style={{fontWeight: 'bolder'}}>৳</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="lobipanel m-0" style={{height: '374px'}}>
                  <div className="panel-title">
                    <h4>Inventory<span style={{float: 'right'}}>{totalTshirtInventory} PCS</span></h4>
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
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="info">
                          <td>Black</td>
                          <td>{totalBlackSizeS}</td>
                          <td>{blackM}</td>
                          <td>{bvlackL}</td>
                          <td>{blackXL}</td>
                          <td>{blackXXL}</td>
                        </tr>
                        <tr>
                          <td>White</td>
                          <td>{totalwhiteSizeS}</td>
                          <td>{whiteM}</td>
                          <td>{whiteL}</td>
                          <td>{whiteXL}</td>
                          <td>{whiteXXL}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
               <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                 <div className='row'>
               <div className="col-md-6">
               
               <div className="card stat-card" style={{height:"auto"}}>
               <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                 <div className="card-body ">
                 <h5 className="">White T-shirt Needed (PAC)</h5>
                 <div style={{display:"flex"}}>
<div>
<p className="float-right">M  - {whiteMNeeded}</p>
 <p className="float-right">L  -  {whiteLNeeded}</p>
 <p className="float-right"> XL - {whiteXlNeeded}</p>
 <p className="float-right"> XXL  -  {whiteXxlNeeded}</p>
</div>
</div>

                  
                   
                   </div>
               <div>
               <div className="card-body" style={{display:"flex",justifyContent:"center",height:"50%"}}>
                  
                  {/* <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countTotalTshirtDispatched}</h4> */}
                  </div>
               <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 20px",marginTop:"35px"}}>
                  
                  {/* <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-totalTShirt"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span> */}
              {/* <div id="order-detail-totalTShirt"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
              <GetTotalTshirtDispatched countTotalTshirtDispatched={countTotalTshirtDispatched} whiteQuantity={whiteQuantity} blackQuantity={blackQuantity}/>
          </div>  */}
            
                </div>
               </div>
              
                   </div>
                  
               </div>
              
             

             </div>
              <div className="col-md-6">
               
               <div className="card stat-card" style={{height:"auto"}}>
               <div className="" style={{display:"flex",justifyContent:"space-between",alignItem:"center"}}>
                 <div className="card-body ">
                 <h5 className="">Black T-shirt Needed (PAC)</h5>
                 <div style={{display:"flex"}}>
<div>

<p className="float-right">M  - {blackMNeeded}</p>
   <p className="float-right">L  -  {blackLNeeded}</p>
   <p className="float-right"> XL - {blackXlNeeded}</p>
  <p className="float-right"> XXL  -  {blackXxlNeeded}</p>
</div>

                 </div>
                  
                   
                   </div>
               <div>
               <div className="card-body" style={{display:"flex",justifyContent:"center",height:"50%"}}>
                  
                  {/* <h4 className="float-right" style={{marginLeft:"40px",marginTop:"2px"}}>{countTotalTshirtDispatched}</h4> */}
                  </div>
               <div  style={{display:"flex",justifyContent:"flex-end",padding:"0px 20px",marginTop:"35px"}}>
                  
                  {/* <span style={{cursor:"pointer"}} onClick={downloadInfIntoXl} data-order-id="order-detail-totalTShirt"><img style={{width:"25px",hight:"25px"}} src="/images/download.png" alt='download'/></span> */}
              {/* <div id="order-detail-totalTShirt"style={{position: 'absolute', left: '-10000px', top: '-10000px'}}>
              <GetTotalTshirtDispatched countTotalTshirtDispatched={countTotalTshirtDispatched} whiteQuantity={whiteQuantity} blackQuantity={blackQuantity}/>
          </div> 
             */}
                </div>
               </div>
              
                   </div>
                  
               </div>
              
             

             </div>
             </div>
              </div>
             
            </div>
            <div className="row input-bar-01">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="lobipanel">
                  <div className="panel-title">
                    <h4>Damaged<span style={{float: 'right'}}>{TotalDamageTshirt} PCS</span></h4>
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
                      <tbody>
                    
                          {
                            getDamagedTshirt?.slice(0,4)?.map(damaged=>
                              <tr className="info">
                          <>
                              </>
                              <td>{damaged?.tshirtColor}</td>
                              <td>{damaged?.sizeS}</td>
                              <td>{damaged?.sizeM}</td>
                              <td>{damaged?.sizeL}</td>
                              <td>{damaged?.sizeXL}</td>
                              <td>{damaged?.sizeXXL}</td>
                              <td>{damaged?.date}</td>
                              
                                   
                        </tr>
                              )
                            
                          }
                  
                      
                        
                      </tbody>
                    </table>
                  </div>
                  <div className="panel-button">
                    <button id="button" onClick={handleDamagePopUp}>Update</button>
                    <button style={{float: 'right'}} onClick={handleaAllDamagedTshirts}>View More</button>
                  </div>
                
                  {showDamage===true && (
          
          <AddDamage
        
          // returnValue={returnValue}
          setTshirtDetail={setTshirtDetail}
          tShirtDetail={tShirtDetail}
          showDamage={showDamage}
          fetchDamagedThsirt={ fetchDamagedThsirt}
          message="Your delivery list has been updated successfully."
          onClose={() => setShowDamage(false)}
        
          
          
          />
          
          
          )
          
          
          }
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="lobipanel">
                  <div className="panel-title">
                    <h4>Total Tee Shirt Purchased<span style={{float: 'right'}}>{totalTshirtPurchased} PCS</span></h4>
                  </div>
                  <div className="panel-body">
                    <table className="table">
                      <thead>
                        <tr>
                        <th>Date </th>
                          <th>T-Shirt Color</th>
                          <th>Size: S</th>
                          <th>Size: M</th>
                          <th>Size: L</th>
                          <th>Size: XL</th>
                          <th>Size: XXL</th>
                          <th>Per pcs</th>
                          <th>Total Cost</th>
                         
                        </tr>
                      </thead>
                      <tbody>
                        {
                          getPurchaseTshirt?.slice(0,4)?.map(tshirt=>
                            <tr className="info">
                            <td>{tshirt?.date}</td>
                            <td>{tshirt?.tshirtColor}</td>
                            <td>{tshirt?.sizeS}</td>
                            <td>{tshirt?.sizeM}</td>
                            <td>{tshirt?.sizeL}</td>
                            <td>{tshirt?.sizeXL}</td>
                            <td>{tshirt?.sizeXXL}</td>
                            <td>{tshirt?.perpisCost} tk</td>
                            <td>{tshirt?.totalCost} tk</td>
                          </tr>
                            )
                        }

                       </tbody>
                    </table>
                  </div>
                  <div className="panel-button">
                    <button id="button" onClick={handleAddDeliveryPopUp}>Update55</button>
                    <button style={{float: 'right'}} onClick={handleaAllPurchasedTshirts}>View More</button>
                  </div>
                  {showAlert===true && (
          
          <AddTshirtPurchased
          fetchData={fetchData}
          // returnValue={returnValue}
          setTshirtDetail={setTshirtDetail}
          tShirtDetail={tShirtDetail}
          showAlert={showAlert}
        
          message="Your delivery list has been updated successfully."
          onClose={() => setShowAlert(false)}
        
          
          
          />
          
          
          )
          
          
          } 
         
              
                </div>
              </div>
            </div>
          </section>
        </div>

        
      );
};

export default TshirtVendor;

