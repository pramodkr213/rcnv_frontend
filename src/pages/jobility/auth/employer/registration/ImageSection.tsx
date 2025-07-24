import React from "react";

const ImageSection:React.FC = () => {
  return <div className="w-full -mt-8 ml-5 flex items-center justify-center lg:w-1/2">
      <img
          src="/register_employer.png"
          alt="Register Employer"
          className="w-96 h-auto object-contain"
      />
  </div>;
};

export default ImageSection;