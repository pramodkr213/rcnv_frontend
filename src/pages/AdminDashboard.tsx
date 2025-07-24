import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaChartLine, FaCog } from "react-icons/fa";

const stats = [
  {
    label: "Total Users",
    value: 1245,
    icon: <FaUsers className="text-blue-500" />,
  },
  {
    label: "Active Sessions",
    value: 87,
    icon: <FaChartLine className="text-green-500" />,
  },
  {
    label: "Settings Changed",
    value: 32,
    icon: <FaCog className="text-purple-500" />,
  },
];

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold text-purple-700 mb-8"
      >
        Welcome, Admin!
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2 + idx * 0.15,
              duration: 0.6,
              type: "spring",
            }}
            className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center hover:scale-105 transition-transform"
          >
            <div className="text-4xl mb-4">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-gray-500 mt-2">{stat.label}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between"
      >
        <div>
          <div className="text-2xl font-semibold mb-2">System Status</div>
          <div className="text-lg">
            All systems are{" "}
            <span className="font-bold text-green-200">operational</span>.
          </div>
        </div>
        <div className="mt-6 md:mt-0">
          <button className="bg-white text-purple-600 font-bold px-6 py-3 rounded-xl shadow hover:bg-purple-100 transition">
            View Reports
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
