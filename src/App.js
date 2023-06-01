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

function App() {
  return (
    <div className="App">
       <Routes>
       <Route path="/" element={<Dashboard />} />
       <Route path="/allMerchants" element={<AllMerchants />} />
       <Route path="/orderList" element={<OrderList />} />
       <Route path="/filemanager" element={<Filemanager />} />
       <Route path="/liveChat" element={<LiveChat />} />
       <Route path="/mailBox" element={<Mailbox />} />
       <Route path="/ticket" element={<Ticket />} />
       <Route path="/viewClient/:id" element={<ViewClient />} />
       <Route path="/viewOrder/:id" element={<ViewOrder />} />
       </Routes>
    </div>
  );
}

export default App;
