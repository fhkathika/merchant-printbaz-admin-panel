import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetMongoData from '../../hooks/useGetMongoData';
import AddDamage from '../alert/AddDamage';
import AddDeliveryList from '../alert/AddDeliveryList';
import AddTshirtPurchased from '../alert/AddTshirtPurchased';
import DeleteRoleAlert from '../alert/DeleteRoleAlert';
import UpdateAlert from '../alert/UpdateAlert';
import Navigationbar from '../navigationBar/Navigationbar';
import TShirtCardPAC from '../TShirtCardPAC';
const TshirtVendor = () => {
  const { orderAll } = useGetMongoData();
  const [showAlert, setShowAlert] = useState(false);
  const [showDamage, setShowDamage] = useState(false);
  const [getPurchaseTshirt, setGetPurchaseTshirt] = useState([]);
  const [getPurchaseTshirtById, setGetPurchaseTshirtById] = useState();
  const [getDamagedTshirt, setGetDamagedTshirt] = useState([]);
  const navigate=useNavigate()
  let pendingOrders = orderAll?.filter(users => users?.orderStatus === "Pending");
  let approvedOrders=orderAll?.filter(users=>users?.orderStatus==="Approved");
  let confirmedOrders=orderAll?.filter(users=>users?.orderStatus==="confirmed");
  let inProductionOrders=orderAll?.filter(users=>users?.orderStatus==="in-production");
  const [clickedId, setClickedId] = useState();
  const [deletepopUp, setDeletepopUp] = useState(false);
  const [damageDeletepopUp, setDamageDeletepopUp] = useState(false);
  const [updatepopUp, setUpdatepopUp] = useState(false);
  const [selectProductTypeForPurchased, setSelectProductTypeForPurchased] = useState('Round Neck');
  const [selectProductTypeForDamaged, setSelectProductTypeForDamaged] = useState('Round Neck');
  const [tShirtDetail,setTshirtDetail]=useState([{
    tshirtColor:"",
    category:"",
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
const handleDeletePopUp=(id)=>{
  // e.stopPropagation();
  console.log("Received id:", id);
  setDeletepopUp(true)
  setDamageDeletepopUp(true)
  setClickedId(id)
}
const handleUpdatePopUp=(id)=>{
  // e.stopPropagation();
  console.log("Received id:", id);
  setUpdatepopUp(true)
  setClickedId(id)
  // fetch(`http://localhost:5000/editPurchasedItem/${id}`)
  fetch(`https://mserver.printbaz.com/editPurchasedItem/${id}`)
  .then(response => response.json())
  .then(data => {
    // console.log("Fetched Data:", data);
    setGetPurchaseTshirtById(data)
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
const handleInputChangeTotalPurchased = (event) => {
  const { id, value } = event.target;
  switch (id) {
    case 'productType-filterForPurchased':
      setSelectProductTypeForPurchased(value);
      break; 
    default:
      break;
  }
  
};
const handleInputChangeDamaged = (event) => {
  const { id, value } = event.target;
  switch (id) {
    case 'productType-filterForPurchased':
      setSelectProductTypeForDamaged(value);
      break; 
    default:
      break;
  }
  
};
const handleDeleteModalClose=()=>{
  setDeletepopUp(false)
  setDamageDeletepopUp(false)
}
const handleUpdateModalClose=()=>{
  setUpdatepopUp(false)
}
const handleDamageDeleteItem =(id)=>{
  // e.preventDefault()
  // e.stopPropagation();
  setDamageDeletepopUp(true)


  // const proceed= window.confirm('Do you want to remove?')
  if(damageDeletepopUp){
    // fetch(`http://localhost:5000/deleteDamageProduct/${id}`,{
    fetch(`https://mserver.printbaz.com/deleteDamageProduct/${id}`,{
      method : 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
    
      if(data?.deletedCount>0){
      
        // convert object into array
        // const asArray = Object.entries(getAllRoles);
       
        setDamageDeletepopUp(false)
        fetchData();
      }
      
    })
  }
 
  
}
const handleDeleteItem =(id)=>{
  // e.preventDefault()
  // e.stopPropagation();
  setDeletepopUp(true)


  // const proceed= window.confirm('Do you want to remove?')
  if(deletepopUp){
    // fetch(`http://localhost:5000/deletePurchasedProduct/${id}`,{
    fetch(`https://mserver.printbaz.com/deletePurchasedProduct/${id}`,{
      method : 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
    
      if(data?.deletedCount>0){
      
        // convert object into array
        // const asArray = Object.entries(getAllRoles);
       
        setDeletepopUp(false)
        fetchData();
      }
      
    })
  }
 
  
}


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
 
} 

 const handleDamagePopUp=()=>{
  setShowDamage(true)
 
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
    // console.log("Fetched Data:", data);
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
    // console.log("Fetched Data:", data);
    setGetDamagedTshirt(data)
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

let roundNeckFilter=getPurchaseTshirt?.filter(users=>users?.category==="Round Neck");
let dropSholderFilter=getPurchaseTshirt?.filter(users=>users?.category==="Drop Sholder");
let hoodiesFilter=getPurchaseTshirt?.filter(users=>users?.category==="Hoodie");
// for mage product  filter 
let roundNeckDamageFilter=getDamagedTshirt?.filter(users=>users?.category==="Round Neck");
let dropSholderDamageFilter=getDamagedTshirt?.filter(users=>users?.category==="Drop Sholder");
let hoodiesDamageFilter=getDamagedTshirt?.filter(users=>users?.category==="Hoodie");

let totalCostOfTshirt=0;

  if (selectProductTypeForPurchased==="Round Neck") {
    roundNeckFilter.forEach((item)=>{
      totalCostOfTshirt+=item.totalCost
    })
  } if (selectProductTypeForPurchased==="Drop Sholder") {
    dropSholderFilter.forEach((item)=>{
      totalCostOfTshirt+=item.totalCost
    })
  } if (selectProductTypeForPurchased==="Hoodie") {
    hoodiesFilter.forEach((item)=>{
      totalCostOfTshirt+=item.totalCost
    })
  }
 


useEffect(() => {
  fetchData();
  fetchDamagedThsirt()
}, []);

const countSizeForOrders = (orders) => {
  return orders?.reduce((acc, order) => {
    return (order?.orderDetailArr || []).reduce((innerAcc, item) => {
      const color = item.color.toLowerCase();
      
      // Initialize innerAcc[color] if it doesn't exist
      if (!innerAcc[color]) {
        innerAcc[color] = {};
      }
      
      // Check if the teshirtSize is a string or an object
      if (typeof item.teshirtSize === 'string') {
        // Handle string case (old format)
        if (!innerAcc[color][item.teshirtSize]) {
          innerAcc[color][item.teshirtSize] = 0;
        }
        innerAcc[color][item.teshirtSize] += parseInt(item.quantity || 0);
      } else {
        // Handle object case (new format)
        Object.entries(item.teshirtSize || {}).forEach(([size, quantity]) => {
          if (!innerAcc[color][size]) {
            innerAcc[color][size] = 0;
          }
          innerAcc[color][size] += parseInt(quantity || 0);
        });
      }
  
      return innerAcc;
    }, acc);
  }, { white: {}, black: {},green:{},maroon:{},nBlue:{},gray:{},red:{} /* Initialize other colors as needed */ });
};
// previous function 
// const countSizeForOrders = (orders, size) => {
//   return orders?.reduce((acc, order) => {
//     return (order?.orderDetailArr || []).reduce((innerAcc, item) => {
//       if (item.color === "black") {
//         // Initialize the size object for black if it doesn't exist
//         if (!innerAcc.black[item.teshirtSize]) {
//           innerAcc.black[item.teshirtSize] = 0;
//         }
//         innerAcc.black[item.teshirtSize] += parseInt(item.quantity || 0);
//       } else if (item.color === "white") {
//         // Initialize the size object for white if it doesn't exist
//         if (!innerAcc.white[item.teshirtSize]) {
//           innerAcc.white[item.teshirtSize] = 0;
//         }
//         innerAcc.white[item.teshirtSize] += parseInt(item.quantity || 0);
//       }
//       return innerAcc;
//     }, acc);
//   }, { white: {}, black: {} });
// };

const sizeCountsForInProduction = countSizeForOrders(inProductionOrders);
  let totalDamaged = 0;
  const TotalDamageTshirt = (array) => {
    array.forEach(damaged => {
      totalDamaged += (
        parseInt(damaged.sizeS || 0) + 
        parseInt(damaged.sizeM || 0) + 
        parseInt(damaged.sizeL || 0) + 
        parseInt(damaged.sizeXL || 0) + 
        parseInt(damaged.sizeXXL || 0)
      );
    });
  }
  if (selectProductTypeForDamaged === "Round Neck") {
    TotalDamageTshirt(roundNeckDamageFilter);

  } else if (selectProductTypeForDamaged === "Drop Sholder") {
    TotalDamageTshirt(dropSholderDamageFilter);

  } else if (selectProductTypeForDamaged === "Hoodie") {
    TotalDamageTshirt(hoodiesDamageFilter);

  }
    let totalPurchased = 0;
  const TotalPurchasedTshirt = (array) => {
    array.forEach(purchased => {
      totalPurchased += (
        parseInt(purchased.sizeS || 0) + 
        parseInt(purchased.sizeM || 0) + 
        parseInt(purchased.sizeL || 0) + 
        parseInt(purchased.sizeXL || 0) + 
        parseInt(purchased.sizeXXL || 0)
      );
    });
  }
  if (selectProductTypeForPurchased === "Round Neck") {
    TotalPurchasedTshirt(roundNeckFilter);

  } else if (selectProductTypeForPurchased === "Drop Sholder") {
    TotalPurchasedTshirt(dropSholderFilter);

  } else if (selectProductTypeForPurchased === "Hoodie") {
    TotalPurchasedTshirt(hoodiesFilter);

  }
  const availableColors = ["black", "white", "red", "nevy blue", "green"];
  const availableSizes = [ "sizeS", "sizeM", "sizeXL", "sizeXXL"];

// count tshirt based on color and size 
const calculateTotalForColorAndSize = (data, color, sizeKey) => {
  return data.reduce((acc, tshirt) => {
    if (tshirt.tshirtColor === color) {
      return acc + parseInt(tshirt[sizeKey] || 0);
    }
    return acc;
  }, 0);
};

let COLORS = [];

if (selectProductTypeForPurchased === "Round Neck" || selectProductTypeForPurchased === "Drop Sholder") {
   COLORS = ['black', 'white', 'maroon', 'green'];
} else if (selectProductTypeForPurchased === "Hoodie") {
   COLORS = ['black', 'gray', 'red', 'green'];
}

const SIZES = ['sizeS', 'sizeM', 'sizeL', 'sizeXL', 'sizeXXL'];

// Select data filter based on the product type
const selectDataFilter = (type) => {
  if (type === "Round Neck") {
    return roundNeckFilter;
  } else if (type === "Hoodie") {
    return hoodiesFilter;
  } else if (type === "Drop Sholder") {
    return dropSholderFilter;
  }
  return [];
}
const selectDataDamagedFilter = (type) => {
  if (type === "Round Neck") {
    return roundNeckDamageFilter;
  } else if (type === "Hoodie") {
    return hoodiesDamageFilter;
  } else if (type === "Drop Sholder") {
    return dropSholderDamageFilter;
  }
  return [];
}

const dataFilter = selectDataFilter(selectProductTypeForPurchased);
const damageDataFilter = selectDataDamagedFilter(selectProductTypeForDamaged);

const totals = {};
let totalQuantityNow=0
COLORS.forEach(color => {
  totals[color] = {};
  SIZES.forEach(size => {
    const totalCount = calculateTotalForColorAndSize(dataFilter, color, size);
    const DamageCount = calculateTotalForColorAndSize(damageDataFilter, color, size);
    const inProductionCount = sizeCountsForInProduction[color] && sizeCountsForInProduction[color][size]
      ? sizeCountsForInProduction[color][size]
      : 0;
    
    totals[color][size] = totalCount - (inProductionCount+DamageCount );
    totalQuantityNow+= totals[color][size]
  });
});

// const totalTshirtInventory=whiteM+
// whiteL+
// whiteXL+
// whiteXXL+
// blackM+
// bvlackL+
// blackXL+
// blackXXL;

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

const onDelete = (index, filterArray) => {
  if (window.confirm('Do you want to delete this item?')) {
      // Remove the item from the filterArray based on the index
      filterArray.splice(index, 1);

      // Update the state (assuming you have a state management setup for roundNeckFilter, hoodiesFilter, etc.)
      // For example, if you're using React's useState:
      // setRoundNeckFilter([...roundNeckFilter]);  // if deleting from roundNeckFilter
      // Modify as needed for other filters.
  }
}

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
                    <h4>Inventory<span style={{float: 'right'}}>{totalQuantityNow} PCS</span></h4>
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
    {COLORS.map(color => (
      <tr key={color} className="info">
        <td>{color}</td>
        {SIZES.map(size => (
          <td key={size}>{totals[color][size]}</td>
        ))}
      </tr>
    ))}
  </tbody>
</table>

                  </div>
                </div>
              </div>
               <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                 <div className='row'>
             <div className="col-md-">
             <TShirtCardPAC/>
             </div>
             </div>
              </div>
             
            </div>
            <div className="row input-bar-01">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <div className="lobipanel">
                  <div className="panel-title">
                    <h4>Damaged<span style={{float: 'right'}}>{totalDamaged} PCS</span></h4>
                    <select 
        id="productType-filterForPurchased" 
        value={selectProductTypeForDamaged} 
        className="form-control mr-5" 
        onChange={(e) => handleInputChangeDamaged(e)} 
        style={{ maxWidth: '150px' }}  // Adjust the width value accordingly
    >
        <option value="Round Neck">Round Neck</option>
        <option value="Drop Sholder">Drop Sholder</option>
        <option value="Hoodie">Hoodie</option>
    </select>
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
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                    
                          {
                            selectProductTypeForDamaged==="Round Neck" &&
                            roundNeckDamageFilter?.slice(0,4)?.map(damaged=>
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
                              {/* <td >
                            <button onClick={()=> handleDeletePopUp(damaged?._id)} style={{borderRadius:"5px", border: 'none', color: 'white',backgroundColor:"none"}}><img style={{width:"20px"}} src="/images/delete.png" alt='delete'/></button>
                            <DeleteRoleAlert isOpen={ damageDeletepopUp} deleteId={clickedId} onClose={handleDeleteModalClose} onConfirm={()=>handleDamageDeleteItem(clickedId)} />

              
                        </td> */}
                                   
                        </tr>
                              )
                            
                          } {
                            selectProductTypeForDamaged==="Drop Sholder" &&
                            dropSholderDamageFilter?.slice(0,4)?.map(damaged=>
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
                              {/* <td >
                            <button onClick={()=> handleDeletePopUp(damaged?._id)} style={{borderRadius:"5px", border: 'none', color: 'white',backgroundColor:"none"}}><img style={{width:"20px"}} src="/images/delete.png" alt='delete'/></button>
                            <DeleteRoleAlert isOpen={ damageDeletepopUp} deleteId={clickedId} onClose={handleDeleteModalClose} onConfirm={()=>handleDamageDeleteItem(clickedId)} />

              
                        </td>   */}
                        </tr>
                              )
                            
                          } {
                            selectProductTypeForDamaged==="Hoodie" &&
                            hoodiesDamageFilter?.slice(0,4)?.map(damaged=>
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
                              {/* <td >
                            <button onClick={()=> handleDeletePopUp(damaged?._id)} style={{borderRadius:"5px", border: 'none', color: 'white',background:"none"}}><img style={{width:"20px"}} src="/images/delete.png" alt='delete'/></button>
                            <DeleteRoleAlert isOpen={ damageDeletepopUp} deleteId={clickedId} onClose={handleDeleteModalClose} onConfirm={()=>handleDamageDeleteItem(clickedId)} />

              
                        </td> */}
                        {/* <td>
                            <button onClick={()=> handleUpdatePopUp(damaged?._id)} style={{borderRadius:"5px", border: 'none', color: 'white',backgroundColor:"none"}}><img style={{width:"20px"}} src="/images/edit.png" alt='delete'/></button>
                         </td>
                         {
                    updatepopUp === true &&
                    <UpdateAlert
                    fetchData={fetchData}
                    getPurchaseTshirtById={getPurchaseTshirtById}
                    setTshirtDetail={setTshirtDetail}
                    tShirtDetail={tShirtDetail}
                    updatepopUp={updatepopUp}
                    message="Item has been updated successfully."
                    onClose={() => setUpdatepopUp(false)}
                  
                    
                    
                    />

                  }    */}
                        </tr>
                              )
                            
                          }
                  
                      
                        
                      </tbody>
                    </table>
                  </div>
                  <div className="panel-button">
                    <button id="button" onClick={handleDamagePopUp}>Update  Damage</button>
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
                    <h4>Total Tee Shirt Purchased<span style={{float: 'right'}}>{totalPurchased} PCS</span></h4>
                    <select 
        id="productType-filterForPurchased" 
        value={selectProductTypeForPurchased} 
        className="form-control mr-5" 
        onChange={(e) => handleInputChangeTotalPurchased(e)} 
        style={{ maxWidth: '150px' }}  // Adjust the width value accordingly
    >
        <option value="Round Neck">Round Neck</option>
        <option value="Drop Sholder">Drop Sholder</option>
        <option value="Hoodie">Hoodie</option>
    </select>
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
                          <th>Action</th>
                         
                        </tr>
                      </thead>
                    
                      <tbody>
                        {
                          selectProductTypeForPurchased==="Round Neck" &&
                          roundNeckFilter?.slice(0,4)?.map((tshirt,index)=>{
                        console.log("tshirt",tshirt?._id);
                        return(<tr className="info">
                            <td>{tshirt?.date}</td>
                            <td>{tshirt?.tshirtColor}</td>
                            <td>{tshirt?.sizeS}</td>
                            <td>{tshirt?.sizeM}</td>
                            <td>{tshirt?.sizeL}</td>
                            <td>{tshirt?.sizeXL}</td>
                            <td>{tshirt?.sizeXXL}</td>
                            <td>{tshirt?.perpisCost} tk</td>
                            <td>{tshirt?.totalCost} tk</td>
                            <td>
                            <button onClick={()=>{console.log("Button clicked with id:", tshirt._id); handleDeletePopUp(tshirt?._id)}} style={{borderRadius:"5px", border: 'none', color: 'white',background:"none"}}><img style={{width:"20px"}} src="/images/delete.png" alt='delete'/></button>
                            <DeleteRoleAlert isOpen={ deletepopUp} deleteId={clickedId} onClose={handleDeleteModalClose} onConfirm={()=>handleDeleteItem(clickedId)} />
                          <button onClick={()=> handleUpdatePopUp(tshirt?._id)} style={{borderRadius:"5px", border: 'none', color: 'white',background:"none",marginLeft:"5px"}}><img style={{width:"20px"}} src="/images/edit.png" alt='delete'/></button>
              
                        </td>              
  
                         {
                    updatepopUp === true &&
                    <UpdateAlert
                    fetchData={fetchData}
                    getPurchaseTshirtById={getPurchaseTshirtById}
                    setTshirtDetail={setTshirtDetail}
                    tShirtDetail={tShirtDetail}
                    updatepopUp={updatepopUp}
                    message="Item has been updated successfully."
                    onClose={() => setUpdatepopUp(false)}
                  
                    
                    
                    />

                  }
                          </tr>
                          
                          )}  )
                        }  
                          {
                          selectProductTypeForPurchased==="Hoodie" &&
                          hoodiesFilter?.slice(0,4)?.map(tshirt=>
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
                            <td >
                            <button onClick={()=>{console.log("Button clicked with id:", tshirt._id); handleDeletePopUp(tshirt?._id)}} style={{borderRadius:"5px", border: 'none', color: 'white',backgroundColor:"none"}}><img style={{width:"20px"}} src="/images/delete.png" alt='delete'/></button>
                            <DeleteRoleAlert isOpen={ deletepopUp} deleteId={clickedId} onClose={handleDeleteModalClose} onConfirm={()=>handleDeleteItem(clickedId)} />

              
                        </td>
                        <td>
                            <button onClick={()=> handleUpdatePopUp(tshirt?._id)} style={{borderRadius:"5px", border: 'none', color: 'white',backgroundColor:"none"}}><img style={{width:"20px"}} src="/images/edit.png" alt='delete'/></button>
                         </td>
                         {
                    updatepopUp === true &&
                    <UpdateAlert
                    fetchData={fetchData}
                    getPurchaseTshirtById={getPurchaseTshirtById}
                    setTshirtDetail={setTshirtDetail}
                    tShirtDetail={tShirtDetail}
                    updatepopUp={updatepopUp}
                    message="Item has been updated successfully."
                    onClose={() => setUpdatepopUp(false)}
                  
                    
                    
                    />

                  }
                          </tr>
                            )
                        }
                         {
                          selectProductTypeForPurchased==="Drop Sholder" &&
                          dropSholderFilter?.slice(0,4)?.map(tshirt=>
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
                            <td >
                            <button onClick={()=>{console.log("Button clicked with id:", tshirt._id); handleDeletePopUp(tshirt?._id)}} style={{borderRadius:"5px", border: 'none', color: 'white',backgroundColor:"none"}}><img style={{width:"20px"}} src="/images/delete.png" alt='delete'/></button>
                            <DeleteRoleAlert isOpen={ deletepopUp} deleteId={clickedId} onClose={handleDeleteModalClose} onConfirm={()=>handleDeleteItem(clickedId)} />

              
                        </td>
                        <td>
                            <button onClick={()=> handleUpdatePopUp(tshirt?._id)} style={{borderRadius:"5px", border: 'none', color: 'white',backgroundColor:"none"}}><img style={{width:"20px"}} src="/images/edit.png" alt='delete'/></button>
                         </td>
                         {
                    updatepopUp === true &&
                    <UpdateAlert
                    fetchData={fetchData}
                    getPurchaseTshirtById={getPurchaseTshirtById}
                    setTshirtDetail={setTshirtDetail}
                    tShirtDetail={tShirtDetail}
                    updatepopUp={updatepopUp}
                    message="Item has been updated successfully."
                    onClose={() => setUpdatepopUp(false)}
                  
                    
                    
                    />

                  }
                          </tr>
                            )
                        }
                       

                       </tbody>
                    </table>
                  </div>
                  <div className="panel-button">
                    <button id="button" onClick={handleAddDeliveryPopUp}>Update</button>
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

