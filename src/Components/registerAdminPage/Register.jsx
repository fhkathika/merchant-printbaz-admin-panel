import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import AlertMessage from "../alert/AlertMessage";
import OrderUpdateAlert from "../alert/OrderUpdateAlert";
import { useNavigate } from "react-router-dom";

const Register = ({ token }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showLoginButton, setShowLoginButton] = useState(false);

    const [passwordError, setPasswordError] = useState('');
    const [formData, setFormData] = useState({
        name: "",
        phone:"",
        address:"",
        profession:"",
        email:"",
        password:"",
        token:token
      
    
      });
      const navigate=useNavigate()
  // validate password

const validatePassword = (password) => {
    // reset error message before each validation
    
  
    // check for minimum length
    if (password.length < 8) {
        setPasswordError('Password must be at least 8 characters.');
        return false;
    }
  
    // check for maximum length
    if (password.length > 100) {
        setPasswordError('Password must be less than 100 characters.');
        return false;
    }
  
    // check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        setPasswordError('Password must contain at least one uppercase letter.');
        return false;
    }
  
    // check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        setPasswordError('Password must contain at least one lowercase letter.');
        return false;
    }
  
    // check for at least one number
    if (!/[0-9]/.test(password)) {
        setPasswordError('Password must contain at least one number.');
        return false;
    }
  
    // check for at least one special character
    if (!/[!@#$%^&*]/.test(password)) {
        setPasswordError('Password must contain at least one special character: ! @ # $ % ^ & *');
        return false;
    }
  
    // password is valid
    setPasswordError("")
    return true;
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

    const handleChange=(e)=>{
        const { name, value } = e.target;
      
        // validate password if the changed field is 'password'
        if (name === 'password') {
          validatePassword(value);
        }
      
        setFormData({ ...formData, [name]: value });
      }
      const goToLogin=(e)=>{
          e.preventDefault()
   navigate('/login')
      }
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // POST request to your server
            // const response = await axios.post('http://localhost:5000/registerForAdminPanel', formData);
            const response = await axios.post('https://mserver.printbaz.com/registerForAdminPanel', formData);
    
            if (response.status !== 200) {
                throw new Error('HTTP error ' + response.status);
            }
            
            const responseData = response.data;
            setShowAlert(true)
            setShowLoginButton(true)
     
            console.log("responseData", responseData);
        } catch (error) {
           console.error("error", error);
        }
    };
    
console.log("formData",formData);
    return (


        <Container className='sbcalc  lg xs md mt-4'>
        <h3 style={{textAlign:"center"}}>Registration </h3>
        <Row>
            <Col sm className="m-auto">
            <Form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group">
                        <h3>Basic Information</h3>
                      </div>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label style={{textAlign:"left"}}>Email <span style={{color:"red"}}>*</span></Form.Label>
      <Form.Control
        type="email"
        name="email"
        value={formData?.email}
        placeholder="enter address"
        required
        onChange={(e) => handleChange(e)}
      />
    </Form.Group> 
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label style={{textAlign:"left"}}>Password <span style={{color:"red"}}>*</span></Form.Label>
    <div style={{display:"flex"}}>
      <Form.Control
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={formData?.password}
        placeholder="password"
        required
        onChange={(e) => handleChange(e)}
        isInvalid={!!passwordError}
      />
  
      <Button
        variant="outline-secondary"
        className="password-toggle-button"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? "show" : "hide"}
      </Button>
     
    </div>
    <Form.Control.Feedback type="invalid">
      {passwordError}
    </Form.Control.Feedback>
    <span>{passwordError}</span>
  </Form.Group>
  
    <div className="form-group">
                        <h3>Personal Information</h3>
                      </div>
            <Form.Group className="mb-3" controlId="formBasicName">
          
      <Form.Label style={{textAlign:"left"}}>Name <span style={{color:"red"}}>*</span></Form.Label>
      <Form.Control
        type="text"
        name="name"
        placeholder="Enter name"
        value={formData?.name}
        onChange={(e) => handleChange(e)}
        required
      />
    </Form.Group>

  
    <Form.Group className="mb-3" controlId="formBasicPhone">
    <Form.Label style={{textAlign:"left"}}>Phone Number <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control
      type="tel"
      pattern="[0-9]{11}"
      name="phone"
      value={formData?.phone}
      placeholder="Phone number"
      onChange={(e) => handleChange(e)}
      required
    />
    <Form.Text className="text-muted">
      Please enter a 11-digit phone number.
    </Form.Text>
  </Form.Group>
  
   
   
    <Form.Group className="mb-3" controlId="formBasicAddress">
      <Form.Label style={{textAlign:"left"}}>Profession <span style={{color:"red"}}>*</span></Form.Label>
      <Form.Control
        type="text"
        name="profession"
        value={formData.profession}
        placeholder="enter profession"
        onChange={(e) => handleChange(e)}
        required
      />
    </Form.Group>  
    <Form.Group className="mb-3" controlId="formBasicAddress">
      <Form.Label style={{textAlign:"left"}}>Address <span style={{color:"red"}}>*</span></Form.Label>
      <Form.Control
        type="text"
        name="address"
        value={formData.address}
        placeholder="enter address"
        onChange={(e) => handleChange(e)}
        required
      />
    </Form.Group>
  
  <Button type="submit" style={{backgroundColor:"#124",border:"none"}}>Submit</Button>
  {
      showLoginButton &&
      <Button onClick={goToLogin} type="submit" style={{backgroundColor:"#124",border:"none", marginLeft:"10px"}}>Log in</Button>
  }
 

        </Form>

        {
showAlert && <OrderUpdateAlert message="Registration Completed!"   onClose={() => setShowAlert(false)}/>
        }
            </Col>
        
  
        </Row>

  

    </Container>
        // <form onSubmit={handleSubmit}>
        //     <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        //     <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        //     <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        //     {/* Additional input fields as necessary... */}
        //     <button type="submit">Register</button>
        // </form>
    );
};
export default Register