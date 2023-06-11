import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllMerchants = () => {
  const [allMerchant,setAllMerchant]=useState([])
  const [filterUser,setFilterUsers]=useState('all')
  const [filterEmail,setFilterEmail]=useState('')

  useEffect(()=>{
    const getOrders = async () => {
     await fetch('https://mserver.printbaz.com/alluser') //for main site
    //  await fetch('http://localhost:5000/alluser') //for testing site
    .then(res=>res.json())
    .then(data => setAllMerchant(data))
    }
    getOrders()
},[allMerchant])
const handleInputChange = (event, index) => {
  const { name, value } = event.target;
  setFilterUsers(value)
}
const handleEmailChange = (e) => {
  const value = e.target.value;
  console.log(value);
  setFilterEmail(value);
}

console.log("filterEmail",filterEmail);
let pendingUsers=allMerchant?.filter(users=>users?.approval==="request");
let approvedUsers=allMerchant?.filter(users=>users?.approval==="approved");
let bannedUsers=allMerchant?.filter(users=>users?.approval==="ban");
let searchByEmail = allMerchant?.filter(userEmail => userEmail?.email.includes(filterEmail));

let SingleEmailOneTime = allMerchant.reduce((acc, current) => {
  const x = acc.find(item => item.email === current.email);
  if (!x) {
      return acc.concat([current]);
  } else {
      return acc;
  }
}, []);
let formattedDate;
allMerchant?.map(merchant=>{
  let date = new Date(merchant?.createdAt); 
  let options = { year: 'numeric', month: 'long', day: 'numeric' }; 

 formattedDate = date.toLocaleDateString('en-US', options); 
  return(formattedDate)

})
console.log("formattedDate",formattedDate);
console.log("SingleEmailOneTime",SingleEmailOneTime);

const handleContactChange=(e)=>{
  const value = e.target.value;
  console.log(value);
  setFilterUsers(value);
}
let searchByPhoneNumber= allMerchant?.filter(Phone => Phone?.phone?.includes(filterUser));
    return (
        <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
        <title>Admin Dashboard</title>
        <style dangerouslySetInnerHTML={{__html: "\n        /* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n        .all-client {\n            margin: 50px;\n            padding: 20px;\n        }\n\n        h2,\n        h4 {\n            color: #333;\n            padding-bottom: 10px;\n            font-weight: 700;\n            text-transform: uppercase;\n        }\n\n        .row {\n            display: flex;\n            flex-wrap: wrap;\n            margin: 0 -15px;\n        }\n\n        .col-3,\n        .col-12 {\n            padding: 0 15px;\n            width: 100%;\n        }\n\n        .col-3 {\n            flex: 0 0 25%;\n            max-width: 25%;\n        }\n\n        .client-filter,\n        .client-list-title,\n        .client-list {\n            background: #fff;\n            margin-bottom: 2px;\n            padding: 15px;\n            border-radius: 5px;\n        }\n\n        .client-list {\n            cursor: pointer;\n        }\n\n        .client-list-title h4 {\n            text-transform: uppercase;\n            font-weight: bold;\n        }\n\n        .client-list p {\n            margin-bottom: 10px;\n            color: #000;\n        }\n\n        .client-list:hover {\n            background-color: aliceblue;\n            transition: linear 0.2s;\n        }\n\n        .status-btn {\n            display: inline-block;\n            padding: 5px 10px;\n            border-radius: 5px;\n            background-color: #4caf50;\n            color: #fff !important;\n            font-weight: bold;\n        }\n\n        .form-control {\n            display: block;\n            width: 100%;\n            padding: 5px;\n            margin-bottom: 10px;\n            border: 1px solid #ccc;\n            border-radius: 5px;\n            font-size: 14px;\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 1024px) {\n            .col-3 {\n                flex: 0 0 50%;\n                max-width: 50%;\n            }\n        }\n\n        @media screen and (max-width: 768px) {\n            .col-3 {\n                flex: 0 0 100%;\n                max-width: 100%;\n            }\n\n            .nav-link {\n                text-align: left;\n            }\n\n            .nav-link:hover {\n                width: 100%;\n\n            }\n\n            .all-client {\n                margin: 10px;\n            }\n\n        }\n\n    " }} />
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
          <Link className="navbar-brand" to="/">
              <img src="https://media.discordapp.net/attachments/1069579536842379305/1097040318043537449/Logo-02.png?width=1440&height=392" alt="" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Dashboard</Link>

                </li> 
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/allMerchants">Merchants</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/orderList">Orders</Link>
                </li>
              
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Analytics
                  </a>
                  <ul className="dropdown-menu nav-dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item nav-dropdown-item" href="#">Merchants</a></li>
                    <li><a className="dropdown-item nav-dropdown-item" href="#">Order</a></li>
                    <li><a className="dropdown-item nav-dropdown-item" href="#">Transaction</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/mailBox">Mail Box</Link>
                </li>
                <li className="nav-item">
              
                  <Link className="nav-link active" aria-current="page" to="/liveChat">Live Chat</Link>
               
                </li>
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/ticket">Ticket</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/filemanager">File Manager</Link>
          
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="all-client">
          <div className="row">
            <div className="col-12">
              <h2>All Merchants</h2>
            </div>
          </div>
          <div className="row client-filter">
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="id-filter">Contact number:</label>
              <input type="text" id="id-filter" className="form-control"  onChange={(e) =>  handleContactChange(e)} />
            </div>
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="name-filter">Name:</label>
              <input type="text" id="name-filter" className="form-control" />
            </div>
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="brand-filter">Brand Name:</label>
              <input type="text" id="brand-filter" className="form-control" />
            </div>
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="email-filter">Email:</label>
              <input type="email" id="email-filter" className="form-control"  onChange={(e) =>  handleEmailChange(e)}/>
            </div>
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="date-filter">Date:</label>
              <input type="date" id="date-filter" className="form-control" />
            </div>
            <div className="col-lg-2 col-sm-12">
              <label htmlFor="status-filter">Status:</label>
              <select id="status-filter" className="form-control"   onChange={(e) =>  handleInputChange(e)}>
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="ban">Ban</option>
              </select>
            </div>
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
          filterUser &&  searchByPhoneNumber?.map((merchants)=><>
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
          </Link>
            </>)
          }
          {
          filterEmail &&  searchByEmail?.map((merchants)=><>
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
          </Link>
            </>)
          }
        
          {
            filterUser==="pending" &&  pendingUsers.map(merchants=><>
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
                  merchants?.approval==="request" &&   <p className="status-btn" style={{backgroundColor:"#ff6f00",color:"black !important"}} >{merchants?.approval}</p>
                }
             
              
              </div>
            </div>
          </Link>
            
            </>) 
          }
              {
            filterUser==="approved" &&  approvedUsers.map(merchants=><>
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
                  merchants?.approval==="approved" &&   <p className="status-btn"  >{merchants?.approval}</p>
                } 
               
              
              </div>
            </div>
          </Link>
            
            </>) 
          }  
            {
            filterUser==="ban" &&  bannedUsers.map(merchants=><>
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
                  merchants?.approval==="ban" &&   <p className="status-btn" style={{backgroundColor:"red"}}  >{merchants?.approval}</p>
                }
              
              </div>
            </div>
          </Link>
            
            </>) 
          }
          {
           filterUser==="all" && SingleEmailOneTime?.map((merchants)=><>
              
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
                  merchants?.approval==="request" &&   <p className="status-btn" style={{backgroundColor:"#ff6f00"}} >{merchants?.approval}</p>
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
            </>)
          }
        
          
         
        </div>
      </div>
    );
};

export default AllMerchants;

