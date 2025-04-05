import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsers, deleteUser } from "../firebase/firebaseUtils";
import UsersTable from "../components/users/UsersTable";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch users on component mount
    useEffect(() => {
        const getUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers(); // Fetch all users from Firestore
                setUsers(fetchedUsers); // Update state with fetched users
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        getUsers();
    }, []);

    // Handle user deletion
    const handleDelete = async (id) => {
        try {
            await deleteUser(id); // Delete user from Firestore
            const updatedUsers = await fetchUsers(); // Fetch updated user list
            setUsers(updatedUsers); // Update state with new user list
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Filter users based on search term
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
            
    );

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <h1 className="text-3xl font-bold text-gray-100 mb-8">Manage Users</h1>

            {/* Search Bar and Add User Button */}
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-96"
                />
                <Link to="/adduser">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                        Add User
                    </button>
                </Link>
            </div>

            {/* Users Table */}
            <UsersTable users={filteredUsers} onDelete={handleDelete} />
        </div>
    );
};

export default UsersPage;