import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  "../../css/style.css";
import Navigationbar from "../navigationBar/Navigationbar";

function SendInvitationPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [newRole, setNewRole] = useState("");  // New Role Input
  const [roles, setRoles] = useState();
console.log("roles",roles);
//format date 
const date=new Date()
const options={
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
}
const strDate = new Intl.DateTimeFormat('en-US', options).format(date);
useEffect(()=>{
  fetchAllRoles()
},[])
// Replace '/' with '.' and ',' with ''
let inviteCreatedAt = strDate.replace(/\//g, '.').replace(/,/g, '');
// Remove leading zero from date and month (if any)
inviteCreatedAt = inviteCreatedAt.replace(/\.0+/g, '.');
// Replace 'AM' with 'am' and 'PM' with 'pm'
inviteCreatedAt = inviteCreatedAt.replace('AM', 'am').replace('PM', 'pm');

// console.log(inviteCreatedAt);
const handleRoleChange=(event)=>{
  setRoles({...roles, [event.target.name]: event.target.checked });
}
const addNewRole = async (roleName) => {
  await setRoles(prevRoles => {
    const updatedRoles = {...prevRoles, [roleName]: false};
    sendRolesToServer(updatedRoles);
    return updatedRoles;
  });
  setNewRole(""); // Clear input after adding
}
const fetchAllRoles= async () => {
  try {
    const response = await axios.get("http://localhost:5000/getAllRole");
    // const response = await axios.get(`https://mserver.printbaz.com/getAllRole`);

    setRoles(response?.data);
 
  } catch (err) {
    console.error(err);
  }
}; 
const sendRolesToServer = async (roles) => {
  // Send updated roles to server-side
  const response = await fetch('http://localhost:5000/allroles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({roles:roles}) // roles state to be sent
  });

  if (!response.ok) {
    throw new Error('HTTP error ' + response.status);
  }

  const responseData = await response.json();
  // console.log("responseData",responseData);
}

  const sendInvitation = async (e) => {
    e.preventDefault();
    const chosenRoles = Object.keys(roles).filter(role => roles[role] === true);
    // console.log(chosenRoles); // logs the roles that were checked
    try {
      // const res = await axios.post("http://localhost:5000/sendInvitation", { email,roles:chosenRoles,inviteCreatedAt });
      const res = await axios.post("https://mserver.printbaz.com/sendInvitation", { email,roles:chosenRoles,inviteCreatedAt });
      setMessage(res.data.message);
      // console.log("res.data.message",res.data);
    } catch (error) {
      setMessage("Failed to send invitation.");
    }
  };

  return (
    <div>
         <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/PhononJs/1.5.1/css/components/icons.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" integrity="sha512-vKMx8UnXk60zUwyUnUPM3HbQo8QfmNx7+ltw8Pm5zLusl1XIfwcxo8DbWCqMGKaWeNxWA8yrx5v3SaVpMvR3CA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <title>Admin Dashboard</title>
        <style dangerouslySetInnerHTML={{__html: "\n        \n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nul,\nli,\na {\n    text-decoration: none;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    line-height: 1.6;\n    background-color: #f4f4f4;\n}\n\n/* Nav Bar CSS Start */\n\n.navbar {\n    background: #001846 !important;\n    padding: 0 20px 0 20px;\n}\n\n.navbar-brand img {\n    width: 120px;\n}\n\n.nav-link {\n    color: #ffffff !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 10px 0 10px;\n}\n\n.nav-link:hover {\n    background-color: #ffffff;\n    color: #001846 !important;\n    transition: linear 0.2s;\n}\n\n.nav-dropdown-menu {\n    background-color: #001846;\n}\n\n.nav-dropdown-item {\n    color: #ffffff;\n    text-transform: uppercase;\n}\n\n.navbar-toggler {\n    background-color: #ffffff !important;\n}\n\n/* Nav Bar CSS End */\n\n/* Media Queries */\n@media screen and (max-width: 1024px) {}\n\n@media screen and (max-width: 768px) {\n    .nav-link {\n        text-align: left;\n    }\n\n    .nav-link:hover {\n        width: 100%;\n\n    }\n\n}\n\n.dashboard-container {\n    margin: 50px;\n    display: block;\n    -webkit-transition: all .2s ease-in-out;\n    -moz-transition: all .2s ease-in-out;\n    -o-transition: all .2s ease-in-out;\n    transition: all .2s ease-in-out\n}\n\n.card {\n    border: 0;\n    box-shadow: 0 3px 10px rgba(62, 85, 120, .045);\n    margin-bottom: 25px;\n    border-radius: 4px\n}\n\n.card .card-body {\n    padding: 25px\n}\n\n.card .card-body .card-title {\n    font-size: 14px;\n    margin-bottom: 20px;\n    color: #000\n}\n\n.card-img-top {\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px\n}\n\n.card-header {\n    padding: 10px 15px;\n    margin-bottom: 0;\n    background-color: #f2f2f2;\n    border-bottom: 1px solid #e6e6e6;\n    border-top-left-radius: 4px !important;\n    border-top-right-radius: 4px !important\n}\n\n.card-header-pills {\n    margin-right: 0;\n    margin-left: 0\n}\n\n.card-header-tabs {\n    margin-right: 0;\n    margin-bottom: -10px;\n    margin-left: 0;\n    border-bottom: 0\n}\n\n.card-footer {\n    padding: 10px 15px;\n    background-color: #f2f2f2;\n    border-top: 1px solid #e6e6e6\n}\n\n.card.text-white .card-title {\n    color: #fff\n}\n\n.card.card-transparent {\n    background: 0 0 !important;\n    box-shadow: none\n}\n\n.client-list {\n    cursor: pointer;\n    padding-top: 20px;\n}\n\n.client-list-title h4 {\n    text-transform: uppercase;\n    font-weight: bold;\n}\n\n.client-list p {\n    margin-bottom: 10px;\n}\n\n.client-list:hover {\n    background-color: aliceblue;\n    border-radius: 15px;\n    transition: linear 0.2s;\n}\n\n\n.p-status-btn {\n    display: inline-block;\n    padding: 5px 10px;\n    border-radius: 5px;\n    background-color: #00aeff;\n    color: #fff;\n    font-weight: bold;\n    cursor: pointer;\n\n}\n\n\n.status-btn {\n    display: inline-block;\n    padding: 5px 10px;\n    border-radius: 5px;\n    background-color: #4caf50;\n    color: #fff;\n    font-weight: bold;\n    cursor: pointer;\n}\n    " }} />
        <Navigationbar/>
        <div className=" " style={{textAlign:"center",marginTop:"10%"}}>
             
               
        <form onSubmit={sendInvitation}>
            <input
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Enter email to invite"
                   required
            /> 
            <br />
 {/* <input
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="Add new role"
            />  */}
            <button type="button" onClick={()=>addNewRole(newRole)}>Add Role</button>
            <p>Assign role</p>
            {/* {roles.map(role => (
                <div key={role}>
                    <label>
                        <input 
                            type="checkbox" 
                            name={role}
                            checked={role?.roleName}
                            onChange={handleRoleChange}
                        />
                        {role}
                    </label>
                </div>
            ))} */}

            <button type="submit">Send Invitation</button>
        </form>
            </div>
   
      {message && <p>{message}</p>}
    </div>
  );
}

export default SendInvitationPage;
