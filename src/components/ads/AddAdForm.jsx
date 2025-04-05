import { useState } from "react";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddAdForm = ({ onSubmit, initialValues = {} }) => {
    const [formData, setFormData] = useState({
        title: initialValues.title || "",
        description: initialValues.description || "",
        price: initialValues.price || "",
        imageUrl: initialValues.imageUrl || "",
        startDate: initialValues.startDate || "",
        endDate: initialValues.endDate || "",
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(initialValues.imageUrl || "");

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
            const storageRef = ref(storage, `ads/${Date.now()}_${selectedImage.name}`);
            const snapshot = await uploadBytes(storageRef, selectedImage);
            return await getDownloadURL(snapshot.ref);
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

            onSubmit({
                ...formData,
                imageUrl: imageUrl || ""
            });
            
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting ad. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Field */}
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Description Field */}
            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Price Field */}
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Image Upload Field */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Ad Image</label>
                <div className="flex items-center gap-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="adImageInput"
                    />
                    <label
                        htmlFor="adImageInput"
                        className="cursor-pointer bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                        Choose Image
                    </label>
                    {imagePreview && (
                        <div className="w-16 h-16 relative">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-lg border-2 border-gray-600"
                            />
                        </div>
                    )}
                </div>
                <p className="text-sm text-gray-400">
                    {selectedImage ? selectedImage.name : "No image selected"}
                </p>
            </div>

            {/* Start Date Field */}
            <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* End Date Field */}
            <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Submit Button */}
            <button
                type="submit"
                disabled={uploading}
                className={`w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-lg transition duration-200 ${
                    uploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {uploading ? "Uploading Image..." : "Save Ad"}
            </button>
        </form>
    );
};

export default AddAdForm;