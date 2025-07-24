import React from "react";

const WhyHireSection: React.FC = () => {
  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left: Heading and Description */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h2 className="display-5 fw-bold text-dark">
              Why Hire <br />
              From <span className="text-primary">RCNV Portal?</span>
            </h2>
            <p className="mt-3 text-secondary fs-5">
              Post your Intern requirements and build your dream team with ease.
            </p>
          </div>

          {/* Right: Image */}
          <div className="col-lg-6 text-center">
            <img
              src="/img/why-hire.png" // Replace with actual image path
              alt="Why Hire"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyHireSection;
