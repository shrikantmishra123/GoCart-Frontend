import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CusOrd from "./pages/CusOrd";
import Cart from "./pages/Cart";
import Venders from "./pages/Venders";
import Vendorlogin from "./pages/Vendorlogin";
import Vendordashboard from "./pages/Vendordashboard";
import VendorLoginForm from "./pages/VendorLoginForm";
import VendorPanel from "./pages/VendorPanel";
import ConsumerAuthPage from "./pages/ConsumerAuthPage";
import ConsumerLogin from "./pages/ConsumerLogin";


console.log("✅ App.jsx Loaded!");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cusord" element={<CusOrd />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/venders" element={<Venders />} />
        <Route path="/vendorlogin" element={<Vendorlogin />} />
        <Route path="/vendordashboard" element={<Vendordashboard />} />
        <Route path="/vendor-auth" element={<VendorLoginForm />} />
        <Route path="/vendorpanel" element={<VendorPanel />} />{" "}
        <Route path="/consumer-auth" element={<ConsumerAuthPage />} />
        <Route path="/consumer-login" element={<ConsumerLogin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
