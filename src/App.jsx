import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import CusOrd from './pages/CusOrd';
import Cart from './pages/Cart';
import Venders from './pages/Venders';
import Vendorlogin from './pages/Vendorlogin';
import VendorConfirmationPage from './pages/VendorConfirmationPage ';
import Vendordashboard from './pages/Vendordashboard';


console.log("✅ App.jsx Loaded!"); // Debugging ke liye

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path='/cusord' element={<CusOrd></CusOrd>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/venders' element={<Venders></Venders>}></Route>
        <Route path='/vendorlogin' element={<Vendorlogin></Vendorlogin>}></Route>
        <Route path='/vendorconfirmation' element={<VendorConfirmationPage></VendorConfirmationPage>}></Route>
        <Route path='/vendordashboard' element={<Vendordashboard></Vendordashboard>}></Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
