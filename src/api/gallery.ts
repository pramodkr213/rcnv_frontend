import axiosInstance from "./axios";

export type GalleryImage = {
  id: number;
  imageUrl: string;
  title?: string;
};

export const GalleryApi = {
  getGalleryImages: async (page: number) => {
    const res = await axiosInstance.get(`/api/public/gallery?page=${page}&size=6`);
    return res.data;
  },

  addGalleryImage: async (files: File[], category:any) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
     formData.append("catId", String(category));
    const res = await axiosInstance.post("/api/admin/gallery", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data?.data;
  },

  updateGalleryImage: async (
    image: File,
    title: string,
    id: number | undefined,
    category:any
  ) => {
    const formData = new FormData();
    formData.append("image", image);
    const galleryReq = {
      title: title,
    };
   

    formData.append("gallary", JSON.stringify(galleryReq));
    const res = await axiosInstance.put(`/api/admin/gallery/${id}?catid=${category}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data?.data;
  },

  deleteGalleryImage: async (id: number) => {
    const res = await axiosInstance.delete(`/api/admin/gallery/${id}`);
    return res.data?.data;
  },

   showGallarybyid: async (category_id: any,currentPage:number) => {
    const res = await axiosInstance.get(`/api/public/getgallerybycatid?catid=${category_id}&page=${currentPage}&size=6`);
    return res.data;
  },

   showGallaryall: async (category_id: any) => {
    const res = await axiosInstance.get(`/api/public/getgallerybycid?cid=${category_id}`);
    return res.data;
  },

  showGallaryallHome: async () => {
    const res = await axiosInstance.get(`/api/public/gallery`);
    return res.data;
  },
};

