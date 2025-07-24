import type { ProjectsResponse } from "./admin/response/ApplicationResponse";
import axios from "./axios";

export type Project = {
  id?: string;
  title: string;
  detail: string;
  date: string;
  clubId: string;
  year: string;
  districtName: string;
  destrictNo: string;
  cost: number;
  beneficiaries: number;
  manHours: number;
  rotarians: number;
  rotaractors: number;
  imageUrls?: string[];
  facebookLink: string;
  email: string;
  instaLink: string;
  clubProjectId: number;
  categoryId: number;
  subCategoryId: number;
  presidentName: string;
  presidentContact: string;
};

export type Filter = {
  clubProjectId?: string | null;
  categoryId?: string | null;
  subcategoryId?: string | null;
  page?: number;
  city?: string | null;
  academicYear?: string | null;
};

export const ProjectApi = {
  getProjects: async (filter: Filter): Promise<Project[]> => {
    const res = await axios.get("/api/public/projects", {
      params: {
        clubProjectId: filter.clubProjectId,
        categoryId: filter.categoryId,
        subcategoryId: filter.subcategoryId,
        page: filter.page,
        city: filter.city,
        year: filter.academicYear,
      },
    });
    return res.data?.data;
  },

 getProjectsForAdmin: async (filter: Filter): Promise<ProjectsResponse> => {
  const res = await axios.get("/api/public/projects", {
    params: {
      clubProjectId: filter.clubProjectId,
      categoryId: filter.categoryId,
      subcategoryId: filter.subcategoryId,
      page: filter.page,
      city: filter.city,
      year: filter.academicYear,
    },
  });

  return {
    data: res.data?.data || [],
    totalCount: res.data?.totalCount || 0,
    success: res.data?.success ?? true,
    message: res.data?.message ?? "",
    statusCode: res.data?.statusCode ?? 200,
  };
},

  

  getProjectById: async (id: number | string | undefined): Promise<Project> => {
    const res = await axios.get(`/api/public/projects/${id}`);
    return res.data?.data;
  },

  addProject: async (project: Project, images: File[]) => {
    const formData = new FormData();
    formData.append(
      "project",
      new Blob([JSON.stringify(project)], {
        type: "application/json",
      })
    );
    images.forEach((image) => {
      formData.append("images", image);
    });
    const res = await axios.post("/api/admin/project", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data?.data;
  },

  deleteProject: async (id: number) => {
    const res = await axios.delete(`/api/admin/project/${id}`);
    return res.data?.data;
  },

  updateProject: async (id: number, project: Project, images: File[]) => {
    const formData = new FormData();

    const {
      id: tnn,
      imageUrls,
      createdAt,
      updatedAt,
      deleteAt,
      ...projectWithoutId
    } = project;

    formData.append("project", JSON.stringify(projectWithoutId));

    if (images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const res = await axios.put(`/api/admin/project/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data?.data;
  },
};
