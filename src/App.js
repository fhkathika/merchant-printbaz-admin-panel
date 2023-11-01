import logo from './logo.svg';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import Register from './Components/registerAdminPage/Register';
import Role from './Components/role/Role';
import DeliverySystem from './Components/deliverySystem/DeliverySystem';
import AllDeliveryList from './Components/allDeliveries/AllDeliveryList';
import Analytics from './Components/analytics/Analytics';
import AllRcvList from './Components/allRcvList/AllRcvList';
import { FilterProvider } from './Components/filterContext/FilterContext';
import SalesReport from './Components/salesReport/SalesReport';
import TshirtVendor from './Components/teshirtVendor/TshirtVendor';
import AllPurchasedTshirt from './Components/AllPurchasedTshirt/AllPurchasedTshirt';
import AllDamageTShirt from './Components/allDamageTshirt/AllDamageTShirt';
import AllSoldTshirt from './Components/allSoldTshirts/AllSoldTshirt';
import AllRcvAmount from './Components/allRcvAmount/AllRcvAmount';
import PaymentHistory from './Components/paymentHistory/PaymentHistory';
import AddBlogs from './Components/addBlogs/AddBlogs';
import AllBlogs from './Components/allBlogs/AllBlogs';
function App() {
  return (
    <div className="">
       <Routes>
       <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
       <Route path="/allMerchants" element={<PrivateRoute><AllMerchants /> </PrivateRoute>} />
    
     <Route path="/orderList"    element={<PrivateRoute><OrderList /> </PrivateRoute>} />
       <Route path="/viewOrder/:id"element={<PrivateRoute><ViewOrder /> </PrivateRoute>} />
      
       <Route path="/filemanager"  element={<PrivateRoute><Filemanager /> </PrivateRoute>} />
       <Route path="/liveChat"     element={<PrivateRoute><LiveChat /> </PrivateRoute>} />
       <Route path="/mailBox"      element={<PrivateRoute><Mailbox /> </PrivateRoute>} />
       <Route path="/ticket"       element={<PrivateRoute><Ticket /> </PrivateRoute>} />
     <Route path="/viewClient/:id" element={<PrivateRoute><ViewClient /> </PrivateRoute>} />
    
      <Route path="/viewTicket/:id"element={<PrivateRoute><ViewTicket/> </PrivateRoute>} />
      <Route path="/deliverySystem"element={<PrivateRoute><AllDeliveryList/></PrivateRoute>} />
      <Route path="/alldeliveries"element={<PrivateRoute><AllDeliveryList/> </PrivateRoute>} />
      <Route path="/allRcvMoney"element={<PrivateRoute><AllRcvList/> </PrivateRoute>} />
       <Route path="/invitaionPage"element={<PrivateRoute><SendInvitationPage/></PrivateRoute> } />
       <Route path="/login" element={<LoginPage/>} />
       <Route path="/role" element={<Role/>} />
       <Route path="/analytics" element={<Analytics/>} />
       <Route path="/addBlogs" element={<PrivateRoute><AddBlogs/></PrivateRoute>} />
       <Route path="/allBlogs" element={<PrivateRoute><AllBlogs/></PrivateRoute>} />
       <Route path="/salesReport" element={<SalesReport/>} />
       <Route path="/teshirtVendor" element={<TshirtVendor/>} />
       <Route path="/AllPurchasedTshirt" element={<AllPurchasedTshirt/>} />
       <Route path="/allDamagedTshirt" element={<AllDamageTShirt/>} />
       <Route path="/allSoldTshirts" element={<AllSoldTshirt/>} />
       <Route path="/allRcvAmount" element={<AllRcvAmount/>} />
       <Route path="/paymentHistory/:merchantId" element={<PaymentHistory/>} />
       <Route
  path="/registerAdminPage"
  element={
    <Register token={new URLSearchParams(useLocation().search).get('token')} />
  }
/>
       </Routes>
    </div>
  );
}

export default App;
