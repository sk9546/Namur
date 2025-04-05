import React from "react";

const DataTable = ({ data, type }) => {
    // Define columns based on the type of data being displayed
    const columns = {
        users: ["Name", "Email", "Phone", "Role", "Status"],
        products: ["Category", "Product", "Subcategory"],
        ads: ["Title", "Description", "Price", "Start Date", "End Date"]
    };

    return (
        <div>
            {/* Display the section title */}
            <h2 className="text-xl font-medium text-gray-200 mb-4">
                {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalize the type */}
            </h2>

            {/* Handle empty data */}
            {data.length === 0 ? (
                <p className="text-gray-400">No {type} found.</p>
            ) : (
                <table className="min-w-full divide-y divide-gray-700">
                    {/* Table Header */}
                    <thead>
                        <tr>
                            {columns[type].map((col, index) => (
                                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-gray-700">
                        {data.map((item) => (
                            <tr key={item.id}>
                                {columns[type].map((col, index) => {
                                    // Map column names to Firestore field names
                                    const fieldMappings = {
                                        users: {
                                            Name: item.name || "N/A",
                                            Email: item.email || "N/A",
                                            Phone: item.phone || "N/A",
                                            Role: item.role || "N/A",
                                            Status: item.status || "N/A"
                                        },
                                        products: {
                                            Category: item.category || "N/A",
                                            Product: item.product || "N/A",
                                            Subcategory: item.subcategory || "N/A"
                                        },
                                        ads: {
                                            Title: item.title || "N/A",
                                            Description: item.description || "N/A",
                                            Price: item.price || "N/A",
                                            "Start Date": item.startDate || "N/A",
                                            "End Date": item.endDate || "N/A"
                                        }
                                    };

                                    // Render the corresponding field value
                                    return (
                                        <td key={index} className="px-6 py-4 whitespace-nowrap">
                                            {fieldMappings[type][col] || "N/A"}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DataTable;