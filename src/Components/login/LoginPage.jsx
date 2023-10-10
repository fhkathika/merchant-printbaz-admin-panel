import React, { useContext, useState } from "react";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authProvider/AuthProvider";
import Navigationbar from "../navigationBar/Navigationbar";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {adminUser,loading,loginAdminUser,currentUser}=useContext(AuthContext);
  // console.log("adminUser",adminUser);
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/loginFromAdminPanel", { email,password });
      // const res = await axios.post("https://mserver.printbaz.com/loginFromAdminPanel", {  email,password });
      // If login successful, store the user token in local storage
      if(res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
       // Store the token in local storage or context for authentication
       loginAdminUser(res?.data?.token, res?.data);
    // console.log('User logged in successfully', res.data);
      // Then redirect the user to the home page or dashboard
    } catch (error) {
      // handle error
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
          <title>Admin Dashboard</title>
          <style dangerouslySetInnerHTML={{__html: "\n        /* Nav Bar CSS Start */\n\n        .navbar {\n            background: #001846 !important;\n            padding: 0 20px 0 20px;\n        }\n\n        .navbar-brand img {\n            width: 120px;\n        }\n\n        .nav-link {\n            color: #ffffff !important;\n            font-size: 18px;\n            font-weight: 500;\n            text-align: center;\n            text-transform: uppercase;\n            padding: 20px 20px 20px 20px;\n            margin: 0 10px 0 10px;\n        }\n\n        .nav-link:hover {\n            background-color: #ffffff;\n            color: #001846 !important;\n            transition: linear 0.2s;\n        }\n\n        .nav-dropdown-menu {\n            background-color: #001846;\n        }\n\n        .nav-dropdown-item {\n            color: #ffffff;\n            text-transform: uppercase;\n        }\n\n        .navbar-toggler {\n            background-color: #ffffff !important;\n        }\n\n        /* Media Queries */\n        @media screen and (max-width: 1024px) {}\n\n        @media screen and (max-width: 768px) {\n            .nav-link {\n                text-align: left;\n            }\n\n            .nav-link:hover {\n                width: 100%;\n\n            }\n\n            .view-client {\n                padding: 30px;\n            }\n\n        }\n\n        /* Nav Bar CSS End */\n\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            background-color: #f4f4f4;\n        }\n\n        .all-content {\n            margin: 50px;\n        }\n\n        .all-title {\n            font-weight: 700;\n            margin-bottom: 30px;\n        }\n\n        .rec-title h5 {\n            margin-top: 40px;\n            font-weight: 600;\n        }\n\n        .rec-title p {\n            font-size: 18px;\n        }\n\n        .amu-title h3 {\n            margin-bottom: 15px !important;\n        }\n\n        .amu-title h6 {\n            display: inline-block;\n            width: 75%;\n            font-weight: 600;\n            margin: 0;\n            margin-top: 10px;\n        }\n\n        .amu-title p {\n            display: inline-block;\n            width: 20%;\n            margin: 0;\n        }\n\n        .trak-info h3 {\n            font-weight: 700;\n        }\n\n        .trak-status .col-3 {\n            text-align: center;\n        }\n\n        .trak-status p {\n            font-weight: 600;\n            margin-top: 10px;\n        }\n\n        .status-btn {\n            display: inline-block;\n            padding: 5px 10px;\n            border-radius: 5px;\n            background-color: #4caf50;\n            color: #fff;\n            font-weight: bold;\n            cursor: pointer;\n            border: none;\n        }\n\n        .view-client-title a {\n            font-weight: 700;\n            font-size: 30px;\n            text-decoration: none;\n            color: #000;\n        }\n\n        .order-details {\n            background-color: #fff;\n        }\n\n        .card {\n            border: 0;\n            margin-bottom: 5px;\n            border-radius: 4px\n        }\n\n        .card.card-transparent {\n            background: 0 0 !important;\n            box-shadow: none\n        }\n\n        .file-options {\n            position: absolute;\n            right: 0;\n            top: 0;\n            visibility: hidden;\n            opacity: 0;\n            -webkit-transition: all .2s ease-in-out;\n            -moz-transition: all .2s ease-in-out;\n            -o-transition: all .2s ease-in-out;\n            transition: all .2s ease-in-out;\n            z-index: 999;\n        }\n\n        .file:hover .file-options,\n        .folder:hover .file-options {\n            visibility: visible;\n            opacity: 1\n        }\n\n        .file-options>a {\n            margin: 15px 10px;\n            display: block;\n            color: #384c6d;\n            opacity: .6;\n            -webkit-transition: all .2s ease-in-out;\n            -moz-transition: all .2s ease-in-out;\n            -o-transition: all .2s ease-in-out;\n            transition: all .2s ease-in-out;\n        }\n\n        .file-options>a i {\n            font-size: 19px\n        }\n\n        .file-options>a:hover {\n            opacity: 1\n        }\n\n        .file-options>a::after {\n            display: none\n        }\n\n        .file .file-info p {\n            font-weight: 500;\n            margin-bottom: 0;\n        }\n\n        .file .file-info span.file-size {\n            color: rgba(0, 0, 0, .4)\n        }\n\n        .file .file-info span.file-date {\n            font-size: 12px;\n            color: rgba(0, 0, 0, .4);\n            margin-top: 10px;\n            display: block\n        }\n\n        .card-body {\n            flex: 1 1 auto;\n            padding: 0;\n        }\n\n        .order-list-title {\n            margin-bottom: 20px;\n        }\n\n        .order-list-title h4 {\n            font-size: 24px;\n            font-weight: 500;\n        }\n\n        .order-tab {\n            padding: 10px 0 10px 0;\n        }\n\n        .admin-dis-a {\n    color: #000000 !important;\n    font-size: 18px;\n    font-weight: 500;\n    text-align: center;\n    text-transform: uppercase;\n    padding: 20px 20px 20px 20px;\n    margin: 0 !important;\n}\n\n.admin-dis {\n    width: 100%;\n    margin: 0 auto;\n    padding: 20px;\n    box-sizing: border-box;\n    list-style-type: none;\n    padding: 0;\n}\n\n.admin-dis-tab {\n    margin-bottom: 20px;\n}\n\n.admin-dis-li {\n    display: inline-block;\n}\n\n.admin-dis-a {\n    padding: 10px 20px;\n    display: block;\n    text-decoration: none;\n    color: #000;\n}\n\n.admin-dis-a.active {\n    background-color: #f2f2f2;\n    color: #000;\n}\n\n.admin-dis-chat {\n    background-color: #fff;\n    padding: 20px;\n    border-radius: 4px;\n    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);\n}\n\n.admin-dis-chat form {\n    display: flex;\n    align-items: center;\n}\n\n.admin-dis-chat form input[type=\"text\"] {\n    flex: 1;\n    padding: 10px;\n    border: 1px solid #ddd;\n    border-radius: 4px;\n    margin-right: 10px;\n}\n\n.admin-dis-chat form button {\n    padding: 10px 20px;\n    background-color: #007BFF;\n    color: #fff;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n}\n\n.admin-dis-chat form button:hover {\n    background-color: #0056b3;\n}\n\n.dis-post {\n    display: flex;\n    flex-shrink: 0\n}\n\n.admin-dis-post {\n    margin-top: 20px;\n    background: #fff;\n    padding: 20px;\n}\n\n    " }} />
       {/* <Navigationbar/> */}
       <Container className="w-75 mx-auto">
      <h3 style={{ marginTop: "20px", textAlign: "center" }}>Login Form</h3>
      <Form onSubmit={loginUser}>
      
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
           type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
           type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Login
        </Button>
       <br />
        <Form.Text className="text-danger">
       {loading}
        </Form.Text> <Form.Text className="text-danger">
       {/* {error} */}
        </Form.Text>
      </Form>
   
     
    </Container>
    
    </div>
  );
}

export default LoginPage;
