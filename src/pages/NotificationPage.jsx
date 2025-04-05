import React, { useState, useEffect } from "react";
import {
  db,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "../firebase/firebase";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newNotificationText, setNewNotificationText] = useState("");
  const [editNotificationText, setEditNotificationText] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notifications"));
        const fetchedNotifications = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sort by timestamp (newest first)
        fetchedNotifications.sort((a, b) => 
          new Date(b.timestamp?.toDate?.() || b.timestamp) - 
          new Date(a.timestamp?.toDate?.() || a.timestamp)
        );
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleAddNotification = async (e) => {
    e.preventDefault();
    if (!newNotificationText.trim()) return;
    
    try {
      setIsLoading(true);
      const newNotification = {
        text: newNotificationText,
        timestamp: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, "notifications"), newNotification);
      
      // Update local state with the new notification
      setNotifications([{
        id: docRef.id,
        text: newNotificationText,
        timestamp: new Date().toISOString(), // Temporary client timestamp
      }, ...notifications]);
      
      setNewNotificationText("");
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding notification:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateNotification = async (e) => {
    e.preventDefault();
    if (!editNotificationText.trim() || !editingNotification) return;
    
    try {
      setIsLoading(true);
      await updateDoc(doc(db, "notifications", editingNotification.id), {
        text: editNotificationText,
        timestamp: serverTimestamp(),
      });
      
      // Update local state
      setNotifications(notifications.map(notification => 
        notification.id === editingNotification.id 
          ? { ...notification, text: editNotificationText, timestamp: new Date().toISOString() }
          : notification
      ));
      
      setEditingNotification(null);
      setEditNotificationText("");
    } catch (error) {
      console.error("Error updating notification:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNotification = async (id) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      try {
        setIsLoading(true);
        await deleteDoc(doc(db, "notifications", id));
        setNotifications(notifications.filter(notification => notification.id !== id));
      } catch (error) {
        console.error("Error deleting notification:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'No date available';
    
    try {
      // Firebase timestamps need to be converted to Date objects
      const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleString();
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center">
            <div className="bg-indigo-900/50 p-3 rounded-xl mr-4 border border-indigo-700/50">
              <svg
                className="w-8 h-8 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-100">Notifications</h1>
              <p className="text-gray-400">
                {notifications.length} notification{notifications.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Notification
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {/* Notifications List */}
        {!isLoading && (
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center py-16 rounded-xl bg-gray-800/50 border-2 border-dashed border-gray-700">
                <div className="text-gray-500 text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  No notifications yet
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Click the "Add Notification" button to create your first notification
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="group relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-700 hover:border-gray-600"
                >
                  <div className="flex justify-between items-start">
                    <div className="pr-4 flex-1">
                      <p className="text-gray-100 text-lg font-medium leading-relaxed">
                        {notification.text}
                      </p>
                      <time className="text-sm text-gray-400 mt-2 block">
                        {formatDate(notification.timestamp)}
                      </time>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingNotification(notification);
                          setEditNotificationText(notification.text);
                        }}
                        className="p-2 hover:bg-indigo-900/30 rounded-lg text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                        title="Edit"
                      >
                        <svg
                          className="w-5 h-5"
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
                      </button>
                      <button
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="p-2 hover:bg-red-900/30 rounded-lg text-red-400 hover:text-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/30"
                        title="Delete"
                      >
                        <svg
                          className="w-5 h-5"
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
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Add Notification Modal */}
        {isAdding && (
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-100">
                    <span className="text-indigo-400 mr-2">📝</span>
                    Add Notification
                  </h3>
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      setNewNotificationText("");
                    }}
                    className="text-gray-400 hover:text-gray-300 transition-colors focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleAddNotification}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Notification Message
                    </label>
                    <textarea
                      value={newNotificationText}
                      onChange={(e) => setNewNotificationText(e.target.value)}
                      required
                      placeholder="Enter your notification message here..."
                      className="w-full px-4 py-3 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none placeholder-gray-500 resize-none"
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdding(false);
                        setNewNotificationText("");
                      }}
                      className="px-5 py-2.5 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/30"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Adding...
                        </>
                      ) : (
                        "Add Notification"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Notification Modal */}
        {editingNotification && (
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-100">
                    <span className="text-yellow-400 mr-2">✏️</span>
                    Edit Notification
                  </h3>
                  <button
                    onClick={() => {
                      setEditingNotification(null);
                      setEditNotificationText("");
                    }}
                    className="text-gray-400 hover:text-gray-300 transition-colors focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleUpdateNotification}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Notification Message
                    </label>
                    <textarea
                      value={editNotificationText}
                      onChange={(e) => setEditNotificationText(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none placeholder-gray-500 resize-none"
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingNotification(null);
                        setEditNotificationText("");
                      }}
                      className="px-5 py-2.5 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/30"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;