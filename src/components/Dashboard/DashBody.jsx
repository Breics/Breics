import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaIdCard } from "react-icons/fa";
import { motion } from "framer-motion";

const DashBody = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    isVerified: false,
    accountType: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.warn("User ID or token not found in localStorage.");
      return;
    }

    axios
      .get(`https://breics-backend.onrender.com/api/landlords/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const landlord = res.data.data.landlord;
        setUserData({
          firstName: landlord.firstName || "",
          isVerified: landlord.verificationStatus?.isVerified || false,
          accountType: landlord.accountType || "",
        });
      })
      .catch((err) => {
        console.error(
          "Failed to fetch user data in DashBody:",
          err.response?.data || err.message
        );
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-900">
      <motion.h2
        className="text-2xl md:text-3xl font-semibold mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hello {userData.firstName},
      </motion.h2>

      <motion.p
        className="text-gray-600 mb-8 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Welcome to Breics. Kindly complete your account setup...
      </motion.p>

      {!userData.isVerified && (
        <motion.div
          className="flex flex-col md:flex-row gap-4 md:gap-6 bg-orange-50 p-5 rounded-lg shadow border border-orange-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="mt-1">
            <FaIdCard size={24} className="text-orange-500" />
          </div>

          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900">
              Complete account verification
            </h4>
            <p className="text-sm text-gray-600">
              As an intending landlord, you need to verify your account...
            </p>
          </div>

          <div className="self-start md:self-center">
            <a
              href="/verify-account"
              className="text-sm font-medium text-orange-500 hover:underline transition"
            >
              Verify account
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DashBody;
