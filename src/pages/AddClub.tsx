import React from "react";
import { motion } from "framer-motion";
import AddClubForm from "../components/AddClubForm";
import AddClubTable from "../components/AddClubTable";

const AddClub: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8">
      {/* Form Section */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-10 max-w-sm h-fit flex flex-col justify-center"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6">Add Club</h2>
        <AddClubForm />
      </motion.div>
      {/* Table Section */}
      <AddClubTable />
    </div>
  );
};

export default AddClub;
