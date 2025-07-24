import axiosInstance from "./axios";

export type Club = {
  id?: number;
  name: string;
};

export const ClubApi = {
  getClubs: async (): Promise<Club[]> => {
    const res = await axiosInstance.get("/api/public/club-projects");
    return res.data?.data;
  },

  addClub: async (name: string) => {
    const formData = new FormData();
    formData.append("name", name);
    const res = await axiosInstance.post("/api/admin/club-project", formData);
    return res.data?.data;
  },

  deleteClub: async (id: number | undefined) => {
    const res = await axiosInstance.delete(`/api/admin/club-project/${id}`);
    return res.data?.data;
  },

  updateClub: async (id: number | string | undefined, name: string) => {
    const formData = new FormData();
    formData.append("name", name);
    const res = await axiosInstance.put(
      `/api/admin/club-project/${id}`,
      formData
    );
    return res.data?.data;
  },
};
