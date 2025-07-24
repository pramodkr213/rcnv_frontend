import { BASE_URL } from "../../api/AxiosInstance.ts";
import React from "react";
import { motion } from "framer-motion";

export const HeroSection: React.FC = () => {
  const handleGoogleClick = (): void => {
    window.location.href = `${BASE_URL}oauth2/authorization/google`;
  };

  return (
    <section className="container py-2 px-2 mx-auto xl:px-30 bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        {/* Left Content */}
        <motion.div
          className="flex font-bold flex-col gap-6 justify-center items-start w-full lg:w-[50%]"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-5xl xl:text-6xl gap-5 flex flex-col">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Unlock Your
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Potential with
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Online Training
            </motion.span>
          </h1>
          <motion.p
            className="text-2xl font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            For fresher jobs, internship and courses
          </motion.p>
          <motion.button
            onClick={handleGoogleClick}
            className="bg-[#0754AE] cursor-pointer font-medium text-white px-8 py-3 flex justify-center items-center gap-2 transition"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img className="w-6" src={"/google_logo.png"} alt="Google" />
            <span>Continue with Google</span>
          </motion.button>
        </motion.div>

        {/* Right Image with Background Circle */}
        <motion.div
          className="relative mt-10 lg:mt-0 w-full lg:w-[50%] flex justify-center items-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="absolute top-12 -left-5 sm:left-20 md:left-35 lg:-left-10 xl:left-0 2xl:left-10 w-80 h-80 lg:w-[25rem] lg:h-[25rem] bg-blue-100 rounded-full z-0" />

          <motion.div
            className="absolute top-8 right-6 sm:right-30 md:right-50 lg:right-5 xl:right-16 2xl:right-30 w-10 h-10 bg-blue-600 rounded-full z-0"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.img
            src="/main_image.png"
            className="relative z-10 h-[30rem] object-contain select-none"
            draggable={false}
            alt="Hero"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          />
        </motion.div>
      </div>
    </section>
  );
};
