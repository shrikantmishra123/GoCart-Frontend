import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import CusOrd from "./pages/CusOrd";
import Cart from "./pages/Cart";
import Venders from "./pages/Venders";
import Vendorlogin from "./pages/Vendorlogin";
import Vendordashboard from "./pages/Vendordashboard";
import VendorLoginForm from "./pages/VendorLoginForm";
import VendorPanel from "./pages/VendorPanel";
import ConsumerAuthPage from "./pages/ConsumerAuthPage";

console.log("✅ App.jsx Loaded!");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/cusord" element={<CusOrd />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/venders" element={<Venders />} />
        <Route path="/vendorlogin" element={<Vendorlogin />} />
        <Route path="/vendordashboard" element={<Vendordashboard />} />
        <Route path="/vendor-auth" element={<VendorLoginForm />} />
        <Route path="/vendorpanel" element={<VendorPanel />} />{" "}
        <Route path="/consumer-auth" element={<ConsumerAuthPage />} />
        {/* ✅ New Panel */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
