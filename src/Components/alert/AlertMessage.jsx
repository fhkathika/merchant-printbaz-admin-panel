
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const AlertMessage=({message,showAlert,setShowAlert})=> {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false);
    }, 4000); // Hide the alert box after 1 seconds

    return () => clearTimeout(timeoutId);
  }, []);

  if (showAlert) {
    return (
      <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading style={{textAlign:"center"}}>{message}</Alert.Heading>
     
      </Alert>
    );
  }
  return 
}

export default AlertMessage;