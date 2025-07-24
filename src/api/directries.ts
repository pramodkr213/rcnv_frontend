import axiosInstance from "./axios";

export type Directry = {
  id?: number;
  name: string;
  email: string;
  designation: string;
};

export const DirectryApi = {
  getDirectries: async (): Promise<Directry[]> => {
    const res = await axiosInstance.get("/api/admin/directories");
    return res.data?.data;
  },

  addDirectry: async (directry: Directry) => {
    const formData = new FormData();
    formData.append(
      "directory",
      new Blob([JSON.stringify(directry)], {
        type: "application/json",
      })
    );
    const res = await axiosInstance.post("/api/admin/directory", formData);
    return res.data?.data;
  },

  updateDirectry: async (id: number, directry: Directry) => {
    const formData = new FormData();
    formData.append(
      "directory",
      new Blob([JSON.stringify(directry)], {
        type: "application/json",
      })
    );
    const res = await axiosInstance.put(`/api/admin/directory/${id}`, formData);
    return res.data?.data;
  },

  deleteDirectry: async (id: number) => {
    const res = await axiosInstance.delete(`/api/admin/directory/${id}`);
    return res.data?.data;
  },
};
