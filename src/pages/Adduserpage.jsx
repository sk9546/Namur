import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../firebase/firebaseUtils";

const AddUserPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        
        address: "",
        phone: "",
        land: "",
        Crop: "",
        "I have": "",
        KYC: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
                {/* Name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Address */}
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Phone No. */}
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone No."
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Land Details */}
                <input
                    type="text"
                    name="land"
                    placeholder="Land Details"
                    value={formData.land}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Crop Details */}
                <input
                    type="text"
                    name="Crop"
                    placeholder="Crop Details"
                    value={formData.Crop}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* I Have */}
                <input
                    type="text"
                    name="I have"
                    placeholder="I have (e.g., Cow, Tractor)"
                    value={formData["I have"]}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* KYC */}
                <select
                    name="KYC"
                    value={formData.KYC || ""}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                    aria-label="KYC Status"
                >
                    <option value="" disabled hidden>Select KYC Status</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>

                {/* Role */}
                {/* <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Seller">Seller</option>
                    <option value="Buyer">Buyer</option>
                </select> */}

                {/* Submit Button */}
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