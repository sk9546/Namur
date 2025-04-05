import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserById, updateUser } from "../firebase/firebaseUtils";

const EditUserPage = () => {
    const { id } = useParams(); // Use `id` instead of `userId`
    const [formData, setFormData] = useState({
        name: "",
        email: "",
       
        address: "",
        phone: "",
        land: "",
        Crop: "",
        "I have": "",
        KYC: ""
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            console.error("User ID is missing");
            alert("Invalid user ID. Redirecting to users page."); // Show an error message
            navigate("/users"); // Redirect to users page if id is missing
            return;
        }

        const getUser = async () => {
            try {
                const user = await fetchUserById(id); // Use `id` here
                console.log("Fetched User Data:", user); // Debugging log

                // Ensure all required fields are present
                setFormData(user);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user:", error);
                setLoading(false);
            }
        };
        getUser();
    }, [id, navigate]); // Use `id` in the dependency array

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, formData); // Use `id` here
            navigate("/users"); // Redirect to UsersPage after updating
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    if (loading) {
        return <p className="text-gray-400 text-center">Loading...</p>;
    }

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <h1 className="text-3xl font-bold text-gray-100 mb-8">Edit User</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Email */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Address */}
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Phone No. */}
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone No."
                    value={formData.phone || ""}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Land Details */}
                <input
                    type="text"
                    name="land"
                    placeholder="Land Details"
                    value={formData.land || ""}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Crop Details */}
                <input
                    type="text"
                    name="Crop"
                    placeholder="Crop Details"
                    value={formData.Crop || ""}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* I Have */}
                <input
                    type="text"
                    name="I have"
                    placeholder="I have (e.g., Cow, Tractor)"
                    value={formData["I have"] || ""}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* KYC */}
                {/* <input
                    type="text"
                    name="KYC"
                    placeholder="KYC (Yes/No)"
                    value={formData.KYC || ""}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                /> */}
                <select
                    name="KYC"
                    value={formData.KYC || ""}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                >
                    <option value="" disabled hidden>Select KYC Status</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>

                {/* Role */}
                {/* <select
                    name="role"
                    value={formData.role || "Seller"}
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
                    Update User
                </button>
            </form>
        </div>
    );
};

export default EditUserPage;