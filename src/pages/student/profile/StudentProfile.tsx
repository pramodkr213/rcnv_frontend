import React from "react";
import { getProfileApi } from "../../../api/auth/Auth";
import type { StduentProfileResponse } from "../../../api/auth/response/ProfileResponse";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProfileSnapshot from "./ProfileSnapshot";
import EducationSection from "./EducationSection";
import ResumeSection from "./ResumeSection";

const StudentProfile: React.FC = () => {
  const { data: profile, refetch } = useSuspenseQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const res = (await getProfileApi()) as StduentProfileResponse;
      return res?.data;
    },
  });

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto gap-6 p-4">
      {/* Left Sidebar */}

      {/* Right Content */}
      <div className="w-full flex-1 lg:w-2/3 p-6 overflow-auto rounded-xl ">
        <div className="flex flex-col gap-10">
          <ProfileSnapshot
            firstName={profile.firstName}
            lastName={profile.lastName}
            phone={profile.phone}
            dob={profile.dob}
            city={profile.city}
            state={profile.state}
            country={profile.country}
            lanuagesKnown={profile.lanuagesKnown}
            careerObjective={profile.careerObjective}
            aboutMe={profile.aboutMe}
          />

          <EducationSection
            educationList={profile.education}
            refetch={refetch}
          />

          <ResumeSection resumeUrl={profile.resumeLink} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
