import axiosInstance from "./axios";

export type Director = {
  id?: number;
  name: string;
  email: string;
  designation: string;
  startDate?: string;
  endDate?: string;
  imageUrl: string;
};

export const DirectorApi = {
  getDirectors: async (): Promise<Director[]> => {
    const res = await axiosInstance.get("/api/admin/directors");
    return res.data?.data;
  },

  getDirectorsPublic: async (): Promise<Director[]> => {
    const res = await axiosInstance.get("/api/public/directors");
    return res.data?.data;
  },

  getDirectorById: async (id: number): Promise<Director> => {
    const res = await axiosInstance.get(`/api/admin/directors/${id}`);
    return res.data?.data;
  },

  addDirector: async (director: Director, image: File | null) => {
    const formData = new FormData();
    formData.append(
      "director",
      new Blob([JSON.stringify(director)], {
        type: "application/json",
      })
    );
    if (image) {
      formData.append("image", image);
    }
    const res = await axiosInstance.post("/api/admin/director", formData);
    return res.data?.data;
  },

  updateDirector: async (
    id: number,
    director: Director,
    image: File | null
  ) => {
    const formData = new FormData();
    formData.append(
      "director",
      new Blob([JSON.stringify(director)], {
        type: "application/json",
      })
    );
    if (image) {
      formData.append("image", image);
    }
    const res = await axiosInstance.put(`/api/admin/director/${id}`, formData);
    return res.data?.data;
  },

  deleteDirector: async (id: number) => {
    const res = await axiosInstance.delete(`/api/admin/director/${id}`);
    return res.data?.data;
  },
};
