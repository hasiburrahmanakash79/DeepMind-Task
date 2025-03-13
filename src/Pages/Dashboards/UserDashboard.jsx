// import React from 'react';

import { Link } from "react-router-dom";

const UserDashboard = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
            <p className="mb-6">Welcome to your dashboard!</p>
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-2">Profile</h2>
                <p>View and edit your profile information.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-2">Settings</h2>
                <p>Manage your account settings.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-10">
                <h2 className="text-2xl font-semibold mb-2">Notifications</h2>
                <p>Check your recent notifications.</p>
            </div>
            <Link to='/' className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Back to Home
            </Link>
        </div>
    );
};

export default UserDashboard;