import React from "react";

const RightHeading: React.FC = () => {
  return (
    <div className="w-full text-center lg:text-left">
      <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-snug">
        Why Hire <br />
        From <span className="text-blue-600">RCNV Portal?</span>
      </h2>
      <div className="flex justify-end">
        <p className="mt-4 text-gray-700 text-right lg:text-lg max-w-sm">
          Post your Intern requirements and build your dream team with ease.
        </p>
      </div>
    </div>
  );
};

export default RightHeading;
