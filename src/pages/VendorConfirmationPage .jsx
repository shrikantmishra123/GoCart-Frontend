import React from "react";
import { Link } from "react-router-dom";

const VendorConfirmationPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-green-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          🎉 Thank You for Joining GoCart!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Your vendor registration request has been successfully submitted. Our team will review it and get back to you soon.
        </p>

        {/* Request Status Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            📝 Request Status:
          </h3>
          <div className="flex items-center justify-center">
            <div className="w-2/3 bg-gray-300 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "50%" }}></div>
            </div>
            <p className="ml-4 text-gray-600">Under Review</p>
          </div>
        </div>

        {/* Email and SMS Notifications */}
        <div className="mb-6 text-left">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            📧 Email & 📱 SMS Notifications:
          </h3>
          <p className="text-gray-600">
            - A confirmation email has been sent to your registered email address.
          </p>
          <p className="text-gray-600">
            - You will also receive an SMS once your request is under review or approved.
          </p>
        </div>

        {/* Live Updates Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            ⏳ Track Your Request:
          </h3>
          <p className="text-gray-600 mb-4">
            You can track the status of your request directly in the Vendor Dashboard. Click below to check your request status and manage your account.
          </p>
          <Link
            to="/vendordashboard"
            className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Go to Vendor Dashboard
          </Link>
        </div>

        {/* Back to Home Button */}
        <div className="mt-6">
          <Link
            to="/home"
            className="bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorConfirmationPage;
