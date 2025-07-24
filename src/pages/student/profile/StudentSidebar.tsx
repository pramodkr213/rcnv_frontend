// import { Camera } from "lucide-react";
// import React, { useRef } from "react";
// import { uploadProfilePictureApi } from "../../../api/student/student";
// import type {
//   QueryObserverResult,
//   RefetchOptions,
// } from "@tanstack/react-query";
// import type { UpdateStudentProfile } from "../../../api/student/request/UpdateProfileRequest";
// import { ToastMessage } from "../../../utils/toast";

// interface SidebarProps {
//   fullName: string;
//   email: string;
//   phone: string;
//   location: string;
//   linkedinProfile: string;
//   githubProfile: string;
//   portfolio: string;
//   profilePicture: string;
//   refetch: (
//     options?: RefetchOptions | undefined
//   ) => Promise<QueryObserverResult<UpdateStudentProfile, Error>>;
// }

// const StudentSidebar: React.FC<SidebarProps> = ({
//   fullName,
//   email,
//   phone,
//   location,
//   linkedinProfile,
//   githubProfile,
//   portfolio,
//   profilePicture,
//   refetch,
// }) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleOpenLink = (url: string) => {
//     if (!url) return;
//     window.open(url, "_blank", "noopener,noreferrer");
//   };

//   const handleUploadClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file || file.type !== "image/png") {
//       alert("Please select a PNG image.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     await ToastMessage.promise(uploadProfilePictureApi(formData), {
//       loading: "Uploading image...",
//       success: "Image uploaded successfully!",
//       error: "Failed to upload",
//     });
//     refetch();
//   };

//   return (
//     <div className="w-full md:max-w-[50%] mx-auto lg:w-[20%] bg-[#e8eef9] px-4 py-2 flex flex-col items-center text-center lg:sticky lg:top-57 h-fit rounded-md">
//       <div className="lg:absolute -top-20">
//         <img
//           src={
//             profilePicture ||
//             "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
//           }
//           alt="Avatar"
//           draggable="false"
//           className="w-28 h-28 rounded-full mb-4 border-4 border-white shadow-md"
//         />

//         <Camera
//           onClick={handleUploadClick}
//           className="p-1 relative bottom-10 left-20 rounded-full bg-white text-gray-600 cursor-pointer"
//         />
//         <input
//           type="file"
//           accept="image/png"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           className="hidden"
//         />
//       </div>

//       <h2 className="text-lg font-semibold text-gray-800 lg:pt-10">
//         {fullName}
//       </h2>
//       <p className="text-sm text-gray-600 mt-1">{email}</p>
//       <p className="text-sm text-gray-600 mt-1">{phone}</p>
//       <p className="text-sm text-gray-600 mt-1">{location}</p>

//       <div className="flex gap-3 mt-4">
//         <button onClick={() => handleOpenLink(linkedinProfile)}>
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
//             alt="LinkedIn"
//             className="w-6 h-6 cursor-pointer"
//           />
//         </button>
//         <button onClick={() => handleOpenLink(githubProfile)}>
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
//             alt="GitHub"
//             className="w-6 h-6 cursor-pointer"
//           />
//         </button>
//       </div>

//       <button
//         onClick={() => handleOpenLink(portfolio)}
//         className="mt-4 w-full bg-gray-900 cursor-pointer text-white py-2 rounded hover:bg-gray-800 transition"
//       >
//         Portfolio
//       </button>
//     </div>
//   );
// };

// export default StudentSidebar;
