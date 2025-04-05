// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { fetchProducts, deleteProduct } from "../firebase/firebaseUtils";
// // import ProductsTable from "../components/products/ProductTable";

// // const ProductsPage = () => {
// //     const [products, setProducts] = useState([]);
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //         const loadProducts = async () => {
// //             try {
// //                 const fetchedProducts = await fetchProducts();
// //                 setProducts(fetchedProducts);
// //                 setLoading(false);
// //             } catch (error) {
// //                 console.error("Error fetching products:", error);
// //                 setLoading(false);
// //             }
// //         };
// //         loadProducts();
// //     }, []);

// //     const handleDelete = async (productId) => {
// //         if (window.confirm("Are you sure you want to delete this product?")) {
// //             try {
// //                 await deleteProduct(productId); // Delete product from Firestore
// //                 setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId)); // Update local state
// //             } catch (error) {
// //                 console.error("Error deleting product:", error);
// //             }
// //         }
// //     };

// //     if (loading) {
// //         return <p className="text-gray-400 text-center">Loading...</p>;
// //     }

// //     return (
// //         <div className="flex-1 overflow-auto relative z-10 p-6">
// //             <div className="flex justify-between items-center mb-6">
// //                 <h1 className="text-3xl font-bold text-gray-100">Manage Products</h1>
// //                 <Link
// //                     to="/add-product"
// //                     className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
// //                 >
// //                     Add Product
// //                 </Link>
// //             </div>
// //             <ProductsTable products={products} onDelete={handleDelete} />
// //         </div>
// //     );
// // };

// // export default ProductsPage;




// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { fetchProducts, deleteProduct } from "../firebase/firebaseUtils";
// // import ProductsTable from "../components/products/ProductTable";

// // const ProductsPage = () => {
// //     const [products, setProducts] = useState([]);
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //         const loadProducts = async () => {
// //             try {
// //                 const fetchedProducts = await fetchProducts();
// //                 setProducts(fetchedProducts);
// //                 setLoading(false);
// //             } catch (error) {
// //                 console.error("Error fetching products:", error);
// //                 setLoading(false);
// //             }
// //         };
// //         loadProducts();
// //     }, []);

// //     const handleDelete = async (productId) => {
// //         if (window.confirm("Are you sure you want to delete this product?")) {
// //             try {
// //                 await deleteProduct(productId); // Delete product from Firestore
// //                 setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId)); // Update local state
// //             } catch (error) {
// //                 console.error("Error deleting product:", error);
// //             }
// //         }
// //     };

// //     if (loading) {
// //         return <p className="text-gray-400 text-center">Loading...</p>;
// //     }

// //     return (
// //         <div className="flex-1 overflow-auto relative z-10 p-6">
// //             <div className="flex justify-between items-center mb-6">
// //                 <h1 className="text-3xl font-bold text-gray-100">Manage Products</h1>
// //                 <Link
// //                     to="/add-product"
// //                     className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
// //                 >
// //                     Add Product
// //                 </Link>
// //             </div>
// //             <ProductsTable products={products} onDelete={handleDelete} />
// //         </div>
// //     );
// // };

// // export default ProductsPage;



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { fetchProducts, deleteProduct, fetchCategories, fetchSubcategories } from "../firebase/firebaseUtils";
// import ProductsTable from "../components/products/ProductTable";

// const ProductsPage = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState({}); // Category ID to name map
//   const [subcategories, setSubcategories] = useState({}); // Subcategory ID to name map
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const fetchedProducts = await fetchProducts();
//         setProducts(fetchedProducts);

//         const fetchedCategories = await fetchCategories();
//         const categoryMap = fetchedCategories.reduce((acc, cat) => {
//           acc[cat.id] = cat.name;
//           return acc;
//         }, {});
//         setCategories(categoryMap);

//         const fetchedSubcategories = await fetchSubcategories();
//         const subcategoryMap = fetchedSubcategories.reduce((acc, sub) => {
//           acc[sub.id] = sub.name;
//           return acc;
//         }, {});
//         setSubcategories(subcategoryMap);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   const handleDelete = async (productId) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await deleteProduct(productId);
//         setProducts((prev) => prev.filter((product) => product.id !== productId));
//       } catch (error) {
//         console.error("Error deleting product:", error);
//       }
//     }
//   };

//   if (loading) {
//     return <p className="text-gray-400 text-center">Loading...</p>;
//   }

//   return (
//     <div className="flex-1 overflow-auto relative z-10 p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-100">Manage Products</h1>
//         <Link
//           to="/add-product"
//           className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
//         >
//           Add Product
//         </Link>
//       </div>
//       <ProductsTable 
//         products={products} 
//         categories={categories} 
//         subcategories={subcategories} 
//         onDelete={handleDelete} 
//       />
//     </div>
//   );
// };

// export default ProductsPage;





import React, { useState, useEffect } from "react";
import { db, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "../firebase/firebase";
import ProductForm from "../components/products/AddProductForm";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [subcategories, setSubcategories] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories & subcategories
  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      try {
        const categorySnapshot = await getDocs(collection(db, "categories"));
        const categoryData = {};
        const subcategoryData = {};

        for (const docSnap of categorySnapshot.docs) {
          const categoryId = docSnap.id;
          categoryData[categoryId] = docSnap.data().name;

          const subcategorySnapshot = await getDocs(
            collection(db, `categories/${categoryId}/subcategories`)
          );
          subcategoryData[categoryId] = subcategorySnapshot.docs.reduce(
            (acc, subDoc) => ({ ...acc, [subDoc.id]: subDoc.data().name }),
            {}
          );
        }

        setCategories(categoryData);
        setSubcategories(subcategoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoriesAndSubcategories();
  }, []);

  // Handle Add or Update Product
  const handleSaveProduct = async (product) => {
    try {
      if (product.id) {
        // Update existing product
        await updateDoc(doc(db, "products", product.id), product);
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? product : p))
        );
      } else {
        // Add new product
        const docRef = await addDoc(collection(db, "products"), product);
        setProducts([...products, { id: docRef.id, ...product }]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // Handle Delete Product
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
    <h1 className="text-2xl font-bold mb-4">Product Management</h1>

    <button
      onClick={() => {
        setSelectedProduct(null);
        setIsModalOpen(true);
      }}
      className="bg-blue-500 px-4 py-2 rounded text-white mb-4"
    >
      Add Product
    </button>

    {/* Product Table */}
    <div className="overflow-x-auto">
      <table className="w-full bg-gray-800 rounded-lg">
        <thead>
          <tr className="bg-gray-700 text-left">
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Category</th>
            <th className="p-3">Subcategory</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-gray-700">
              <td className="p-3">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-700 rounded"></div>
                )}
              </td>
              <td className="p-3">{product.name}</td>
              <td className="p-3">{product.price}</td>
              <td className="p-3">{categories[product.category] || "N/A"}</td>
              <td className="p-3">
                {subcategories[product.category]?.[product.subcategory] || "N/A"}
              </td>
              <td className="p-3 flex space-x-2">
                <button
                  className="bg-green-500 px-3 py-1 rounded"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 px-3 py-1 rounded"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Product Form Modal (remains the same) */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-gray-800 p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">
            {selectedProduct ? "Edit Product" : "Add Product"}
          </h2>
          <ProductForm
            initialData={selectedProduct}
            onSubmit={handleSaveProduct}
          />
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 w-full bg-red-500 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

export default ProductPage;
