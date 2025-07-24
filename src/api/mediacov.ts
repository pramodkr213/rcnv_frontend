import axiosInstance from "./axios";

export type MediaImage = {
  id: number;
  title: string;
  imageUrl: string;
  info?: string;
};
export const MediaImageApi = {
  getMediaImages: async (): Promise<MediaImage[]> => {
    const response = await axiosInstance.get("/api/public/allmedia");
    return response.data?.data;
  },
getMediaImagesPage: async (currentPage:number): Promise<MediaImage[]> => {
    const response = await axiosInstance.get(`/api/public/allmedia?size=6&page=${currentPage}`);
    return response.data;
  },
  addMediaImage: async (image: File, ) => {
    const formData = new FormData();
    formData.append("images", image);
    const response = await axiosInstance.post(
      "/api/admin/save-media",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

//   updateMediaImage: async (
//     image: File,
//     title: string,
//     id: number | undefined
//   ) => {
//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("title", title);
//     const response = await axiosInstance.put(
//       `/api/admin/hero-section/${id}`,
//       formData,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//     return response.data;
//   },

  deleteMediaImage: async (id: number) => {
    const response = await axiosInstance.delete(
      `/api/admin/delete-media/${id}`
    );
    return response.data;
  },

  //  getMediaByPage: async (page: number) => {
  //   const res = await axiosInstance.get(`/api/public/media?page=${page}`);
  //   return res.data;
  // },
};