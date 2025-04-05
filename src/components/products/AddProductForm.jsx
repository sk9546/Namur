import React, { useState, useEffect } from "react";
import { db, storage, collection, getDocs } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProductForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    subcategory: "",
    imageUrl: ""
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // Initialize form data
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.imageUrl) {
        setImagePreview(initialData.imageUrl);
      }
    }
  }, [initialData]);

  // Fetch categories from Firestore
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
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories for the selected category
  useEffect(() => {
    const fetchSubcategories = async (categoryId) => {
      try {
        if (!categoryId) {
          setSubcategories([]);
          return;
        }

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
      }
    };

    fetchSubcategories(formData.category);
  }, [formData.category]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return null;
    
    try {
      setUploading(true);
      const storageRef = ref(storage, `products/${Date.now()}_${selectedImage.name}`);
      const snapshot = await uploadBytes(storageRef, selectedImage);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let imageUrl = formData.imageUrl;
      
      if (selectedImage) {
        imageUrl = await uploadImage();
      }

      const formDataWithImage = {
        ...formData,
        imageUrl: imageUrl || ""
      };

      onSubmit(formDataWithImage);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting product. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="max-h-[70vh] overflow-y-auto hide-scrollbar space-y-4 pr-2">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
  
        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
  
        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
  
        {/* Subcategory Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-2">Subcategory</label>
          <select
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            disabled={!formData.category}
          >
            <option value="">Select a subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
  
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Product Image</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="imageInput"
            />
            <label
              htmlFor="imageInput"
              className="cursor-pointer bg-gray-800 p-2 rounded hover:bg-gray-700 transition-colors text-sm"
            >
              Choose File
            </label>
            {imagePreview && (
              <div className="w-20 h-20 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded border border-gray-600"
                />
              </div>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {selectedImage ? selectedImage.name : "No file selected"}
          </p>
        </div>
      </div>
  
      {/* Sticky Submit Button */}
      <div className="mt-4 pt-4 border-t border-gray-700 sticky bottom-0 bg-gray-800">
        <button
          type="submit"
          disabled={uploading}
          className={`bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              Uploading...
            </span>
          ) : (
            "Save Product"
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;