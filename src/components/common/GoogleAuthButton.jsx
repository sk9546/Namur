// src/components/common/GoogleAuthButton.jsx
import { useState, useEffect } from "react";
import { auth, googleProvider } from "../../firebase/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

const GoogleAuthButton = () => {
    const [user, setUser] = useState(null);

    // Check if a user is already logged in
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Handle Google Sign-In
    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            console.log("User signed in successfully!");
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    // Handle Logout
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully!");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="flex justify-center my-6">
            {user ? (
                <button
                    onClick={handleSignOut}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                    Logout
                </button>
            ) : (
                <button
                    onClick={handleSignIn}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                    Login with Google
                </button>
            )}
        </div>
    );
};

export default GoogleAuthButton;