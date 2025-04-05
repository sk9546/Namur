import React, { useEffect, useState } from "react";
import { fetchUsersApi, fetchProductsApi, fetchAdsApi } from "../firebase/firebaseUtils";
import DataTable from "../components/DataTable";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUsers = await fetchUsersApi();
                const fetchedProducts = await fetchProductsApi();
                const fetchedAds = await fetchAdsApi();

                setUsers(fetchedUsers);
                setProducts(fetchedProducts);
                setAds(fetchedAds);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <p className="text-gray-400 text-center">Loading...</p>;
    }

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <h1 className="text-3xl font-bold text-gray-100 mb-8">Admin Dashboard</h1>

            {/* Users Table */}
            <DataTable data={users} type="users" />

            {/* Products Table */}
            <div className="mt-8">
                <DataTable data={products} type="products" />
            </div>

            {/* Ads Table */}
            <div className="mt-8">
                <DataTable data={ads} type="ads" />
            </div>
        </div>
    );
};

export default AdminDashboard;