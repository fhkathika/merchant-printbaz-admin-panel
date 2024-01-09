
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import "../../css/style.css"

const MsgALert = ({ message, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 2000); // Hide the alert box after 3 seconds

    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <>
      <div className="alert-overlay" onClick={onClose} />
     <div className="alert-box">
       <div onClick={onClose} >
       {/* <img className='cancelImg'  src='/images/cancel.png' alt='cancel'/> */}
      
       </div>
     
       <div>
    {/* <img style={{with:"30px",height:"30px"}} src='/images/checked.png' alt='alert message'/> */}
    
    <h2>{message}</h2>
        <span></span>
        </div>
      </div>
    </>
  );
};

MsgALert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MsgALert;
