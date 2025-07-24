import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2 } from "lucide-react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { ProjectApi, type Project } from "../api/project";
import { ToastMessage } from "../utils/toast";
import Input from "./Input";
import Textarea from "./Textarea";
import Select from "./Select";
import ProcessingButton from "./ProcessingButton";
import { CategoryApi, type Category } from "../api/category";
import { SubCategoryApi, type SubCategory } from "../api/subcategory";
import { ClubApi, type Club } from "../api/club";

interface UpdateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const UpdateProjectModal: React.FC<UpdateProjectModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    detail: "",
    date: "",
    academicYear: "",
    districtName: "",
    destrictNo: "",
    cost: "",
    beneficiaries: "",
    manHours: "",
    rotarians: "",
    rotaractors: "",
    facebookLink: "",
    email: "",
    instaLink: "",
    presidentName: "",
    presidentContact: "",
    clubId: "",
    clubProjectId: "",
    categoryId: "",
    subCategoryId: "",
  });
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const queryClient = useQueryClient();

  // Fetch clubs
  const { data: clubs = [] } = useQuery({
    queryKey: ["clubs"],
    queryFn: ClubApi.getClubs,
  });

  // Fetch categories for selected club
  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["categories", formData.clubProjectId],
    queryFn: () =>
      formData.clubProjectId
        ? CategoryApi.getCategoryByClubId(Number(formData.clubProjectId))
        : Promise.resolve([]),
    enabled: !!formData.clubProjectId,
  });

  // Fetch subcategories for selected category
  const { data: subcategories = [], isLoading: loadingSubcategories } =
    useQuery({
      queryKey: ["subcategories", formData.categoryId],
      queryFn: () =>
        formData.categoryId
          ? SubCategoryApi.getSubCategoryByCategoryId(
              Number(formData.categoryId)
            )
          : Promise.resolve([]),
      enabled: !!formData.categoryId,
    });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        detail: project.detail || "",
        date: project.date || "",
        academicYear: project.year || "",
        districtName: project.districtName || "",
        destrictNo: project.destrictNo || "",
        cost: project.cost?.toString() || "",
        beneficiaries: project.beneficiaries?.toString() || "",
        manHours: project.manHours?.toString() || "",
        rotarians: project.rotarians?.toString() || "",
        rotaractors: project.rotaractors?.toString() || "",
        facebookLink: project.facebookLink || "",
        email: project.email || "",
        instaLink: project.instaLink || "",
        presidentName: project.presidentName || "",
        presidentContact: project.presidentContact || "",
        clubId: project.clubId || "",
        clubProjectId: project.clubProjectId?.toString() || "",
        categoryId: project.categoryId?.toString() || "",
        subCategoryId: project.subCategoryId?.toString() || "",
      });
      setExistingImages(project.imageUrls || []);
      setNewImages([]);
    }
  }, [project]);

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      projectData,
      images,
    }: {
      id: number;
      projectData: Project;
      images: File[];
    }) => ProjectApi.updateProject(id, projectData, images),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      ToastMessage.success("Project updated successfully.");
      onClose();
    },
    onError: () => {
      ToastMessage.error("Failed to update project.");
    },
    onSettled: () => {
      setProcessing(false);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset category and subcategory when club/category changes
  const handleClubProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      clubProjectId: e.target.value,
      categoryId: "",
      subCategoryId: "",
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: e.target.value,
      subCategoryId: "",
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImages((prev) => [...prev, ...files]);
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("Please enter project title.");
      return;
    }

    if (!formData.detail.trim()) {
      setError("Please enter project detail.");
      return;
    }

    if (!project?.id) {
      setError("Project ID is missing.");
      return;
    }

    setProcessing(true);

    const projectData: Project = {
      ...project,
      title: formData.title.trim(),
      detail: formData.detail.trim(),
      date: formData.date.trim(),
      year: formData.academicYear.trim(),
      districtName: formData.districtName.trim(),
      destrictNo: formData.destrictNo.trim(),
      cost: Number(formData.cost) || 0,
      beneficiaries: Number(formData.beneficiaries) || 0,
      manHours: Number(formData.manHours) || 0,
      rotarians: Number(formData.rotarians) || 0,
      rotaractors: Number(formData.rotaractors) || 0,
      facebookLink: formData.facebookLink.trim(),
      email: formData.email.trim(),
      instaLink: formData.instaLink.trim(),
      presidentName: formData.presidentName.trim(),
      presidentContact: formData.presidentContact.trim(),
      clubId: formData.clubId.trim(),
      clubProjectId: Number(formData.clubProjectId) || 0,
      categoryId: Number(formData.categoryId) || 0,
      subCategoryId: Number(formData.subCategoryId) || 0,
      imageUrls: existingImages,
    };

    updateMutation.mutate({
      id: Number(project.id),
      projectData,
      images: newImages,
    });
  };

  const handleClose = () => {
    setError("");
    setFormData({
      title: "",
      detail: "",
      date: "",
      academicYear: `${
        new Date().getFullYear() - 1
      }-${new Date().getFullYear()}`,
      districtName: "",
      destrictNo: "",
      cost: "",
      beneficiaries: "",
      manHours: "",
      rotarians: "",
      rotaractors: "",
      facebookLink: "",
      email: "",
      instaLink: "",
      presidentName: "",
      presidentContact: "",
      clubId: "",
      clubProjectId: "",
      categoryId: "",
      subCategoryId: "",
    });
    setNewImages([]);
    setExistingImages([]);
    onClose();
  };

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded shadow-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-purple-700">
              Update Project
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Club"
                name="clubProjectId"
                value={formData.clubProjectId}
                onChange={handleClubProjectChange}
                options={clubs.map((club: Club) => ({
                  label: club.name,
                  value: club.id?.toString() || "",
                }))}
              />
              <Select
                label="Category"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleCategoryChange}
                options={categories.map((category: Category) => ({
                  label: category.name,
                  value: category.id?.toString() || "",
                }))}
                disabled={!formData.clubProjectId || loadingCategories}
              />
              <Select
                label="Sub Category"
                name="subCategoryId"
                value={formData.subCategoryId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    subCategoryId: e.target.value,
                  }))
                }
                options={subcategories.map((sub: SubCategory) => ({
                  label: sub.name,
                  value: sub.id?.toString() || "",
                }))}
                disabled={!formData.categoryId || loadingSubcategories}
              />
              <Input
                label="Club Id"
                name="clubId"
                value={formData.clubId}
                onChange={handleInputChange}
              />
              <Input
                label="Project Title"
                placeholder="Enter project title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />

              <div>
                <label htmlFor="academicYear">Year</label>
                <select
                  className="pr-4 py-3 w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                  id="academicYear"
                  name="academicYear"
                  aria-label="Select academic year"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                >
                  {Array.from({ length: 20 }, (_, index) => {
                    const currentYear = new Date().getFullYear();
                    const startYear = currentYear - 1 - index;
                    const endYear = startYear + 1;
                    const label = `${startYear}-${endYear}`;
                    return (
                      <option key={label} value={label}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>

              <Input
                label="District Name"
                placeholder="Enter district name"
                name="districtName"
                value={formData.districtName}
                onChange={handleInputChange}
                required
              />

              <Input
                label="District No"
                placeholder="Enter district number"
                name="destrictNo"
                value={formData.destrictNo}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Cost"
                type="number"
                placeholder="Enter cost"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Beneficiaries"
                type="number"
                placeholder="Enter number of beneficiaries"
                name="beneficiaries"
                value={formData.beneficiaries}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Man Hours"
                type="number"
                placeholder="Enter man hours"
                name="manHours"
                value={formData.manHours}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Rotarians"
                type="number"
                placeholder="Enter number of rotarians"
                name="rotarians"
                value={formData.rotarians}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Rotaractors"
                type="number"
                placeholder="Enter number of rotaractors"
                name="rotaractors"
                value={formData.rotaractors}
                onChange={handleInputChange}
                required
              />

              <Input
                label="President Name"
                placeholder="Enter president name"
                name="presidentName"
                value={formData.presidentName}
                onChange={handleInputChange}
                required
              />

              <Input
                label="President Contact"
                placeholder="Enter president contact"
                name="presidentContact"
                value={formData.presidentContact}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Email"
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Facebook Link"
                placeholder="Enter Facebook link"
                name="facebookLink"
                value={formData.facebookLink}
                onChange={handleInputChange}
              />

              <Input
                label="Instagram Link"
                placeholder="Enter Instagram link"
                name="instaLink"
                value={formData.instaLink}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Textarea
                label="Project Detail"
                placeholder="Enter project detail"
                name="detail"
                value={formData.detail}
                onChange={handleInputChange}
                required
                rows={4}
              />
            </div>

            {/* Existing Images Preview */}
            {existingImages.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Existing Images
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {existingImages.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Project image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Images Preview */}
            {newImages.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Images
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {newImages.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`New image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add New Images
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Plus className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <div className="flex-1">
                <ProcessingButton type="submit" processing={processing}>
                  Update Project
                </ProcessingButton>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdateProjectModal;
