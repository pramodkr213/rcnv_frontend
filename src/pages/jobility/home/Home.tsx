import StudentTestimonials from "./StudentTestimonials";
import EmpowerSection from "./EmpowerSection.js";
import { HeroSection } from "./HeroSection.js";
import ResumeBuilderSection from "./ResumeBuilderSection";
import { LogoSection } from "./LogoSection";
import { JobSection } from "./JobSection";
import { InternshipSection } from "./InternshipSection";
import { getDecryptedAuthCookie } from "../../utils/AuthCookie.js";
import WelcomeSection from "./WelcomeSection.js";

const Home: React.FC = () => {
  const user = getDecryptedAuthCookie();

  return (
    <section className="px-2 md:px-0 overflow-x-hidden">
      {user?.role === "STUDENT" ? (
        <WelcomeSection name={user?.firstName} />
      ) : (
        <>
          <HeroSection />
          <LogoSection />
        </>
      )}
      <JobSection />
      <InternshipSection />
      <StudentTestimonials />
      <ResumeBuilderSection />
      <EmpowerSection />
    </section>
  );
};

export default Home;
