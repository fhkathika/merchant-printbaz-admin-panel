
import axios from 'axios';

const SendTicketCopy = (ticketCopy) => {
  // axios.post('https://mserver.printbaz.com/sendTicketCopy', ticketCopy )
  axios.post('http://localhost:5000/sendTicketCopy', ticketCopy )
    .then((response) => {
      console.log("send ticket mail",response);
    })
    .catch((error) => {
      console.error(error);
    });
};
export default SendTicketCopy
