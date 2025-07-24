import React from "react";
import HiringCards from "./HiringCards.tsx";

const HiringSolutionSection: React.FC = () => {
  return (
    <div className="bg-white py-5">
      <div className="container">
        {/* Heading */}
        <h1 className="h4 h1-md fw-bold mb-4 text-center text-md-start">
          A one stop solution for Quick & Hassle-Free Hiring
        </h1>

        <div className="row align-items-center gy-5">
          {/* Image Section */}
          <div className="col-12 col-md-6 order-1 order-md-0 d-flex justify-content-center">
            <div className="w-100" style={{ maxWidth: "450px" }}>
              <img
                src="/img/hiring.png"
                alt="Hiring Illustration"
                className="img-fluid rounded shadow-sm"
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Cards Section */}
          <div className="col-12 col-md-6 d-flex justify-content-center">
            <div className="w-100 px-2" style={{ maxWidth: "500px" }}>
              <HiringCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringSolutionSection;
