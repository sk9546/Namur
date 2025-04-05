// src/pages/SettingsPage.jsx
import Header from "../components/common/Header";
import ConnectedAccounts from "../components/settings/ConnectedAccounts";
import DangerZone from "../components/settings/DangerZone";
import Notifications from "../components/settings/Notifications";
import Profile from "../components/settings/Profile";
import Security from "../components/settings/Security";
import GoogleAuthButton from "../components/common/GoogleAuthButton"; // Import the GoogleAuthButton

const SettingsPage = () => {
    return (
        <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
            <Header title="Settings" />
            <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
                <Profile />
                <Notifications />
                <Security />
                <ConnectedAccounts />
                <DangerZone />
                {/* Add the GoogleAuthButton */}
                <GoogleAuthButton />
            </main>
        </div>
    );
};

export default SettingsPage;