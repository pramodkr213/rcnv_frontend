import type React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  firstName: string;
  lastName: string;
  phone: string;
  dob: string;
  city: string;
  state: string;
  country: string;
  lanuagesKnown: string;
  careerObjective: string;
  aboutMe: string;
}

const ProfileSnapshot: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex gap-3 items-center mb-5 border-b border-b-gray-400">
        <h3 className="text-2xl font-semibold text-gray-800">
          Profile Snapshot
        </h3>
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => navigate("/candidate/profile/update")}
        >
          ✏️
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-gray-700 mb-4">
        <p>
          <span className="font-semibold">Full Name:</span> {props.firstName}{" "}
          {props.lastName}
        </p>
        <p>
          <span className="font-semibold">Mobile No:</span> {props.phone}
        </p>
        <p>
          <span className="font-semibold">Date of Birth:</span> {props.dob}
        </p>
        <p>
          <span className="font-semibold">City:</span> {props.city}
        </p>
        <p>
          <span className="font-semibold">State:</span> {props.state}
        </p>
        <p>
          <span className="font-semibold">Country:</span> {props.country}
        </p>
      </div>

      <p className="mb-4">
        <span className="font-semibold text-gray-700">Languages Known:</span>{" "}
        {props.lanuagesKnown}
      </p>

      <div className="mb-4">
        <label className="block font-semibold text-gray-700 mb-1">
          Career Objectives
        </label>
        <textarea
          className="focus:outline-none w-full border border-gray-300 rounded-md p-2 bg-white"
          rows={3}
          value={props.careerObjective}
          readOnly
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-1">
          About me
        </label>
        <textarea
          className="focus:outline-none w-full border border-gray-300 rounded-md p-2 bg-white"
          rows={3}
          value={props.aboutMe}
          readOnly
        />
      </div>
    </div>
  );
};

export default ProfileSnapshot;
