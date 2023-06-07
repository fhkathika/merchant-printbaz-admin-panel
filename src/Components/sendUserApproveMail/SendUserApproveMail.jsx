

import axios from 'axios';

const SendUserApproveMail = (approvalMail) => {
  axios.post('https://mserver.printbaz.com/userApprovalMail', approvalMail )
    .then((response) => {
      console.log("send approval mail",response);
    })
    .catch((error) => {
      console.error(error);
    });
};
export default SendUserApproveMail