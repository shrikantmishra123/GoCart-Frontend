// src/pages/VendorPanel.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VendorPanel = () => {
  const [product, setProduct] = useState({
    vendorId: "",
    name: "",
    price: "",
    category: "",
    stock: "",
    discount: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    axios
      .post("https://gocart-gqbi.onrender.com/products", product)
      .then((res) => {
        alert("Product added!");
        setProduct({
          vendorId: "",
          name: "",
          price: "",
          category: "",
          stock: "",
          discount: "",
          image: "",
        });
        navigate("/cusord");
      })
      .catch((err) => alert("Error: " + err.message));
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
        Vendor Product Panel
      </h2>

      <input
        type="text"
        name="vendorId"
        placeholder="Vendor ID"
        value={product.vendorId}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        name="stock"
        placeholder="Stock"
        value={product.stock}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        name="discount"
        placeholder="Discount (%)"
        value={product.discount}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={product.image}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />

      <button
        onClick={handleAddProduct}
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
      >
        Add Product
      </button>
    </div>
  );
};

export default VendorPanel;
