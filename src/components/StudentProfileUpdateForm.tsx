import React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProfileApi } from "../api/auth/Auth";
import type { StduentProfileResponse } from "../api/auth/response/ProfileResponse";
import { ToastMessage } from "../utils/toast";
import { updateProfileApi } from "../api/student/student";
import { Input, Select, TextArea } from "./Input2";

interface StudentProfile {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  dob: string;
  city: string;
  state: string;
  country: string;
  careerObjective: string;
  aboutMe: string;
  lanuagesKnown: string;
  linkedinProfile: string;
  githubProfile: string;
  portfolio: string;
}

const StudentProfileUpdateForm: React.FC = () => {
  const navigate = useNavigate();
  const { data: student } = useSuspenseQuery<StudentProfile>({
    queryKey: ["student"],
    queryFn: async () => {
      const res = (await getProfileApi()) as StduentProfileResponse;
      return res?.data;
    },
  });

  const [formData, setFormData] = React.useState<StudentProfile>(student);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await ToastMessage.promise(updateProfileApi(formData), {
      loading: "Updating Profile....",
      success: "Profile Updated Successfully!",
      error: "Failed to update profile",
    });

    navigate("/candidate/profile");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 border border-gray-300 bg-white rounded-xl space-y-6 mt-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <Select
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          options={["Male", "Female", "Other"]}
        />
        <Input
          label="Date of Birth"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <Input
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
        <Input
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
      </div>

      <TextArea
        label="Career Objective"
        name="careerObjective"
        value={formData.careerObjective}
        onChange={handleChange}
      />
      <TextArea
        label="About Me"
        name="aboutMe"
        value={formData.aboutMe}
        onChange={handleChange}
      />
      <Input
        label="Languages Known"
        name="lanuagesKnown"
        value={formData.lanuagesKnown}
        onChange={handleChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="LinkedIn Profile"
          name="linkedinProfile"
          value={formData.linkedinProfile}
          onChange={handleChange}
        />
        <Input
          label="GitHub Profile"
          name="githubProfile"
          value={formData.githubProfile}
          onChange={handleChange}
        />
        <Input
          label="Portfolio"
          name="portfolio"
          value={formData.portfolio}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-5 justify-end">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-gray-400 cursor-pointer text-white px-6 py-2 rounded hover:bg-gray-500 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </div>
    </form>
  );
};

export default StudentProfileUpdateForm;
