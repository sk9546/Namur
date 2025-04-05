import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import UsersPage from "./pages/UsersPage";
import NewsPage from "./pages/NewsPage";
import AddNewsPage from "./pages/AddNewsPage";
import SettingsPage from "./pages/SettingsPage";
import Adduserpage from "./pages/Adduserpage";
import Edituserpage from "./pages/Edituserpage";
import AddProductPage from "./pages/Addproductpage";
import EditProductPage from "./pages/Editproductpage";
import ProductsPage from "./pages/Productspage";
import AddAdPage from "./pages/AddAdPage";
import EditAdPage from "./pages/EditAdPage";
import AdsPage from "./pages/AdsPage";
import NotificationPage from "./pages/NotificationPage";
import { CategoryProvider } from "./context/CategoryContext";
import CategoriesPage from "./pages/CategoriesPage";
import PrivacyPolicy from "./pages/privacypolicypage";
import SubcategoryPage from "./pages/SubCategoryPage";

import OneSignal from 'react-onesignal';
import SellerBuyerPage from "./pages/SellerBuyerPage";

function App() {

  

  
  return (
    <CategoryProvider>
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-y-auto">
        {/* Background Styling */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="relative z-10 flex-grow overflow-y-auto">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/edit-product/:productId" element={<EditProductPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/adduser" element={<Adduserpage />} />
            <Route path="/edit-user/:id" element={<Edituserpage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/add-news" element={<AddNewsPage />} />
            <Route path="/ads" element={<AdsPage />} />
            <Route path="/add-ad" element={<AddAdPage />} />
            <Route path="/edit-ad/:id" element={<EditAdPage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/subcategories/:categoryId" element={<SubcategoryPage/>}/>
            <Route path="/sellerbuyer" element={<SellerBuyerPage/>}/>
          </Routes>
        </div>
      </div>
    </CategoryProvider>
    
  );
}

export default App;