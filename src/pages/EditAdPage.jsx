// src/pages/EditAdPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAdById, updateAd } from "../firebase/firebaseUtils";
import AddAdForm from "../components/ads/AddAdForm";

const EditAdPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ad, setAd] = useState(null);

    // Fetch ad data on component mount
    useEffect(() => {
        const fetchAd = async () => {
            try {
                const fetchedAd = await fetchAdById(id);
                if (fetchedAd) {
                    setAd(fetchedAd);
                } else {
                    console.error("Ad not found");
                    navigate("/ads");
                }
            } catch (error) {
                console.error("Error fetching ad:", error);
            }
        };
        fetchAd();
    }, [id, navigate]);

    // Handle form submission
    const handleUpdateAd = async (updatedData) => {
        try {
            await updateAd(id, updatedData); // Update ad in Firestore
            console.log("Ad updated successfully!");
            navigate("/ads"); // Redirect to AdsPage after updating
        } catch (error) {
            console.error("Error updating ad:", error);
        }
    };

    if (!ad) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <h1 className="text-3xl font-bold text-gray-100 mb-8">Edit Ad</h1>
            <AddAdForm onSubmit={handleUpdateAd} initialValues={ad} />
        </div>
    );
};

export default EditAdPage;