import React from "react";
import { motion } from "framer-motion";
import AddProjectForm from "../components/AddProjectForm";

const AddProject: React.FC = () => {
  return (
    <div className="p-4">
      {/* Form Section */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-10 max-w-7xl h-fit flex flex-col justify-center"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6">Add Project</h2>
        <AddProjectForm />
      </motion.div>
    </div>
  );
};

export default AddProject;
