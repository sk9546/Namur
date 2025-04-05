// src/pages/NewsPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchNews, deleteNews } from "../firebase/firebaseUtils";
import NewsTable from "../components/news/NewsTable";

const NewsPage = () => {
    const [news, setNews] = useState([]);

    // Fetch news on component mount
    useEffect(() => {
        const getNews = async () => {
            try {
                const fetchedNews = await fetchNews();
                setNews(fetchedNews);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        getNews();
    }, []);

    // Handle news deletion
    const handleDelete = async (id) => {
        try {
            await deleteNews(id);
            setNews((prevNews) => prevNews.filter((article) => article.id !== id));
        } catch (error) {
            console.error("Error deleting news:", error);
        }
    };

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <h1 className="text-3xl font-bold text-gray-100 mb-8">Manage News</h1>

            {/* Add News Button */}
            <Link to="/add-news">
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 mb-6">
                    Add News
                </button>
            </Link>

            {/* News Table */}
            <NewsTable news={news} onDelete={handleDelete} />
        </div>
    );
};

export default NewsPage;