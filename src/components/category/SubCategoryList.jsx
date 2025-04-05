import React, { useState, useEffect } from "react";
import { db, collection, getDocs, doc, deleteDoc } from "../../firebase/firebase";

const SubcategoryList = ({ categoryId }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, `categories/${categoryId}/subcategories`)
        );
        const fetchedSubcategories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSubcategories(fetchedSubcategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  const handleDeleteSubcategory = async (subcategoryId) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        setIsLoading(true);
        await deleteDoc(doc(db, `categories/${categoryId}/subcategories`, subcategoryId));
        setSubcategories(subcategories.filter((sc) => sc.id !== subcategoryId));
      } catch (error) {
        console.error("Error deleting subcategory:", error);
      } finally {
        setIsLoading(false);
      }
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
              <h1 className="text-3xl font-bold text-gray-100">Subcategories</h1>
              <p className="text-gray-400">
                {subcategories.length} subcategor{subcategories.length !== 1 ? "ies" : "y"}
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

        {/* Subcategories List */}
        {!isLoading && (
          <div className="space-y-4">
            {subcategories.length === 0 ? (
              <div className="text-center py-16 rounded-xl bg-gray-800/50 border-2 border-dashed border-gray-700">
                <div className="text-gray-500 text-6xl mb-4">🗂️</div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  No subcategories yet
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Add subcategories to see them appear here
                </p>
              </div>
            ) : (
              subcategories.map((subcategory) => (
                <div
                  key={subcategory.id}
                  className="group relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-700 hover:border-gray-600"
                >
                  <div className="flex justify-between items-start">
                    <div className="pr-4 flex-1">
                      <div className="flex items-center space-x-4">
                        {subcategory.icon && (
                          <img
                            src={subcategory.icon}
                            alt={`${subcategory.name} icon`}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                          />
                        )}
                        <div>
                          <p className="text-gray-100 text-lg font-medium">
                            {subcategory.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDeleteSubcategory(subcategory.id)}
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
      </div>
    </div>
  );
};

export default SubcategoryList;