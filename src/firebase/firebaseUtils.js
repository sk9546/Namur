import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Adjust the path to your firebase.js file

/**
 * Fetch all users from Firestore.
 * @returns {Array} An array of user objects with their IDs.
 */
export const fetchUsers = async () => {
    try {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

/**
 * Add a new user to Firestore.
 * @param {Object} userData - The data of the new user to be added.
 */
export const addUser = async (userData) => {
    try {
        const usersCollection = collection(db, "users");
        await addDoc(usersCollection, userData);
        console.log("User added successfully!");
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};

/**
 * Fetch a single user by their ID from Firestore.
 * @param {string} userId - The unique ID of the user.
 * @returns {Object} The user object with their ID.
 */
export const fetchUserById = async (userId) => {
    try {
        const userDoc = doc(db, "users", userId); // Reference the user document
        const snapshot = await getDoc(userDoc);
        if (snapshot.exists()) {
            const { status, ...rest } = snapshot.data(); // Exclude `status` if not needed
            return { id: snapshot.id, ...rest };
        } else {
            console.error("User not found");
            throw new Error("User not found");
        }
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};

/**
 * Update an existing user in Firestore.
 * @param {string} userId - The unique ID of the user.
 * @param {Object} updatedData - The updated fields for the user.
 */
export const updateUser = async (userId, updatedData) => {
    try {
        const userDoc = doc(db, "users", userId);
        await updateDoc(userDoc, updatedData);
        console.log("User updated successfully!");
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

/**
 * Delete a user from Firestore.
 * @param {string} userId - The unique ID of the user.
 */
export const deleteUser = async (userId) => {
    try {
        const userDoc = doc(db, "users", userId);
        await deleteDoc(userDoc);
        console.log("User deleted successfully!");
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

// Fetch all products
export const fetchProducts = async () => {
    try {
        const productsCollection = collection(db, "products");
        const snapshot = await getDocs(productsCollection);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

// Add a new product
export const addProduct = async (productData) => {
    try {
        const productsCollection = collection(db, "products");
        await addDoc(productsCollection, productData);
        console.log("Product added successfully!");
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

export const fetchSubcategories = async () => {
    const querySnapshot = await getDocs(collection(db, "subcategories"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

// Fetch a single product by ID



export const fetchProductById = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const productSnapshot = await getDoc(productRef);

    if (productSnapshot.exists()) {
      console.log("Fetched product data:", productSnapshot.data());
      return { id: productSnapshot.id, ...productSnapshot.data() };
    } else {
      console.error("Product not found in Firestore:", productId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (productId, updatedData) => {
    try {
        const productDoc = doc(db, "products", productId);
        await updateDoc(productDoc, updatedData);
        console.log("Product updated successfully!");
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

// Delete a product
export const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      console.log("Product deleted successfully:", productId);
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error; // Re-throw the error to handle it in the calling component
    }
  };

// Fetch all ads
export const fetchAds = async () => {
    try {
        const adsCollection = collection(db, "ads");
        const snapshot = await getDocs(adsCollection);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching ads:", error);
        throw error;
    }
};

// Add a new ad
export const addAd = async (adData) => {
    try {
        const adsCollection = collection(db, "ads");
        await addDoc(adsCollection, adData);
        console.log("Ad added successfully!");
    } catch (error) {
        console.error("Error adding ad:", error);
        throw error;
    }
};

// Update an ad
export const updateAd = async (adId, updatedData) => {
    try {
        const adDoc = doc(db, "ads", adId);
        await updateDoc(adDoc, updatedData);
        console.log("Ad updated successfully!");
    } catch (error) {
        console.error("Error updating ad:", error);
        throw error;
    }
};

// Delete an ad
export const deleteAd = async (adId) => {
    try {
        const adDoc = doc(db, "ads", adId);
        await deleteDoc(adDoc);
        console.log("Ad deleted successfully!");
    } catch (error) {
        console.error("Error deleting ad:", error);
        throw error;
    }
};

// Fetch a single ad by ID
export const fetchAdById = async (adId) => {
    try {
        const adDocRef = doc(db, "ads", adId);
        const adSnapshot = await getDoc(adDocRef);
        if (adSnapshot.exists()) {
            return { id: adSnapshot.id, ...adSnapshot.data() };
        } else {
            console.error("Ad not found");
            return null;
        }
    } catch (error) {
        console.error("Error fetching ad by ID:", error);
        throw error;
    }
};



// Fetch all news articles
export const fetchNews = async () => {
    try {
        const newsCollection = collection(db, "news");
        const snapshot = await getDocs(newsCollection);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching news:", error);
        throw error;
    }
};

// Add a new news article
export const addNews = async (newsData) => {
    try {
        const newsCollection = collection(db, "news");
        await addDoc(newsCollection, newsData);
        console.log("News article added successfully!");
    } catch (error) {
        console.error("Error adding news article:", error);
        throw error;
    }
};

// Delete a news article
export const deleteNews = async (newsId) => {
    try {
        const newsDoc = doc(db, "news", newsId);
        await deleteDoc(newsDoc);
        console.log("News article deleted successfully!");
    } catch (error) {
        console.error("Error deleting news article:", error);
        throw error;
    }
};





/**
 * Get the total number of users in Firestore.
 * @returns {number} Total number of users.
 */
export const getTotalUsers = async () => {
    try {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        return snapshot.size; // Return the total number of documents in the collection
    } catch (error) {
        console.error("Error getting total users:", error);
        throw error;
    }
};

/**
 * Get the total number of products in Firestore.
 * @returns {number} Total number of products.
 */
export const getTotalProducts = async () => {
    try {
        const productsCollection = collection(db, "products");
        const snapshot = await getDocs(productsCollection);
        return snapshot.size; // Return the total number of documents in the collection
    } catch (error) {
        console.error("Error getting total products:", error);
        throw error;
    }
};

/**
 * Get the total number of active ads in Firestore.
 * An ad is considered active if the current date falls between its start and end dates.
 * @returns {number} Total number of active ads.
 */
export const getTotalActiveAds = async () => {
    try {
        const adsCollection = collection(db, "ads");
        const snapshot = await getDocs(adsCollection);
        const now = new Date();

        // Filter ads that are active based on their startDate and endDate
        const activeAdsCount = snapshot.docs.filter((doc) => {
            const adData = doc.data();
            const startDate = new Date(adData.startDate);
            const endDate = new Date(adData.endDate);
            return now >= startDate && now <= endDate;
        }).length;

        return activeAdsCount;
    } catch (error) {
        console.error("Error getting total active ads:", error);
        throw error;
    }
};




/**
 * Fetch all products and group them by category.
 * @returns {Array} An array of objects with category names and product counts.
 */
export const getCategoryDistribution = async () => {
    try {
        const productsCollection = collection(db, "products");
        const snapshot = await getDocs(productsCollection);

        // Group products by category
        const categoryMap = {};
        snapshot.docs.forEach((doc) => {
            const product = doc.data();
            const category = product.category || "Uncategorized";

            if (categoryMap[category]) {
                categoryMap[category] += 1; // Increment count for the category
            } else {
                categoryMap[category] = 1; // Initialize count for the category
            }
        });

        // Convert the map into an array of objects
        return Object.keys(categoryMap).map((category) => ({
            name: category,
            value: categoryMap[category],
        }));
    } catch (error) {
        console.error("Error fetching category distribution:", error);
        throw error;
    }
};



/**
 * Utility functions for interacting with the backend API
 */

const API_BASE_URL = "http://localhost:5000/api"; // Update with your deployed API URL

export const fetchUsersApi = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) throw new Error("Failed to fetch users.");
        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const fetchProductsApi = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error("Failed to fetch products.");
        return await response.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const fetchAdsApi = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/ads`);
        if (!response.ok) throw new Error("Failed to fetch ads.");
        return await response.json();
    } catch (error) {
        console.error("Error fetching ads:", error);
        throw error;
    }
};



// // Fetch all categories from Firestore
// export const fetchCategories = async () => {
//   try {
//     const categoriesCollection = collection(db, "categories");
//     const snapshot = await getDocs(categoriesCollection);
//     return snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     throw error;
//   }
// };

// // Add a new category to Firestore
// export const addCategory = async (name) => {
//   try {
//     const categoriesCollection = collection(db, "categories");
//     await addDoc(categoriesCollection, { name, subcategories: [] });
//     console.log("Category added successfully!");
//   } catch (error) {
//     console.error("Error adding category:", error);
//     throw error;
//   }
// };

// // Add a new subcategory to an existing category in Firestore
// export const addSubcategory = async (categoryId, subcategoryName) => {
//     try {
//       const categoryDoc = doc(db, "categories", categoryId); // Reference the category document
//       const categorySnapshot = await getDoc(categoryDoc);
//       if (!categorySnapshot.exists()) {
//         throw new Error("Category not found.");
//       }
  
//       const currentSubcategories = categorySnapshot.data().subcategories || [];
//       const updatedSubcategories = [...currentSubcategories, subcategoryName];
  
//       await updateDoc(categoryDoc, {
//         subcategories: updatedSubcategories,
//       });
//       console.log("Subcategory added successfully!");
//     } catch (error) {
//       console.error("Error adding subcategory:", error);
//       throw error;
//     }
//   };

export const fetchCategories = async () => {
    try {
      const categoriesCollection = collection(db, "categories");
      const snapshot = await getDocs(categoriesCollection);
      const categories = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      // Deduplicate categories based on name
      const uniqueCategories = Array.from(
        categories.reduce((set, category) => set.add(category.name), new Set())
      ).map((name) => {
        return categories.find((cat) => cat.name === name);
      });
  
      return uniqueCategories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  export const addSubcategory = async (categoryId, subcategoryName) => {
    try {
      const categoryDoc = doc(db, "categories", categoryId); // Reference the category document
      const categorySnapshot = await getDoc(categoryDoc);
      if (!categorySnapshot.exists()) {
        throw new Error("Category not found.");
      }
  
      const currentSubcategories = categorySnapshot.data().subcategories || [];
      const updatedSubcategories = [...currentSubcategories, subcategoryName];
      await updateDoc(categoryDoc, {
        subcategories: updatedSubcategories,
      });
  
      // Refresh the categories state after updating Firestore
      const categories = await fetchCategories();
      return categories; // Return the updated categories
    } catch (error) {
      console.error("Error adding subcategory:", error);
      throw error;
    }
  };

//   export const addSubcategory = async (categoryId, subcategoryName) => {
//     try {
//       const categoryDoc = doc(db, "categories", categoryId); // Reference the category document
//       const categorySnapshot = await getDoc(categoryDoc);
//       if (!categorySnapshot.exists()) {
//         throw new Error("Category not found.");
//       }
  
//       const currentSubcategories = categorySnapshot.data().subcategories || [];
//       const updatedSubcategories = [...currentSubcategories, subcategoryName];
//       await updateDoc(categoryDoc, {
//         subcategories: updatedSubcategories,
//       });
  
//       // Refresh the categories state after updating Firestore
//       const categories = await fetchCategories();
//       return categories; // Return the updated categories
//     } catch (error) {
//       console.error("Error adding subcategory:", error);
//       throw error;
//     }
//   };