import axiosInstance from "./axios";

export type HeroImage = {
  id: number;
  title: string;
  imageUrl: string;
  info?: string;
};

export const HeroImageApi = {
  getHeroImages: async (): Promise<HeroImage[]> => {
    const response = await axiosInstance.get("/api/public/hero-section");
    return response.data?.data;
  },

  addHeroImage: async (image: File, title: string) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    const response = await axiosInstance.post(
      "/api/admin/hero-section",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  updateHeroImage: async (
    image: File,
    title: string,
    id: number | undefined
  ) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    const response = await axiosInstance.put(
      `/api/admin/hero-section/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  deleteHeroImage: async (id: number) => {
    const response = await axiosInstance.delete(
      `/api/admin/hero-section/${id}`
    );
    return response.data;
  },
};
