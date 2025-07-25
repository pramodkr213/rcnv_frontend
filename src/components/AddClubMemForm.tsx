import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ProcessingButton from "./ProcessingButton";
import { ToastMessage } from "../utils/toast";
import Input from "./Input";
import Textarea from "./Textarea";
import { ProjectApi } from "../api/project"; // This may need to change to a `MemberApi` if available
import { MemberApi } from "../api/clubmem"; // Assuming this is the correct import for adding members
import { useNavigate } from "react-router-dom";
const AddClubMemForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [classification, setClassification] = useState("");
  const [memberDOB, setMemberDOB] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [spouseDOB, setSpouseDOB] = useState("");
  const [memberAniversary, setMemberAnniversary] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
      setImagePreviews(filesArray.map((file) => URL.createObjectURL(file)));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") {
      setNameError("Name is required");
      return;
    }
    setProcessing(true);

    try {
      await MemberApi.addMembers(
        [
          {
            name,
            email,
            mobile,
            memberDOB,
            spouseDOB,
            spouseName,
            memberAniversary,
            classification,
            description,
          },
        ],
        images
      );

      ToastMessage.success("Club Member added successfully.");
      queryClient.invalidateQueries({ queryKey: ["members"] });
      navigate("/admin/all-club-members");

      // Reset form
      setName("");
      setEmail("");
      setMobile("");
      setClassification("");
      setMemberDOB("");
      setSpouseName("");
      setSpouseDOB("");
      setMemberAnniversary("");
      setDescription("");
      setImages([]);
      setImagePreviews([]);
    } catch (error) {
      ToastMessage.error("Failed to add member.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Input
            label="Name"
            placeholder="Enter Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && (
            <div className="mt-2 text-xs text-red-500">{nameError}</div>
          )}

          <Input
            label="Mobile No."
            placeholder="Enter Mobile No."
            name="mobile"
            maxLength={10}
            value={mobile}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, ""); // Remove non-numeric
              setMobile(onlyNums);
            }}
          />

          <Input
            label="Member DOB"
            placeholder="YYYY-MM-DD"
            name="memberDOB"
            value={memberDOB}
            onChange={(e) => setMemberDOB(e.target.value)}
            type="date"
          />

          <Input
            label="Member Spouse DOB"
            placeholder="YYYY-MM-DD"
            name="spouseDOB"
            value={spouseDOB}
            onChange={(e) => setSpouseDOB(e.target.value)}
            type="date"
          />

          <Textarea
            label="Description"
            placeholder="Enter description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-6">
          <Input
            label="Email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Classification"
            placeholder="Enter Classification"
            name="classification"
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
          />

          <Input
            label="Spouse Name"
            placeholder="Enter Spouse Name"
            name="spouseName"
            value={spouseName}
            onChange={(e) => setSpouseName(e.target.value)}
          />

          <Input
            label="Member Anniversary"
            placeholder="YYYY-MM-DD"
            name="memberAnniversary"
            value={memberAniversary}
            onChange={(e) => setMemberAnniversary(e.target.value)}
            type="date"
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Profile Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 border border-gray-200 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {imagePreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`preview-${idx}`}
                  className="h-20 w-20 object-cover rounded"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-sm mx-auto">
        <ProcessingButton type="submit" processing={processing}>
          Add Member
        </ProcessingButton>
      </div>
    </form>
  );
};

export default AddClubMemForm;
