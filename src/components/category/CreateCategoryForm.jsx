// import React, { useState, useContext } from "react";
// import { db, collection, addDoc } from "../../firebase/firebase";
// import { CategoryContext } from "../../context/CategoryContext";

// const CreateCategoryForm = ({ onClose }) => {
//   const [categoryName, setCategoryName] = useState("");
//   const [subcategories, setSubcategories] = useState([""]);
//   const { categories } = useContext(CategoryContext);

//   // Function to check if a category already exists
//   const isCategoryExists = (name) => {
//     return categories.some((category) => category.name === name);
//   };

//   const handleAddSubcategory = () => {
//     setSubcategories([...subcategories, ""]);
//   };

//   const handleChangeSubcategory = (index, value) => {
//     const updatedSubcategories = [...subcategories];
//     updatedSubcategories[index] = value;
//     setSubcategories(updatedSubcategories);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Check if the category already exists
//       if (isCategoryExists(categoryName)) {
//         alert("Category already exists. Please choose a different name.");
//         return;
//       }

//       await addDoc(collection(db, "categories"), {
//         name: categoryName,
//         subcategories: subcategories.filter((sub) => sub.trim() !== ""),
//       });
//       onClose(); // Close the form after submission
//     } catch (error) {
//       console.error("Error adding category:", error);
//     }
//   };

//   return (
//     <div className="z-10 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Category</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Category Name */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2 text-gray-700">
//               Category Name
//             </label>
//             <input
//               type="text"
//               value={categoryName}
//               onChange={(e) => setCategoryName(e.target.value)}
//               required
//               className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-black ${
//                 isCategoryExists(categoryName) ? "border-red-500" : ""
//               }`}
//             />
//             {isCategoryExists(categoryName) && (
//               <p className="text-red-500 text-sm mt-1">Category already exists.</p>
//             )}
//           </div>

//           {/* Subcategories */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700">
//               Subcategories
//             </label>
//             {subcategories.map((sub, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 value={sub}
//                 onChange={(e) => handleChangeSubcategory(index, e.target.value)}
//                 placeholder={`Subcategory ${index + 1}`}
//                 className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-500 text-black"
//               />
//             ))}
//           </div>

//           {/* Add Subcategory Button */}
//           <button
//             type="button"
//             onClick={handleAddSubcategory}
//             className="text-blue-600 hover:text-blue-800 text-sm mb-4 focus:outline-none"
//           >
//             + Add Subcategory
//           </button>

//           {/* Action Buttons */}
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2 hover:bg-gray-300 focus:outline-none"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isCategoryExists(categoryName)}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateCategoryForm;




// import React, { useState, useContext } from "react";
// import { db, collection, addDoc, storage, ref, uploadBytes, getDownloadURL } from "../../firebase/firebase";
// import { CategoryContext } from "../../context/CategoryContext";

// const CreateCategoryForm = ({ onClose }) => {
//   const [categoryName, setCategoryName] = useState("");
//   const [iconFile, setIconFile] = useState(null);
//   const [subcategories, setSubcategories] = useState([""]);
//   const { categories } = useContext(CategoryContext);

//   // Check if a category already exists
//   const isCategoryExists = (name) => {
//     return categories.some((category) => category.name === name);
//   };

//   const handleAddSubcategory = () => {
//     setSubcategories([...subcategories, ""]);
//   };

//   const handleChangeSubcategory = (index, value) => {
//     const updatedSubcategories = [...subcategories];
//     updatedSubcategories[index] = value;
//     setSubcategories(updatedSubcategories);
//   };

//   const handleIconUpload = (e) => {
//     const file = e.target.files[0];
//     setIconFile(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Check if the category already exists
//       if (isCategoryExists(categoryName)) {
//         alert("Category already exists. Please choose a different name.");
//         return;
//       }

//       let iconUrl = null;

//       // Upload icon to Firebase Storage if provided
//       if (iconFile) {
//         const iconRef = ref(storage, `category-icons/${iconFile.name}`);
//         await uploadBytes(iconRef, iconFile);
//         iconUrl = await getDownloadURL(iconRef);
//       }

//       // Add category to Firestore
//       await addDoc(collection(db, "categories"), {
//         name: categoryName,
//         icon: iconUrl,
//         subcategories: subcategories.filter((sub) => sub.trim() !== ""),
//       });

//       onClose(); // Close the form after submission
//     } catch (error) {
//       console.error("Error adding category:", error);
//     }
//   };

//   return (
//     <div className="z-10 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Category</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Category Name */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2 text-gray-700">
//               Category Name
//             </label>
//             <input
//               type="text"
//               value={categoryName}
//               onChange={(e) => setCategoryName(e.target.value)}
//               required
//               className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-black ${
//                 isCategoryExists(categoryName) ? "border-red-500" : ""
//               }`}
//             />
//             {isCategoryExists(categoryName) && (
//               <p className="text-red-500 text-sm mt-1">Category already exists.</p>
//             )}
//           </div>

//           {/* Category Icon */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2 text-gray-700">
//               Category Icon
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleIconUpload}
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-black"
//             />
//           </div>

//           {/* Subcategories */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700">
//               Subcategories
//             </label>
//             {subcategories.map((sub, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 value={sub}
//                 onChange={(e) => handleChangeSubcategory(index, e.target.value)}
//                 placeholder={`Subcategory ${index + 1}`}
//                 className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-500 text-black"
//               />
//             ))}
//           </div>

//           {/* Add Subcategory Button */}
//           <button
//             type="button"
//             onClick={handleAddSubcategory}
//             className="text-blue-600 hover:text-blue-800 text-sm mb-4 focus:outline-none"
//           >
//             + Add Subcategory
//           </button>

//           {/* Action Buttons */}
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2 hover:bg-gray-300 focus:outline-none"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isCategoryExists(categoryName)}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateCategoryForm;


import React, { useState } from "react";
import { db, collection, addDoc, storage, ref, uploadBytes, getDownloadURL } from "../../firebase/firebase";

const CreateCategoryForm = ({ onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      let iconUrl = null;

      if (iconFile) {
        const iconRef = ref(storage, `category-icons/${iconFile.name}`);
        await uploadBytes(iconRef, iconFile);
        iconUrl = await getDownloadURL(iconRef);
      }

      await addDoc(collection(db, "categories"), {
        name: categoryName,
        icon: iconUrl || iconPreview,
      });

      setCategoryName("");
      setIconFile(null);
      setIconPreview("");
      onClose();
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to create category. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-100">
              <span className="text-indigo-400 mr-2">➕</span>
              Create New Category
            </h2>
            <button
              onClick={onClose}
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

          <form onSubmit={handleSubmit}>
            {/* Category Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                className={`w-full px-4 py-3 bg-gray-700 text-gray-100 rounded-lg border ${
                  categoryName.trim() === "" ? "border-red-500/50" : "border-gray-600"
                } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none`}
                placeholder="Enter category name"
              />
              {categoryName.trim() === "" && (
                <p className="text-red-400 text-sm mt-1">Category name is required</p>
              )}
            </div>

            {/* Category Icon */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category Icon
              </label>
              <div className="relative border-2 border-dashed border-gray-600 rounded-xl hover:border-indigo-500 transition-colors group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIconUpload}
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
                    {iconFile ? iconFile.name : "Click to upload an icon"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    (Recommended: 128x128px PNG)
                  </p>
                </div>
              </div>
              
              {iconPreview && (
                <div className="mt-4 flex flex-col items-center">
                  <span className="text-sm text-gray-400 mb-2">Preview:</span>
                  <div className="border-2 border-gray-600 p-1 rounded-full">
                    <img
                      src={iconPreview}
                      alt="Icon preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-800"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/30"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!categoryName.trim() || isSubmitting}
                className={`px-5 py-2.5 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                  !categoryName.trim() || isSubmitting
                    ? "bg-indigo-600/50 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {isSubmitting ? (
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
                    Creating...
                  </>
                ) : (
                  "Create Category"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryForm;