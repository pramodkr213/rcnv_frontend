import axios from "./axios";

export type Member = {
  name: string;
  email: string;
  mobile: string;
  classification: string;
  memberDOB: string;
  spouseName: string;
  spouseDOB: string;
  memberAniversary: string;
  description: string;
  imageUrls?: string[];
};

export type ClubMember = {
  name: string;
  spousename: string;
  mobile: string;
  memberdob: string;
  spousedob: string;
  memberaniversary: string;
  classification:string;
  email: string;
  imgurl: string;
  id: number;
  description:string;
};

export type ClubMemberResponse = {
  members: ClubMember[];
  totalPages: number;
  success: boolean;
};
  export const MemberApi = {
  addMembers: async (members: Member[], images: File[]) => {
    const formData = new FormData();

    // Backend expects single object in array form, not array of arrays
    const formattedMembers = members.map((member) => ({
      name: member.name,
      email: member.email,
      mobile: member.mobile,
      classification: member.classification,
      memberdob: member.memberDOB,
      spousename: member.spouseName,
      spousedob: member.spouseDOB,
      memberaniversary: member.memberAniversary,
      description: member.description,
    }));

    formData.append("members", JSON.stringify(formattedMembers));

    if (images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    } else {
      // 👇 Add a dummy empty blob or indicate no image (if backend expects it)
      formData.append("images", new Blob([]));
    }

    const res = await axios.post("/api/admin/savemembers", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

getAllMembersHome: async (currentPage: number): Promise<ClubMemberResponse> => {
  const response = await axios.get(
    `/api/public/getallmembers?size=10&page=${currentPage}`
  );
  return response.data;
}
,


 updateMember: async (id: number, payload: ClubMember, images: File[]) => {
  const formData = new FormData();

  // Format payload to match backend expectations
  const formattedMember = {
    name: payload.name,
    email: payload.email,
    mobile: payload.mobile,
    classification: payload.classification,
    memberdob: payload.memberdob,
    spousename: payload.spousename,
    spousedob: payload.spousedob,
    memberaniversary: payload.memberaniversary,
    description: payload.description,
  };

  // Wrap in array if backend expects `members` to always be an array
  formData.append("member", JSON.stringify(formattedMember));

  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append("image", image);
    });
  } else {
    // Send an empty array to indicate no new images
    formData.append("image", new Blob([], { type: "application/octet-stream" }));
  }

  const res = await axios.put(`/api/admin/updatemember/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data?.data;
},

   deleteMember: async (id: number) => {
    const res = await axios.delete(`/api/admin/deletemember?id=${id}`);
    return res.data?.data;
  },

// getMembirthdays: async ()=> {
//   const response = await axios.get(
//     `/api/public/getMembersByDobAndAniversary`
//   );
//   return response.data;
// }


  getMembirthdays: async () => {
    // Simulated data — replace this with your real API call
    return [
      {
        id: 1,
        name: "John Doe",
        type: "Birthday",
        date: "2025-07-25",
      },
      {
        id: 2,
        name: "Jane Smith",
        type: "Anniversary",
        date: "2025-07-26",
      },
    ];
  },

};
