// src/pages/AddUserPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../firebase/firebaseUtils";

const AddUserPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", role: "Customer", status: "Active" });
    const navigate = useNavigate(); // Hook to handle navigation

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addUser(formData); // Add user to Firestore
            navigate("/users"); // Redirect to UsersPage after adding
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <h1 className="text-3xl font-bold text-gray-100 mb-8">Add New User</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                </select> */}
                {/* <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select> */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-lg transition duration-200"
                >
                    Add User
                </button>
            </form>
        </div>
    );
};

export default AddUserPage;