import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, doc, deleteDoc, collection, getDocs, updateDoc } from "../../firebase/firebase";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const fetchedCategories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        setIsLoading(true);
        await deleteDoc(doc(db, "categories", categoryId));
        setCategories(categories.filter((cat) => cat.id !== categoryId));
      } catch (error) {
        console.error("Error deleting category:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEditCategory = (categoryId) => {
    const categoryToEdit = categories.find((cat) => cat.id === categoryId);
    setEditingCategoryId(categoryId);
    setEditFormData({
      name: categoryToEdit.name || "",
      icon: categoryToEdit.icon || "",
      subcategories: categoryToEdit.subcategories || [],
    });
  };

  const handleCloseEditForm = () => {
    setEditingCategoryId(null);
    setEditFormData({});
  };

  const handleSaveCategory = async () => {
    try {
      setIsLoading(true);
      const categoryRef = doc(db, "categories", editingCategoryId);
      await updateDoc(categoryRef, editFormData);

      setCategories(
        categories.map((cat) =>
          cat.id === editingCategoryId ? { ...cat, ...editFormData } : cat
        )
      );
      handleCloseEditForm();
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center">
            <div className="bg-indigo-900/50 p-3 rounded-xl mr-4 border border-indigo-700/50">
              <svg
                className="w-8 h-8 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-100">Categories</h1>
              <p className="text-gray-400">
                {categories.length} categor{categories.length !== 1 ? "ies" : "y"}
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {/* Categories List */}
        {!isLoading && (
          <div className="space-y-4">
            {categories.length === 0 ? (
              <div className="text-center py-16 rounded-xl bg-gray-800/50 border-2 border-dashed border-gray-700">
                <div className="text-gray-500 text-6xl mb-4">🗂️</div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  No categories found
                </h3>
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="group relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-700 hover:border-gray-600"
                >
                  <div className="flex justify-between items-start">
                    <div className="pr-4 flex-1">
                      <div className="flex items-center space-x-4">
                        {category.icon && (
                          <img
                            src={category.icon}
                            alt={`${category.name} icon`}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                          />
                        )}
                        <div>
                          <p className="text-gray-100 text-lg font-medium">
                            {category.name}
                          </p>
                          {category.subcategories && category.subcategories.length > 0 && (
                            <p className="text-sm text-gray-400 mt-1">
                              Subcategories:{" "}
                              <span className="text-gray-300">
                                {category.subcategories.join(", ")}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        to={`/subcategories/${category.id}`}
                        className="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        title="View Subcategories"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View Subcategory
                      </Link>
                      <button
                        onClick={() => handleEditCategory(category.id)}
                        className="flex items-center px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="flex items-center px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Edit Form Modal */}
        {editingCategoryId && (
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-100">
                    <span className="text-yellow-400 mr-2">✏️</span>
                    Edit Category
                  </h3>
                  <button
                    onClick={handleCloseEditForm}
                    className="text-gray-400 hover:text-gray-300 transition-colors focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form>
                  {/* Category Name */}
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={editFormData.name || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    />
                  </div>

                  {/* Icon URL */}
                  <div className="mb-4">
                    <label
                      htmlFor="icon"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Icon URL
                    </label>
                    <input
                      type="text"
                      id="icon"
                      value={editFormData.icon || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          icon: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    />
                    {editFormData.icon && (
                      <div className="mt-2 flex items-center">
                        <span className="text-sm text-gray-400 mr-2">Preview:</span>
                        <img
                          src={editFormData.icon}
                          alt="Icon preview"
                          className="w-8 h-8 rounded-full object-cover border border-gray-600"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Subcategories */}
                  {/* <div className="mb-6">
                    <label
                      htmlFor="subcategories"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Subcategories (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="subcategories"
                      value={
                        editFormData.subcategories
                          ? editFormData.subcategories.join(", ")
                          : ""
                      }
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          subcategories: e.target.value
                            .split(",")
                            .map((item) => item.trim()),
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    />
                  </div> */}
                </form>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseEditForm}
                    className="px-5 py-2.5 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/30"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCategory}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;