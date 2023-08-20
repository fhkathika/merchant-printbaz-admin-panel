import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import "../../css/style.css"

const DeliveryListAddedAlert = ({ message, onClose,delSuccessAlert,setDelSuccessAlert }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
     
        setDelSuccessAlert(false);
        onClose();
    }, 2000); // Hide the alert box after 3 seconds

    return () => clearTimeout(timeoutId);
  }, [setDelSuccessAlert]);


  return (
    <>
      <div className="alert-overlay" onClick={setDelSuccessAlert} />
      <div className="alert-box">
        <img style={{width:"30px",height:"30px"}} src='/images/checked.png' alt='alert message'/>
        <h2>{message}</h2>
      </div>
    </>
  );
};

DeliveryListAddedAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeliveryListAddedAlert;
 