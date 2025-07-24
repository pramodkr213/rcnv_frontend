import type React from "react";

interface WelcomeProps {
  name: string;
}

const WelcomeSection: React.FC<WelcomeProps> = (props) => {
  return (
    <section>
      <div className="flex min-h-[15rem] min-w-screen text-xl text-gray-800 flex-col gap-2 justify-center items-center">
        <h1 className="text-4xl font-semibold">
          Hii, {props.name || "User"}! 🖐️
        </h1>
        <h3>Find Jobs and Internships For you</h3>
      </div>
    </section>
  );
};

export default WelcomeSection;
