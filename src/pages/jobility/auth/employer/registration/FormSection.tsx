import EmployerRegistrationForm from "../../../../../components/register/EmployerRegistrationForm.tsx";
import HeadingSection from "./HeadingSection.tsx";
import ImageSection from "./ImageSection.tsx";
import React from "react";

const FormSection: React.FC = () => {
  return (
    <div className="container mx-auto lg:px-30 ">
      {/* Top HeadingSection Section */}
      <HeadingSection />

      {/* Bottom: Image and Form Row */}
      <div className="flex flex-col lg:flex-row items-start justify-between">
        {/* Image Section */}
        <ImageSection />

        {/* Form Section */}
        <div className="w-full lg:w-[40%] lg:-mt-5 bg-white p-6">
          <EmployerRegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default FormSection;
