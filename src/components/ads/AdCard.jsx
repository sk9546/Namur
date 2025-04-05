import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteAd } from "../../firebase/firebaseUtils";

const AdCard = ({ ad ,onDelete}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Date formatting utility
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Status calculation
  const now = new Date();
  const startDate = new Date(ad.startDate);
  const endDate = new Date(ad.endDate);
  const isActive = now >= startDate && now <= endDate;

  const handleDelete = async () => {
    try {
        await deleteAd(ad.id);
        onDelete(ad.id);  // Call the parent deletion handler
        console.log("Ad deleted successfully!");
    } catch (error) {
        console.error("Error deleting ad:", error);
    }
};

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 relative">
      {/* Image */}
      <img
        src={ad.imageUrl || "https://via.placeholder.com/150"}
        alt={`Advertisement for ${ad.title}`}
        className="w-full h-48 object-cover rounded-lg mb-4"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/150";
        }}
      />

      {/* Content */}
      <h2 className="text-xl font-semibold text-gray-100">{ad.title}</h2>
      <p className="text-gray-400 mt-2 line-clamp-2">{ad.description}</p>
      
      {/* Price */}
      <p className="text-green-400 font-bold mt-2">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(ad.price)}
      </p>

      {/* Schedule */}
      <div className="mt-2">
        <p className={`text-sm ${isActive ? "text-green-400" : "text-red-400"}`}>
          {isActive ? "Active" : "Inactive"}
        </p>
        <p className="text-gray-500 text-sm mt-1">
          {formatDate(ad.startDate)} - {formatDate(ad.endDate)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-4">
        <Link
          to={`/edit-ad/${ad.id}`}
          className="text-indigo-400 hover:text-indigo-300"
          aria-label={`Edit advertisement for ${ad.title}`}
        >
          Edit
        </Link>
        <button
          className={`text-red-400 hover:text-red-300 ${isDeleting ? 'opacity-50' : ''}`}
          onClick={() => setShowDeleteConfirm(true)}
          disabled={isDeleting}
          aria-label={`Delete advertisement for ${ad.title}`}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-sm w-full mx-4">
            <p className="text-gray-200">Delete this advertisement?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-400 hover:text-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdCard;