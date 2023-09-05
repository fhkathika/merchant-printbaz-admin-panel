import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useRoleAsignData } from '../../hooks/useRoleAsignData';
import Navigationbar from '../navigationBar/Navigationbar';
import DatePicker from 'react-datepicker';
import queryString from 'query-string';
const AllMerchants = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allMerchant,setAllMerchant]=useState([])

  const [filterUser, setFilterUser] = useState('all');
  const [filterEmail, setFilterEmail] = useState('');
  const [filterContact, setFilterContact] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [filterBrand, setFilterBrand] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30); 
  const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const {value_count}=useRoleAsignData()
let count=0


  useEffect(()=>{
    const getOrders = async () => {
     await fetch('https://mserver.printbaz.com/alluser') //for main site
    //  await fetch('http://localhost:5000/alluser') //for testing site
    .then(res=>res.json())
    .then(data => setAllMerchant(data))
    }
    getOrders()
},[allMerchant])
const handleInputChange = (event) => {
  const { id, value } = event.target;
  switch (id) {
    case 'status-filter':
      setFilterUser(value);
      break;
    case 'email-filter':
      setFilterEmail(value);
      break;
    case 'id-filter':
      setFilterContact(value);
      break;
      case 'name-filter':
  setFilterName(value);
  break; 
   case 'brand-filter':
  setFilterBrand(value);
  break;
    // ...other cases
    default:
      break;
  }
};

const handleChangeStartDate = (date) => {
  setStartDate(date);
};

const handleChangeEndDate = (date) => {
  setEndDate(date);
};
let SingleEmailOneTime = allMerchant.reduce((acc, current) => {
  const x = acc.find(item => item.email === current.email);
  if (!x) {
      return acc.concat([current]);
  } else {
      return acc;
  }
}, []);
const getFilteredUsers = () => {
  return SingleEmailOneTime.filter(user => {
    if (filterUser !== 'all' && user.approval !== filterUser) return false;
    if (filterEmail && user.email.indexOf(filterEmail) === -1) return false;
    if (filterContact && user.phone.indexOf(filterContact) === -1) return false;
    if (filterName && user.name.indexOf(filterName) === -1) return false;
    if (filterBrand && user.brandName.indexOf(filterBrand) === -1) return false;

    const userDate = new Date(user.createdAt);
    const userSimpleDate = `${userDate.getFullYear()}-${userDate.getMonth() + 1}-${userDate.getDate()}`;

    if (startDate && endDate) {
      // Both start and end dates are selected
      if (userDate >= startDate && userDate <= endDate) {
        // Date is within the range
      } else {
        // Date is outside the range
        return false;
      }
    }  else if (startDate) {
      // Only start date is selected
      if (userDate.toDateString() !== startDate.toDateString()) return false;
    } else if (endDate) {
      // Only end date is selected
      if (userDate.toDateString() !== endDate.toDateString()) return false;
    }


    return true;
  });
};

const filteredUsers = getFilteredUsers();
console.log("filteredUsers.length",filteredUsers.length);
const actualIndexOfLastItem = indexOfLastItem > SingleEmailOneTime.length ? SingleEmailOneTime.length : indexOfLastItem;
let formattedDate;
allMerchant?.map(merchant=>{
  let date = new Date(merchant?.createdAt); 
  let options = { year: 'numeric', month: 'long', day: 'numeric' }; 

 formattedDate = date.toLocaleDateString('en-US', options); 
  return(formattedDate)

})

return (
        <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
        <title>Admin Dashboard</title>
        <style dangerouslySetInnerHTML={{__html: "\n        /* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n        .all-client {\n            margin: 50px;\n            padding: 20px;\n        }\n\n        h2,\n        h4 {\n            color: #333;\n            padding-bottom: 10px;\n            font-weight: 700;\n            text-transform: uppercase;\n        }\n\n        .row {\n            display: flex;\n            flex-wrap: wrap;\n            margin: 0 -15px;\n        }\n\n        .col-3,\n        .col-12 {\n            padding: 0 15px;\n            width: 100%;\n        }\n\n        .col-3 {\n            flex: 0 0 25%;\n            max-width: 25%;\n        }\n\n        .client-filter,\n        .client-list-title,\n        .client-list {\n            background: #fff;\n            margin-bottom: 2px;\n            padding: 15px;\n            border-radius: 5px;\n        }\n\n        .client-list {\n            cursor: pointer;\n        }\n\n        .client-list-title h4 {\n            text-transform: uppercase;\n            font-weight: bold;\n        }\n\n        .client-list p {\n            margin-bottom: 10px;\n            color: #000;\n        }\n\n        .client-list:hover {\n            background-color: aliceblue;\n            transition: linear 0.2s;\n        }\n\n        .status-btn {\n            display: inline-block;\n            padding: 5px 10px;\n            border-radius: 5px;\n            background-color: #4caf50;\n            color: #fff !important;\n            font-weight: bold;\n        }\n\n        .form-control {\n            display: block;\n            width: 100%;\n            padding: 5px;\n            margin-bottom: 10px;\n            border: 1px solid #ccc;\n            border-radius: 5px;\n            font-size: 14px;\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 1024px) {\n            .col-3 {\n                flex: 0 0 50%;\n                max-width: 50%;\n            }\n        }\n\n        @media screen and (max-width: 768px) {\n            .col-3 {\n                flex: 0 0 100%;\n                max-width: 100%;\n            }\n\n            .nav-link {\n                text-align: left;\n            }\n\n            .nav-link:hover {\n                width: 100%;\n\n            }\n\n            .all-client {\n                margin: 10px;\n            }\n\n        }\n\n    " }} />
        <Navigationbar/>
        <div className="all-client">
          <div className="row">
            <div className="col-12">
              <h2>All Merchants</h2>
            </div>
          </div>
          <div className="row client-filter">
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="id-filter">Contact number:</label>
              <input type="text" id="id-filter" className="form-control"  onChange={(e) =>  handleInputChange(e)} />
            </div>
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="name-filter">Name:</label>
              <input type="text" id="name-filter" className="form-control" onChange={e => handleInputChange(e)} />

            </div>
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="brand-filter">Brand Name:</label>
              <input type="text" id="brand-filter" className="form-control" onChange={(e) =>  handleInputChange(e)} />
            </div>
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="email-filter">Email:</label>
              <input type="email" id="email-filter" className="form-control"  onChange={(e) =>  handleInputChange(e)}/>
            </div>
            <div className="col-lg-1 col-sm-12">
              <label htmlFor="date-filter" >Start Date:</label>
              <div>
              <DatePicker className='form-control' selected={startDate} onChange={handleChangeStartDate} selectsStart startDate={startDate} endDate={endDate} />
              </div>
             
            </div>
            <div className="col-lg-1 col-sm-12">
               <label  htmlFor="endDate" >End Date</label>
               <div>
               <DatePicker className='form-control' selected={endDate} onChange={handleChangeEndDate} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} />
               </div>
               
               </div>
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="status-filter">Status:</label>
              <select id="status-filter" className="form-control"   onChange={(e) =>  handleInputChange(e)}>
                <option value="all">All</option>
                <option value="request">Pending</option>
                <option value="approved">Approved</option>
                <option value="ban">Ban</option>
              </select>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
          <span style={{marginRight:"20px"}}>{indexOfFirstItem + 1} - {actualIndexOfLastItem < 30 ? (filteredUsers?.length ): actualIndexOfLastItem} of {filteredUsers.length}</span>
    <button style={{marginRight:"20px",border:"none"}} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} ><img style={{height:"10px",width:"15px"}} src='images/left-arrow.png' alt="left arrow"/></button>
    <button style={{height:"40px",border:"none"}} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(SingleEmailOneTime.length / itemsPerPage)}><img style={{height:"10px",width:"15px"}} src='images/right-arrow.png' alt="right arrow"/></button>
   
          </div>
          <div className="row client-list-title">
            <div className="col-lg-2 col-sm-12">
              <h4>Conatct Number</h4>
            </div>
            <div className="col-lg-2 col-sm-12">
              <h4>Name</h4>
            </div>
            <div className="col-lg-2 col-sm-12">
              <h4>Brand Name</h4>
            </div>
            <div className="col-lg-2 col-sm-12">
              <h4>Email</h4>
            </div>
            <div className="col-lg-2 col-sm-12">
              <h4>Date</h4>
            </div>
            <div className="col-lg-2 col-sm-12">
              <h4>Status</h4>
            </div>
          </div>
         
         

          {
          filteredUsers?.slice(indexOfFirstItem, indexOfLastItem).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))?.map((merchants)=><>
           {/* <Link  key={merchants?._id} to={`/viewTicket/${merchants?._id}`} state={{merchants}}></Link> */}
          
            {
              value_count?.MerchantView ?
              <Link key={merchants?._id} to={`/viewClient/${merchants?._id}`} state={{merchants}}>
              <div className="row client-list">
                <div className="col-lg-2 col-sm-12">
                  <p>{merchants?.phone}</p>
                </div>
                <div className="col-lg-2 col-sm-12">
                  <p>{merchants?.name}</p>
                </div>
                <div className="col-lg-2 col-sm-12">
                  <p>{merchants?.brandName}</p>
                </div>
                <div className="col-lg-2 col-sm-12">
                  <p>{merchants?.email}</p>
                </div>
                <div className="col-lg-2 col-sm-12">
                  <p>{merchants?.createdAt?.slice(0,10)}</p>
                </div>
                <div className="col-lg-2 col-sm-12">
                  {
                    merchants?.approval==="request" &&   <p className="status-btn" style={{backgroundColor:"red"}} >{merchants?.approval}</p>
                  }
                   {
                    merchants?.approval==="approved" &&   <p className="status-btn"  >{merchants?.approval}</p>
                  } 
                   {
                    merchants?.approval==="ban" &&   <p className="status-btn" style={{backgroundColor:"blue"}}  >{merchants?.approval}</p>
                  }
                
                </div>
              </div>
            </Link>
            :
            <div className="row client-list">
            <div className="col-lg-2 col-sm-12">
              <p>{merchants?.phone}</p>
            </div>
            <div className="col-lg-2 col-sm-12">
              <p>{merchants?.name}</p>
            </div>
            <div className="col-lg-2 col-sm-12">
              <p>{merchants?.brandName}</p>
            </div>
            <div className="col-lg-2 col-sm-12">
              <p>{merchants?.email}</p>
            </div>
            <div className="col-lg-2 col-sm-12">
              <p>{merchants?.createdAt?.slice(0,10)}</p>
            </div>
            <div className="col-lg-2 col-sm-12">
              {
                merchants?.approval==="requiest" &&   <p className="status-btn" style={{backgroundColor:"red"}} >{merchants?.approval}</p>
              }
               {
                merchants?.approval==="approved" &&   <p className="status-btn"  >{merchants?.approval}</p>
              } 
               {
                merchants?.approval==="ban" &&   <p className="status-btn" style={{backgroundColor:"blue"}}  >{merchants?.approval}</p>
              }
            
            </div>
          </div>
            }
        
            </>)
          }
       
        
         
          
         
        </div>
      </div>
    );
};

export default AllMerchants;

