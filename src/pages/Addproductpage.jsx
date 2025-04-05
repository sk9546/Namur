import React from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../firebase/firebaseUtils";
import ProductForm from "../components/products/AddProductForm";
import { useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";

const AddProductPage = () => {
  const navigate = useNavigate();
  const { categories } = useContext(CategoryContext); // Access categories from context

  // Function to handle product submission
  const handleAddProduct = async (productData) => {
    try {
      await addProduct(productData); // Add product to Firestore
      navigate("/products"); // Navigate to the products page after successful addition
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 p-6">
      <h1 className="text-3xl font-bold text-gray-100 mb-8">Add New Product</h1>
      {/* Pass categories to the ProductForm */}
      <ProductForm onSubmit={handleAddProduct} categories={categories} />
    </div>
  );
};

export default AddProductPage;