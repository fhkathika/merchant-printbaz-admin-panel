


import React from "react";
import { Button } from "react-bootstrap";

const DeleteRoleAlert = ({ isOpen, onClose, onConfirm,deleteId }) => {
  if (!isOpen) return null;
console.log("deleteId",deleteId);
  return (
    <div className="delete_overLay">
      <div className="delete-alert-box">
        <div>
        <p className="" style={{color:"orange",fontSize:"20px"}}>Are you sure you want to delete?</p>
       
       <div style={{display:"flex",justifyContent:"center"}} className="mt-3">
       <Button variant="success" onClick={()=>{onConfirm(deleteId);onClose()}}>Yes</Button>
       <Button variant="warning" onClick={onClose} style={{marginLeft:"20px"}}>Cancel</Button>
       </div>
        </div>
       
       
        
      </div>
    </div>
  );
};

export default DeleteRoleAlert;