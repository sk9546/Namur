// src/pages/AddNewsPage.jsx
import { useNavigate } from "react-router-dom";
import { addNews } from "../firebase/firebaseUtils";
import AddNewsForm from "../components/news/AddNewsForm";

const AddNewsPage = () => {
    const navigate = useNavigate();

    // Handle form submission
    const handleAddNews = async (newsData) => {
        try {
            await addNews(newsData); // Add news to Firestore
            console.log("News article added successfully!");
            navigate("/news"); // Redirect to NewsPage after adding
        } catch (error) {
            console.error("Error adding news article:", error);
        }
    };

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <h1 className="text-3xl font-bold text-gray-100 mb-8">Add New News Article</h1>
            <AddNewsForm onSubmit={handleAddNews} />
        </div>
    );
};

export default AddNewsPage;