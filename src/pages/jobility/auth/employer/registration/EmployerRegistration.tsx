import React from "react";
import FormSection from "./FormSection.tsx";
import WhyHireSection from "./WhyHireSection.tsx";
import HiringSolutionSection from "./HiringSolutionSection.tsx";

const EmployerRegistration: React.FC = () => {
    return (
        <section className="px-4 py-6">
            <FormSection/>
            <WhyHireSection/>
            <HiringSolutionSection/>
        </section>
    );
};

export default EmployerRegistration;
