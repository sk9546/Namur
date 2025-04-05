// src/pages/AddAdPage.jsx
import { useNavigate } from "react-router-dom";
import { addAd } from "../firebase/firebaseUtils";
import AddAdForm from "../components/ads/AddAdForm";

const AddAdPage = () => {
    const navigate = useNavigate();

    // Handle form submission
    const handleAddAd = async (adData) => {
        try {
            await addAd(adData); // Add ad to Firestore
            console.log("Ad added successfully!");
            navigate("/ads"); // Redirect to AdsPage after adding
        } catch (error) {
            console.error("Error adding ad:", error);
        }
    };

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <h1 className="text-3xl font-bold text-gray-100 mb-8">Add New Ad</h1>
            <AddAdForm onSubmit={handleAddAd} />
        </div>
    );
};

export default AddAdPage;