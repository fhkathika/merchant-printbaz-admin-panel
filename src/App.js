import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/dashboard/Dashboard';
import AllMerchants from './Components/allMerchants/AllMerchants';

function App() {
  return (
    <div className="App">
       <Routes>
       <Route path="/" element={<Dashboard />} />
       <Route path="/allMerchants" element={<AllMerchants />} />
       </Routes>
    </div>
  );
}

export default App;
