import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  db,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
} from "../firebase/firebase";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const SubcategoryPage = () => {
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
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

  const handleAddSubcategory = async (name, iconFile) => {
    try {
      setIsLoading(true);
      let iconUrl = null;
      if (iconFile) {
        const storage = getStorage();
        const iconRef = storageRef(storage, `subcategory-icons/${iconFile.name}`);
        await uploadBytes(iconRef, iconFile);
        iconUrl = await getDownloadURL(iconRef);
      }

      const newSubcategoryRef = await addDoc(
        collection(db, `categories/${categoryId}/subcategories`),
        {
          name,
          icon: iconUrl,
        }
      );

      setSubcategories([
        ...subcategories,
        { id: newSubcategoryRef.id, name, icon: iconUrl },
      ]);
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding subcategory:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSubcategory = async (subcategoryId, updatedData, iconFile) => {
    try {
      setIsLoading(true);
      let iconUrl = updatedData.icon;
      if (iconFile) {
        const storage = getStorage();
        const iconRef = storageRef(storage, `subcategory-icons/${iconFile.name}`);
        await uploadBytes(iconRef, iconFile);
        iconUrl = await getDownloadURL(iconRef);
      }

      const dataToUpdate = { ...updatedData };
      if (iconUrl !== undefined) {
        dataToUpdate.icon = iconUrl;
      }

      await updateDoc(doc(db, `categories/${categoryId}/subcategories`, subcategoryId), dataToUpdate);

      setSubcategories(
        subcategories.map((sc) =>
          sc.id === subcategoryId ? { ...sc, ...dataToUpdate } : sc
        )
      );
      setEditingSubcategory(null);
    } catch (error) {
      console.error("Error updating subcategory:", error);
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
              <h1 className="text-3xl font-bold text-gray-100">Subcategories</h1>
              <p className="text-gray-400">
                {subcategories.length} subcategor{subcategories.length !== 1 ? "ies" : "y"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Subcategory
          </button>
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
                  Click the "Add Subcategory" button to create your first subcategory
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
                        onClick={() => setEditingSubcategory(subcategory)}
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

        {/* Add Subcategory Modal */}
        {isAdding && (
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-100">
                    <span className="text-indigo-400 mr-2">➕</span>
                    Add Subcategory
                  </h3>
                  <button
                    onClick={() => setIsAdding(false)}
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

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const name = e.target.name.value;
                    const iconFile = e.target.icon.files[0];
                    handleAddSubcategory(name, iconFile);
                  }}
                >
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subcategory Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                      placeholder="Enter subcategory name"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Icon (Optional)
                    </label>
                    <div className="relative border-2 border-dashed border-gray-600 rounded-xl hover:border-indigo-500 transition-colors group">
                      <input
                        type="file"
                        name="icon"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <svg
                          className="w-10 h-10 text-gray-500 group-hover:text-indigo-500 mb-3 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          Click to upload an icon
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          (Recommended: 128x128px PNG)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-5 py-2.5 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/30"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
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
                          Adding...
                        </>
                      ) : (
                        "Add Subcategory"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Subcategory Modal */}
        {editingSubcategory && (
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-100">
                    <span className="text-yellow-400 mr-2">✏️</span>
                    Edit Subcategory
                  </h3>
                  <button
                    onClick={() => setEditingSubcategory(null)}
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

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const name = e.target.name.value;
                    const iconFile = e.target.icon.files[0];
                    handleUpdateSubcategory(editingSubcategory.id, { name }, iconFile);
                  }}
                >
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subcategory Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editingSubcategory.name}
                      required
                      className="w-full px-4 py-3 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Icon (Optional)
                    </label>
                    <div className="relative border-2 border-dashed border-gray-600 rounded-xl hover:border-indigo-500 transition-colors group">
                      <input
                        type="file"
                        name="icon"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <svg
                          className="w-10 h-10 text-gray-500 group-hover:text-indigo-500 mb-3 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          {editingSubcategory.icon ? "Click to change icon" : "Click to upload an icon"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          (Recommended: 128x128px PNG)
                        </p>
                      </div>
                    </div>
                    {editingSubcategory.icon && (
                      <div className="mt-4 flex flex-col items-center">
                        <span className="text-sm text-gray-400 mb-2">Current Icon:</span>
                        <div className="border-2 border-gray-600 p-1 rounded-full">
                          <img
                            src={editingSubcategory.icon}
                            alt="Current icon"
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-800"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                    <button
                      type="button"
                      onClick={() => setEditingSubcategory(null)}
                      className="px-5 py-2.5 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/30"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800"
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
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubcategoryPage;