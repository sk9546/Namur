



import { Link } from "react-router-dom";

const UsersTable = ({ users, onDelete }) => {
  // Fallback message for when there are no users
  const fallbackMessage = (
    <tr>
      <td colSpan="9" className="py-12 text-center">
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-16 h-16 text-gray-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-400 mb-1">
            No users found
          </h3>
          <p className="text-gray-500 max-w-md">
            Start by adding your first user to see them appear here.
          </p>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900/80">
            <tr>
              {[
                "Name",
               
                "Address",
                "Phone No.",
                "Land Details",
                "Crop Details",
                "I Have",
                "KYC",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-700/30 transition-colors duration-150"
                >
                  {/* Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                        <span className="text-gray-300 font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="text-gray-100 font-medium min-w-0">
                        <div className="truncate max-w-[180px]">{user.name}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  {/* <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "Seller"
                          ? "bg-blue-900/50 text-blue-300"
                          : "bg-green-900/50 text-green-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td> */}

                  {/* Address */}
                  <td className="px-6 py-4 min-w-[200px] max-w-[250px]">
                    <div className="text-gray-300 break-words">
                      {user.address || (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </div>
                  </td>

                  {/* Phone No. */}
                  <td className="px-6 py-4 min-w-[120px]">
                    <div className="text-gray-300 break-all">
                      {user.phone || <span className="text-gray-500">N/A</span>}
                    </div>
                  </td>

                  {/* Land Details */}
                  <td className="px-6 py-4 min-w-[150px] max-w-[200px]">
                    <div className="text-gray-300 break-words">
                      {user.land || <span className="text-gray-500">N/A</span>}
                    </div>
                  </td>

                  {/* Crop Details */}
                  <td className="px-6 py-4 min-w-[150px] max-w-[200px]">
                    <div className="text-gray-300 break-words">
                      {user.Crop || <span className="text-gray-500">N/A</span>}
                    </div>
                  </td>

                  {/* I Have */}
                  <td className="px-6 py-4 min-w-[150px] max-w-[200px]">
                    <div className="text-gray-300 break-words">
                      {user["I have"] || (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </div>
                  </td>

                  {/* KYC */}
                  <td className="px-6 py-4">
                    {user.KYC === "Yes" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                        <svg
                          className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx={4} cy={4} r={3} />
                        </svg>
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-400">
                        <svg
                          className="-ml-0.5 mr-1.5 h-2 w-2 text-red-400"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx={4} cy={4} r={3} />
                        </svg>
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`/edit-user/${user.id}`}
                        className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center"
                        title="Edit"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        Edit
                      </Link>
                      <button
                        className="text-red-400 hover:text-red-300 transition-colors flex items-center"
                        onClick={() => onDelete(user.id)}
                        title="Delete"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              fallbackMessage
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;