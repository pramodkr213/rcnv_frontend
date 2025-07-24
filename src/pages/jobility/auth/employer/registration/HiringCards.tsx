import React from "react";

const hiringSteps = [
  {
    id: 1,
    title: "Quick Shortlist Process",
    description:
      "Instantly filter and shortlist candidates based on job role, skills, and preferences to save time and effort.",
    bgColor: "bg-blue-600",
  },
  {
    id: 2,
    title: "Seamless Communication",
    description:
      "Connect with candidates directly through our platform with built-in messaging and email alerts.",
    bgColor: "bg-blue-500",
  },
  {
    id: 3,
    title: "Advanced Hiring Tools",
    description:
      "Use smart filters, applicant tracking, and analytics tools to streamline your entire hiring workflow.",
    bgColor: "bg-blue-400",
  },
];

const HiringCards: React.FC = () => {
  return (
    <div className="space-y-10 mt-5">
      {hiringSteps.map((step) => (
        <div key={step.id} className="d-flex align-items-start gap-3">
          <div
            className={`${step.bgColor} text-white d-flex align-items-center justify-content-center p-3 fs-2 fw-bold rounded`}
            style={{ width: "56px", height: "56px" }}
          >
            {step.id}
          </div>
          <div>
            <h3 className="h5 fw-semibold">{step.title}</h3>
            <p className="text-muted mb-0">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HiringCards;
