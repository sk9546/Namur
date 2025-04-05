import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

// Initialize the Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://admin-67e42-default-rtdb.firebaseio.com" // Replace with your Firebase database URL
});

const db = admin.firestore();

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to fetch all users
app.get("/api/users", async (req, res) => {
    try {
        const usersSnapshot = await db.collection("users").get();
        const users = [];
        usersSnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
});

// Endpoint to fetch all products
app.get("/api/products", async (req, res) => {
    try {
        const productsSnapshot = await db.collection("products").get();
        const products = [];
        productsSnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "An error occurred while fetching products." });
    }
});

// Endpoint to fetch all ads
app.get("/api/ads", async (req, res) => {
    try {
        const adsSnapshot = await db.collection("ads").get();
        const ads = [];
        adsSnapshot.forEach((doc) => {
            ads.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(ads);
    } catch (error) {
        console.error("Error fetching ads:", error);
        res.status(500).json({ error: "An error occurred while fetching ads." });
    }
});






// Endpoint to fetch all categories
app.get("/api/categories", async (req, res) => {
    try {
        const categoriesSnapshot = await db.collection("categories").get();
        const categories = [];
        categoriesSnapshot.forEach((doc) => {
            categories.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "An error occurred while fetching categories." });
    }
});

// Endpoint to fetch all subcategories for a specific category
app.get("/api/subcategories/:categoryId", async (req, res) => {
    const { categoryId } = req.params;

    if (!categoryId) {
        return res.status(400).json({ error: "Category ID is required." });
    }

    try {
        const subcategoriesSnapshot = await db
            .collection(`categories/${categoryId}/subcategories`)
            .get();
        const subcategories = [];
        subcategoriesSnapshot.forEach((doc) => {
            subcategories.push({ id: doc.id, ...doc.data() });
        });

        if (subcategories.length === 0) {
            return res.status(404).json({ error: "No subcategories found for this category." });
        }

        res.status(200).json(subcategories);
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        res.status(500).json({ error: "An error occurred while fetching subcategories." });
    }
});

app.get("/api/news", async (req, res) => {
    try {
        const newsSnapshot = await db.collection("news").get();
        const newsArticles = [];
        newsSnapshot.forEach((doc) => {
            newsArticles.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(newsArticles);
    } catch (error) {
        console.error("Error fetching news articles:", error);
        res.status(500).json({ error: "An error occurred while fetching news articles." });
    }
});

app.get("/api/notifications", async (req, res) => {
    try {
        const notificationsSnapshot = await db.collection("notifications").get();
        const notifications = [];
        notificationsSnapshot.forEach((doc) => {
            notifications.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ error: "An error occurred while fetching notifications." });
    }
});



// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
});