import axiosInstance from "./axios";

export const upcomingEvent = {
  upcomingevents: async (): Promise<MediaImage[]> => {
    const response = await axiosInstance.get("/api/public/upcoming-events");
    return response.data || [];
  },
   getEventsByPage: async (event_id:any) => {
    const res = await axiosInstance.get(`api/public/eventbyid?id=${event_id}`);
    return res.data;
  },

}