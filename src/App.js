import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/dashboard/Dashboard';
import AllMerchants from './Components/allMerchants/AllMerchants';
import OrderList from './Components/orderList/OrderList';
import Filemanager from './Components/filemanager/Filemanager';
import LiveChat from './Components/liveChat/LiveChat';
import Mailbox from './Components/mailBox/Mailbox';
import Ticket from './Components/ticket/Ticket';
import ViewClient from './Components/viewClient/ViewClient';
import ViewOrder from './Components/viewOrder/ViewOrder';
import ViewTicket from './Components/viewTicket/ViewTicket';
import SendInvitationPage from './Components/invitaionPage/SendInvitationPage';
import LoginPage from './Components/login/LoginPage';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <div className="">
       <Routes>
       <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
       <Route path="/allMerchants" element={<PrivateRoute><AllMerchants /> </PrivateRoute>} />
       <Route path="/orderList"    element={<PrivateRoute><OrderList /> </PrivateRoute>} />
       <Route path="/filemanager"  element={<PrivateRoute><Filemanager /> </PrivateRoute>} />
       <Route path="/liveChat"     element={<PrivateRoute><LiveChat /> </PrivateRoute>} />
       <Route path="/mailBox"      element={<PrivateRoute><Mailbox /> </PrivateRoute>} />
       <Route path="/ticket"       element={<PrivateRoute><Ticket /> </PrivateRoute>} />
     <Route path="/viewClient/:id" element={<PrivateRoute><ViewClient /> </PrivateRoute>} />
       <Route path="/viewOrder/:id"element={<PrivateRoute><ViewOrder /> </PrivateRoute>} />
      <Route path="/viewTicket/:id"element={<PrivateRoute><ViewTicket/> </PrivateRoute>} />
       <Route path="/invitaionPage"element={<SendInvitationPage/> } />
       <Route path="/login" element={<LoginPage/>} />
       </Routes>
    </div>
  );
}

export default App;
