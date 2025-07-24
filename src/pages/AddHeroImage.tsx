import { motion } from "framer-motion";
import HeroImageForm from "../components/HeroImageForm";
import HeroImageTable from "../components/HeroImageTable";

const AddHeroImage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8">
      {/* Form Section */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl h-fit p-10 max-w-sm flex flex-col justify-center"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Add Hero Image
        </h2>
        <HeroImageForm />
      </motion.div>
      {/* Table Section */}
      <HeroImageTable />
    </div>
  );
};

export default AddHeroImage;
