
import { Button } from "react-bootstrap";

const ConfirmDelete = ({ isOpen, onClose, onConfirm,orderId }) => {
  if (!isOpen) return null;

  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <p className="" style={{color:"orange",fontSize:"20px"}}>Are you sure you want to delete?</p>
       
        <div style={{display:"flex",justifyContent:"center"}} className="mt-3">
        {/* <Button variant="success" onClick={()=>{onConfirm();onClose()}}>Yes</Button> */}
        <Button variant="success" onClick={()=>{onConfirm(orderId);onClose()}}>Yes</Button>
        <Button variant="warning" onClick={onClose} style={{marginLeft:"20px"}}>Cancel</Button>
        </div>
       
        
      </div>
    </div>
  );
};
export default ConfirmDelete;