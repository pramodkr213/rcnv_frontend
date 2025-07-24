import React from "react";
import { motion } from "framer-motion";
import AddSponsorsForm from "../components/AddSponsorsForm";
import AddSponsorsTable from "../components/AddSponsorsTable";

const AddSponsors: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8">
      {/* Form Section */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-10 max-w-sm h-fit flex flex-col justify-center"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Add Sponsors
        </h2>
        <AddSponsorsForm />
      </motion.div>
      {/* Table Section */}
      <AddSponsorsTable />
    </div>
  );
};

export default AddSponsors;
