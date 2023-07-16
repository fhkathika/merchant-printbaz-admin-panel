
import axios from 'axios';

const SendOrderStatusMail = (stausMail) => {
  axios.post('https://mserver.printbaz.com/OrderConfirmEmail', stausMail )
  // axios.post('http://localhost:5000/OrderConfirmEmail', stausMail )
    .then((response) => {
      console.log("send order status mail",response);
    })
    .catch((error) => {
      console.error(error);
    });
};
export default SendOrderStatusMail