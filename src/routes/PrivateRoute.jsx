import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../authProvider/AuthProvider';



const PrivateRoute = ({children}) => {
    const {adminUser,loading,loginAdminUser,currentUser}=useContext(AuthContext);
    const location=useLocation()
    if(loading){
        return <Spinner animation="border" variant="primary"/>
    }
 if(!adminUser){
    return <Navigate to="/login" state={{from:location}} replace></Navigate> 
 }
 return children;
};

export default PrivateRoute;