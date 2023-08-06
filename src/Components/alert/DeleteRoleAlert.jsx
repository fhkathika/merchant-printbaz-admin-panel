


import React from "react";
import { Button } from "react-bootstrap";

const DeleteRoleAlert = ({ isOpen, onClose, onConfirm,deleteId }) => {
  if (!isOpen) return null;

  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <p className="" style={{color:"orange",fontSize:"20px"}}>Are you sure you want to create the role?</p>
       
        <div style={{display:"flex",justifyContent:"center"}} className="mt-3">
        <Button variant="success" onClick={()=>{onConfirm(deleteId);onClose()}}>Yes</Button>
        <Button variant="warning" onClick={onClose} style={{marginLeft:"20px"}}>Cancel</Button>
        </div>
       
        
      </div>
    </div>
  );
};

export default DeleteRoleAlert;