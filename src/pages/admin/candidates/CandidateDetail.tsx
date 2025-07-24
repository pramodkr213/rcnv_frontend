import React from "react";
import { Download } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getCandidateDetailApi } from "../../../api/admin/admin";
import { formatDate } from "../../../utils/helper";

const CandidateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: candidate } = useSuspenseQuery({
    queryKey: ["candidate", id],
    queryFn: async () => {
      const res = await getCandidateDetailApi(id);
      return res?.data;
    },
  });

  const handleDownload = async () => {
    if (!candidate.resumeLink) return;
    window.open(candidate.resumeLink, "_blank", "noopener,noreferrer");
  };

  const handleOpenLink = (url: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="border border-gray-300 mx-auto  rounded  text-sm">
      {/* Header */}
      <div className="bg-blue-100 p-4 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center gap-4 p-4">
          <img
            src={candidate.profilePicture || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-25 h-25 rounded-full border-2 border-white shadow-md"
            draggable={false}
          />
          <div>
            <h1 className="text-lg font-bold">
              {candidate.firstName} {candidate.lastName}
            </h1>
            <p className="text-gray-600">Contact: {candidate.phone}</p>
            <p className="text-gray-600">Email: {candidate.email}</p>
            <div className="flex space-x-2 mt-2">
              <button onClick={() => handleOpenLink(candidate.githubProfile)}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
                  alt="GitHub"
                  className="w-6 h-6 cursor-pointer"
                />
              </button>
              <button onClick={() => handleOpenLink(candidate.linkedinProfile)}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                  alt="LinkedIn"
                  className="w-6 h-6 cursor-pointer"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleDownload}
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Download size={16} />
            Resume
          </button>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4  p-4 rounded ">
        <p>
          <strong>Full Name:</strong> {candidate.firstName} {candidate.lastName}
        </p>
        <p>
          <strong>Mobile No:</strong> {candidate.phone}
        </p>
        <p>
          <strong>Date of Birth:</strong> {formatDate(candidate.dob)}
        </p>
        <p>
          <strong>City:</strong> {candidate.city}
        </p>
        <p>
          <strong>State:</strong> {candidate.state}
        </p>
        <p>
          <strong>Country:</strong> {candidate.country}
        </p>
        <p>
          <strong>Languages Known:</strong> {candidate.lanuagesKnown || "N/A"}
        </p>
      </div>

      {/* Section */}
      {[
        {
          title: "Career Objective",
          content: `${candidate.careerObjective || "N/A"}`,
        },
        {
          title: "About me",
          content: `${candidate.aboutMe || "N/A"}`,
        },
      ].map((section) => (
        <div key={section.title} className="mt-4  p-4 rounded ">
          <h2 className="font-semibold mb-1">{section.title}</h2>
          <p className="text-gray-700">{section.content}</p>
        </div>
      ))}

      {/* Projects */}
      {/* <div className="mt-4  p-4 rounded ">
        <h2 className="font-semibold mb-1">Projects</h2>
        <p>
          <strong>Project Title:</strong> CRM system
        </p>
        <p>
          <strong>Client:</strong> Codemark
        </p>
        <p>
          <strong>Employment Type:</strong> Full Time
        </p>
        <p>
          <strong>Duration:</strong> Jan 2022 - Dec 2023
        </p>
        <p>
          <strong>Project Location:</strong> Nagpur
        </p>
        <p>
          <strong>Role:</strong> Java Programmer
        </p>
        <p>
          <strong>Skills:</strong> Java + Crmtools
        </p>
        <p>
          <strong>Team Size:</strong> 2
        </p>
        <p>
          <strong>Responsibilities:</strong> Project handling, reporting, spring
          security config, mysql db handling, post creation
        </p>
        <p>
          <strong>Technologies:</strong> Java, MySQL, REST API for crm, team
          system using spring boot and libraries
        </p>
        <p>
          <strong>Project Module:</strong> To manage the student registration
          and inquiries
        </p>
      </div> */}

      {/* Skills */}
      <div className="mt-4 mb-2 p-4 rounded ">
        <h2 className="font-semibold mb-1">IT Skills</h2>
        <p>{candidate.skills || "N/A"}</p>
      </div>

      {/* Education */}
      <div className="p-4">
        <div className="flex gap-3 items-center justify-between mb-2">
          <div className="flex justify-center items-center gap-2">
            <h3 className="text-2xl font-semibold text-gray-800">Education</h3>
          </div>
        </div>

        <ul className="space-y-4 max-h-[350px] overflow-y-auto">
          {candidate?.education?.map((edu, index) => (
            <li
              key={edu?.id}
              className="p-4 border border-gray-200 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {index + 1}. {edu?.degree} ({edu?.type}) -{" "}
                  {edu?.yearOfPassing}
                </p>
                <p className="text-sm ml-3 text-gray-600">{edu?.college}</p>
                <p className="text-sm ml-3 text-gray-600">
                  Field: {edu?.fieldOfStudy}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CandidateDetail;
