import { motion } from "framer-motion";
import MediaImageTable from "../components/MediaImageTable";
import MediaImageForm from "../components/MediaImageForm";
import UpcminfEvnTable from "./UpcominfEvnTable";
import UpcomingEventForm from "./upcomingEventForm";
const AddUpcomingEvents: React.FC = () => {
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
          Add Upcoming Events
        </h2>
        <UpcomingEventForm />
      </motion.div>
      {/* Table Section */}
      <UpcminfEvnTable />
    </div>
  );
};

export default AddUpcomingEvents;