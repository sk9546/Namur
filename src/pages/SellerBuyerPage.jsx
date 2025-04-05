import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase"; // Ensure Firebase is initialized properly
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const SellerBuyerPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedType, setSelectedType] = useState("seller"); // Default to seller
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    district: "",
    gramPanchayat: "",
    taluk: "",
    pincode: "",
    photoURL: "",
  });
  const [editingId, setEditingId] = useState(null);

  // 🔥 Fetch data from Firestore
  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, selectedType);
      const snapshot = await getDocs(usersCollection);
      const usersList = snapshot.docs.map((doc) => {
        const data = doc.data();
        // Extract address details if available
        const address = data.address && data.address.length > 0 ? data.address[0] : {};
        return {
          id: doc.id,
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          district: address.district || "",
          gramPanchayat: address.gramPanchayat || "",
          taluk: address.taluk || "",
          pincode: address.pincode || "",
          photoURL: data.photoURL || "",
        };
      });
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedType]);

  // 📝 Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update User
  const handleSave = async () => {
    try {
      if (editingId) {
        // Update existing user
        const userRef = doc(db, selectedType, editingId);
        await updateDoc(userRef, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: [
            {
              district: formData.district,
              gramPanchayat: formData.gramPanchayat,
              taluk: formData.taluk,
              pincode: formData.pincode,
            },
          ],
          photoURL: formData.photoURL,
        });
        console.log("User updated successfully!");
      } else {
        // Add new user
        const usersCollection = collection(db, selectedType);
        await addDoc(usersCollection, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: [
            {
              district: formData.district,
              gramPanchayat: formData.gramPanchayat,
              taluk: formData.taluk,
              pincode: formData.pincode,
            },
          ],
          photoURL: formData.photoURL,
        });
        console.log("User added successfully!");
      }
      fetchUsers(); // Refresh data
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // ❌ Delete User
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const userRef = doc(db, selectedType, userId);
        await deleteDoc(userRef);
        fetchUsers(); // Refresh data
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // ✏️ Open Edit Modal
  const handleEdit = (user) => {
    // Populate form data with user details
    const address = user.address && user.address.length > 0 ? user.address[0] : {};
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      district: address.district || "",
      gramPanchayat: address.gramPanchayat || "",
      taluk: address.taluk || "",
      pincode: address.pincode || "",
      photoURL: user.photoURL || "",
    });
    setEditingId(user.id);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <h2>Manage {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}s</h2>

      {/* 🔀 Switch Between Seller & Buyer */}
      <div>
        <button onClick={() => setSelectedType("seller")}>Sellers</button>
        <button onClick={() => setSelectedType("buyer")}>Buyers</button>
      </div>

      {/* ➕ Add User */}
      <button
        onClick={() => {
          setIsModalOpen(true);
          setEditingId(null);
          setFormData({
            name: "",
            email: "",
            phone: "",
            district: "",
            gramPanchayat: "",
            taluk: "",
            pincode: "",
            photoURL: "",
          });
        }}
      >
        + Add {selectedType}
      </button>

      {/* 📋 Table to Show Users */}
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>District</th>
            <th>Gram Panchayat</th>
            <th>Taluk</th>
            <th>Pincode</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.district}</td>
              <td>{user.gramPanchayat}</td>
              <td>{user.taluk}</td>
              <td>{user.pincode}</td>
              <td>
                <img src={user.photoURL} alt="Profile" width="50" />
              </td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🏡 Add/Edit User Modal */}
      {isModalOpen && (
        <div className="modal">
          <h3>{editingId ? "Edit" : "Add"} {selectedType}</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="district"
            placeholder="District"
            value={formData.district}
            onChange={handleChange}
          />
          <input
            type="text"
            name="gramPanchayat"
            placeholder="Gram Panchayat"
            value={formData.gramPanchayat}
            onChange={handleChange}
          />
          <input
            type="text"
            name="taluk"
            placeholder="Taluk"
            value={formData.taluk}
            onChange={handleChange}
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            value={formData.photoURL}
            onChange={handleChange}
          />
          <button onClick={handleSave}>{editingId ? "Update" : "Save"}</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default SellerBuyerPage;