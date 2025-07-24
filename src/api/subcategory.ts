import axiosInstance from "./axios";

export type SubCategory = {
  id?: number;
  name: string;
  club_name?: string;
  category_name?: string;
  categoryId: number;
};

export const SubCategoryApi = {
  getSubCategories: async (): Promise<SubCategory[]> => {
    const res = await axiosInstance.get("/api/admin/subcategories");
    return res.data?.data;
  },

  getSubCategoryByCategoryId: async (
    categoryId: number
  ): Promise<SubCategory[]> => {
    const res = await axiosInstance.get(
      `/api/admin/subcategories/category/${categoryId}`
    );
    return res.data?.data;
  },

  getSubCategoryByCategoryIdPublic: async (
    categoryId: number | string | undefined
  ): Promise<SubCategory[]> => {
    const res = await axiosInstance.get(
      `/api/public/subCategory/category/${categoryId}`
    );
    return res.data?.data;
  },

  addSubCategory: async (name: string, categoryId: number) => {
    const formData = new FormData();
    formData.append("name", name);
    const res = await axiosInstance.post(
      `/api/admin/subcategory/${categoryId}`,
      formData
    );
    return res.data?.data;
  },

  deleteSubCategory: async (id: number | undefined) => {
    const res = await axiosInstance.delete(`/api/admin/subcategory/${id}`);
    return res.data?.data;
  },

  updateSubCategory: async (id: number, name: string) => {
    const formData = new FormData();
    formData.append("name", name);
    const res = await axiosInstance.put(
      `/api/admin/subcategory/${id}`,
      formData
    );
    return res.data?.data;
  },
};
