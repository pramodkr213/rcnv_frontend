import axiosInstance from "./axios";

export const UpEvnApi = {
  getUpEvn: async (currentPage:number): Promise<MediaImage[]> => {
    const response = await axiosInstance.get(`/api/public/upcoming-events?page=${currentPage}`);
    return response.data || [];
  },

  addUpEvn: async (title: string, date: string, description:string) => {
    const formData = {
      title: title,
      date: date,
      description:description
    };
    const response = await axiosInstance.post(
      "/api/admin/add-event",
      formData
    );
    return response.data;
  },


  updateEvent: async (id:number,  title: string,description:string, date: string, ) => {
    const formData = {
      title: title,
      date: date,
      description:description
    };
    const response = await axiosInstance.put(
      `/api/admin/update-event/${id}`,
      formData
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

  deleteEvent: async (id: number) => {
    const response = await axiosInstance.delete(`/api/admin/delete-event/${id}`);
    return response.data;
  },

  
};
