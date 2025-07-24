import { ScrollingLogos } from "../../components/ui/logo/ScrollingLogos.tsx";
import React from "react";

export const LogoSection: React.FC = () => {
  return (
    <section className="container py-10 px-2 mx-auto xl:px-30 bg-white">
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-xl sm:text-3xl text-center font-medium">
            We collaborate with{" "}
            <span className="text-[#0754AE]">20+ leading companies</span>
          </p>
        </div>

        <div className="flex gap-2 overflow-hidden py-3">
          <ScrollingLogos />
        </div>
      </div>
    </section>
  );
};
