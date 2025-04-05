// src/components/news/AddNewsForm.jsx
import { useState } from "react";

const AddNewsForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        url: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Pass the form data to the parent component
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

            {/* URL Field */}
            <input
                type="url"
                name="url"
                placeholder="URL"
                value={formData.url}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
                Add News
            </button>
        </form>
    );
};

export default AddNewsForm;