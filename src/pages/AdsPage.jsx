import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAds } from "../firebase/firebaseUtils";
import AdCard from "../components/ads/AdCard";

const AdsPage = () => {
    const [ads, setAds] = useState([]);

    // Fetch ads on component mount
    useEffect(() => {
        const getAds = async () => {
            try {
                const fetchedAds = await fetchAds();
                setAds(fetchedAds);
            } catch (error) {
                console.error("Error fetching ads:", error);
            }
        };
        getAds();
    }, []);

    // Handle ad deletion
    const handleAdDeleted = (deletedAdId) => {
        setAds(prevAds => prevAds.filter(ad => ad.id !== deletedAdId));
    };

    // Filter ads based on schedule
    const filteredAds = ads.filter((ad) => {
        const now = new Date();
        const startDate = new Date(ad.startDate);
        const endDate = new Date(ad.endDate);
        return now >= startDate && now <= endDate;
    });

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <h1 className="text-3xl font-bold text-gray-100 mb-8">Ads</h1>

            {/* Add Ad Button */}
            <Link to="/add-ad">
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 mb-6">
                    Add Ad
                </button>
            </Link>

            {/* Display Active Ads */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAds.length > 0 ? (
                    filteredAds.map((ad) => (
                        <AdCard 
                            key={ad.id} 
                            ad={ad} 
                            onDelete={handleAdDeleted}  // Pass the deletion handler
                        />
                    ))
                ) : (
                    <p className="text-gray-400">No active ads at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default AdsPage;