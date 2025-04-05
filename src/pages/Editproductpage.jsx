// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchProductById, updateProduct } from "../firebase/firebaseUtils";
// import ProductForm from "../components/products/AddProductForm";

// const EditProductPage = () => {
//     const { productId } = useParams();
//     console.log(productId)
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const productData = await fetchProductById(productId);
//                 console.log(productData)
//                 setProduct(productData);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching product:", error);
//                 setLoading(false);
//             }
//         };
//         fetchProduct();
//     }, [productId]);

//     const handleUpdateProduct = async (updatedData) => {
//         try {
//             await updateProduct(productId, updatedData);
//             navigate("/products");
//         } catch (error) {
//             console.error("Error updating product:", error);
//         }
//     };

//     if (loading) {
//         return <p className="text-gray-400 text-center">Loading...</p>;
//     }

//     return (
//         <div className="flex-1 overflow-auto relative z-10 p-6">
//             <h1 className="text-3xl font-bold text-gray-100 mb-8">Edit Product</h1>
//             <ProductForm initialData={product} onSubmit={handleUpdateProduct} />
//             {console.log(product)}
//         </div>
//     );
// };

// export default EditProductPage;


// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchProductById, updateProduct } from "../firebase/firebaseUtils";
// import ProductForm from "../components/products/AddProductForm";

// const EditProductPage = () => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const productData = await fetchProductById(productId);
//                 if (!productData) {
//                     console.error("Product not found");
//                     setLoading(false);
//                     return;
//                 }
//                 setProduct(productData);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching product:", error);
//                 setLoading(false);
//             }
//         };
//         fetchProduct();
//     }, [productId]);

//     const handleUpdateProduct = async (updatedData) => {
//         try {
//             await updateProduct(productId, updatedData);
//             setMessage("Product updated successfully!");
//             setTimeout(() => navigate("/products"), 1000);
//         } catch (error) {
//             console.error("Error updating product:", error);
//             setMessage("Failed to update product. Please try again.");
//         }
//     };

//     if (loading) {
//         return <p className="text-gray-400 text-center">Loading...</p>;
//     }

//     if (!product) {
//         return <p className="text-red-400 text-center">Product not found.</p>;
//     }

//     return (
//         <div className="flex-1 overflow-auto relative z-10 p-6">
//             <h1 className="text-3xl font-bold text-gray-100 mb-8">Edit Product</h1>
//             {message && (
//                 <p className={`text-center ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
//                     {message}
//                 </p>
//             )}
//             <ProductForm initialData={product} onSubmit={handleUpdateProduct} />
//         </div>
//     );
// };

// export default EditProductPage;





// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchProductById, updateProduct } from "../firebase/firebaseUtils";
// import ProductForm from "../components/products/AddProductForm";

// const EditProductPage = () => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 console.log("Fetching product with ID:", productId);
//                 const productData = await fetchProductById(productId);
//                 console.log("Fetched product data:", productData);
//                 if (!productData) {
//                     console.error("Product not found");
//                     setLoading(false);
//                     return;
//                 }
//                 setProduct(productData);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching product:", error);
//                 setLoading(false);
//             }
//         };
//         fetchProduct();
//     }, [productId]);

//     const handleUpdateProduct = async (updatedData) => {
//         try {
//             console.log("Updating product with data:", updatedData);
//             await updateProduct(productId, updatedData);
//             setMessage("Product updated successfully!");
//             setTimeout(() => navigate("/products"), 1000);
//         } catch (error) {
//             console.error("Error updating product:", error);
//             setMessage("Failed to update product. Please try again.");
//         }
//     };

//     if (loading) {
//         return <p className="text-gray-400 text-center">Loading...</p>;
//     }

//     if (!product) {
//         return <p className="text-red-400 text-center">Product not found.</p>;
//     }

//     return (
//         <div className="flex-1 overflow-auto relative z-10 p-6">
//             <h1 className="text-3xl font-bold text-gray-100 mb-8">Edit Product</h1>
//             {message && (
//                 <p className={`text-center ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
//                     {message}
//                 </p>
//             )}
//             <ProductForm initialData={product} onSubmit={handleUpdateProduct} />
//         </div>
//     );
// };

// export default EditProductPage;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById, updateProduct } from "../firebase/firebaseUtils";
import ProductForm from "../components/products/AddProductForm";

const EditProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (!productId) {
                    console.error("Invalid product ID");
                    return;
                }
                const productData = await fetchProductById(productId);
                if (!productData) {
                    console.error("Product not found");
                    setLoading(false);
                    return;
                }
                setProduct(productData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleUpdateProduct = async (updatedData) => {
        try {
            await updateProduct(productId, updatedData);
            setMessage("Product updated successfully!");
            setTimeout(() => navigate("/products"), 1000);
        } catch (error) {
            console.error("Error updating product:", error);
            setMessage("Failed to update product. Please try again.");
        }
    };

    if (loading) {
        return <p className="text-gray-400 text-center">Loading...</p>;
    }

    if (!product) {
        return <p className="text-red-400 text-center">Product not found.</p>;
    }

    return (
        <div className="flex-1 overflow-auto relative z-10 p-6">
            <h1 className="text-3xl font-bold text-gray-100 mb-8">Edit Product</h1>
            {message && (
                <p className={`text-center ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
                    {message}
                </p>
            )}
            <ProductForm initialData={product} onSubmit={handleUpdateProduct} />
        </div>
    );
};

export default EditProductPage;