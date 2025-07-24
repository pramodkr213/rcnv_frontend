import axiosInstance from "./axios";

export type Sponsor = {
  id: number;
  title?: string;
  imageUrl: string;
};

export const SponsorsApi = {
  getSponsors: async (): Promise<Sponsor[]> => {
    const res = await axiosInstance.get("/api/public/sponsers");
    return res.data?.data;
  },

  addSponsor: async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    const res = await axiosInstance.post("/api/admin/sponsers", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data?.data;
  },

  //   updateSponsor: async (image: File, title: string, id: number | undefined) => {
  //     const formData = new FormData();
  //     formData.append("image", image);
  //     const res = await axiosInstance.put(`/api/admin/sponsers/${id}`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     return res.data?.data;
  //   },

  deleteSponsor: async (id: number) => {
    const res = await axiosInstance.delete(`/api/admin/sponsers/${id}`);
    return res.data?.data;
  },
};
