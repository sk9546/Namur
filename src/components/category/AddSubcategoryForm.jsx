import React, { useState } from "react";
import { db, collection, addDoc, storage, ref, uploadBytes, getDownloadURL } from "../../firebase/firebase";

const AddSubcategoryForm = ({ categoryId, onClose }) => {
  const [name, setName] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    if (!name.trim()) {
      alert("Subcategory name is required.");
      return;
    }

    setIsLoading(true);
    try {
      let iconUrl = null;

      // Upload icon to Firebase Storage if provided
      if (iconFile) {
        const iconRef = ref(storage, `subcategory-icons/${iconFile.name}`);
        await uploadBytes(iconRef, iconFile);
        iconUrl = await getDownloadURL(iconRef);
      }

      // Save to Firestore
      await addDoc(collection(db, `categories/${categoryId}/subcategories`), {
        name: name.trim(),
        icon: iconUrl || null,
      });

      onClose();
    } catch (error) {
      console.error("Error adding subcategory:", error);
      alert("Failed to add subcategory. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-100">
              <span className="text-indigo-400 mr-2">➕</span>
              Add Subcategory
            </h3>
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
            {/* Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subcategory Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                placeholder="Enter subcategory name"
              />
            </div>

            {/* Icon Upload Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Icon (Optional)
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
                disabled={!name.trim() || isLoading}
                className={`px-5 py-2.5 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                  !name.trim() || isLoading
                    ? "bg-indigo-600/50 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
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
                  "Add Subcategory"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubcategoryForm;