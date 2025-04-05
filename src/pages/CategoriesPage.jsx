import React, { useState,useContext } from "react";
import CreateCategoryForm from "../components/category/CreateCategoryForm";
import CategoryList from "../components/category/CategoryList";
import { CategoryContext } from "../context/CategoryContext";

const CategoriesPage = () => {
  const { categories } = useContext(CategoryContext);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create New Category
        </button>
      </div>
      {isFormOpen && <CreateCategoryForm onClose={() => setIsFormOpen(false)} />}
      <CategoryList />
    </div>
  );
};

export default CategoriesPage;