import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AdminRoute = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Check if the user has an admin role (e.g., stored in Firestore)
                const isAdminUser = true; // Replace with actual role check logic
                setIsAdmin(isAdminUser);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <p className="text-gray-400 text-center">Loading...</p>;
    }

    if (!isAdmin) {
        return <p className="text-red-400 text-center">Access Denied. You are not authorized to view this page.</p>;
    }

    return children;
};

export default AdminRoute;