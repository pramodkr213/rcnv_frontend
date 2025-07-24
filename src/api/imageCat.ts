import axiosInstance from "./axios";



export const ImageCatApi = {
  getImageCat: async (page: number) => {
    const res = await axiosInstance.get(`/api/public/getimgcategory?page=${page}&size=6`);
    return res.data;
  },

  addImageCat: async (title:string) => {
    const formData ={imgcatname : title};
   
     
    const res = await axiosInstance.post("/api/admin/saveimgcat", formData, );
    return res.data?.data;
  },

 updateImgCategory: async (id: number, name: string) => {
    const formData = new FormData();
    formData.append("name", name);
    const res = await axiosInstance.put(`/api/admin/category/${id}`, formData);
    return res.data?.data;
  },

  deleteCategory: async (id: number | undefined) => {
    const res = await axiosInstance.delete(`/api/public/deleteimgcatbyid?id=${id}`);
    return res.data?.data;
  },

  getImageCatHome: async () => {
    const res = await axiosInstance.get(`/api/public/getimgcategory`);
    return res.data;
  },

}