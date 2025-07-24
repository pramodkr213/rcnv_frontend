import axiosInstance from "./axios";

export type Category = {
  id?: number;
  clubName?: string;
  name: string;
};

export const CategoryApi = {
  getCategories: async (): Promise<Category[]> => {
    const res = await axiosInstance.get("/api/admin/categories");
    return res.data?.data;
  },

  getCategoryByClubId: async (
    clubId: number | string | undefined
  ): Promise<Category[]> => {
    const res = await axiosInstance.get(`/api/admin/categories/club/${clubId}`);
    return res.data?.data;
  },

  getCategoryByClubIdPublic: async (
    clubId: number | string | undefined
  ): Promise<Category[]> => {
    const res = await axiosInstance.get(`/api/public/category/club/${clubId}`);
    return res.data?.data;
  },

  addCategory: async (name: string, clubId: number) => {
    const formData = new FormData();
    formData.append("name", name);
    const res = await axiosInstance.post(
      `/api/admin/category/${clubId}`,
      formData
    );
    return res.data?.data;
  },

  deleteCategory: async (id: number | undefined) => {
    const res = await axiosInstance.delete(`/api/admin/category/${id}`);
    return res.data?.data;
  },

  updateCategory: async (id: number, name: string) => {
    const formData = new FormData();
    formData.append("name", name);
    const res = await axiosInstance.put(`/api/admin/category/${id}`, formData);
    return res.data?.data;
  },
};
