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
  const [newImages, setNewImages] = useState<File[]>([]); // only one new image allowed
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

  // Single image upload only
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImages([file]); // replace previous image with new one
    }
  };

  const removeNewImage = () => {
    setNewImages([]);
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
            <h2 className="text-2xl font-bold text-purple-700">Update Project</h2>
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
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
              <Textarea
                label="Detail"
                name="detail"
                value={formData.detail}
                onChange={handleInputChange}
              />
              <Input
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
              />
              <Input
                label="Academic Year"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleInputChange}
              />
              <Input
                label="District Name"
                name="districtName"
                value={formData.districtName}
                onChange={handleInputChange}
              />
              <Input
                label="District No"
                name="destrictNo"
                value={formData.destrictNo}
                onChange={handleInputChange}
              />
              <Input
                label="Cost"
                name="cost"
                type="number"
                value={formData.cost}
                onChange={handleInputChange}
              />
              <Input
                label="Beneficiaries"
                name="beneficiaries"
                type="number"
                value={formData.beneficiaries}
                onChange={handleInputChange}
              />
              <Input
                label="Man Hours"
                name="manHours"
                type="number"
                value={formData.manHours}
                onChange={handleInputChange}
              />
              <Input
                label="Rotarians"
                name="rotarians"
                type="number"
                value={formData.rotarians}
                onChange={handleInputChange}
              />
              <Input
                label="Rotaractors"
                name="rotaractors"
                type="number"
                value={formData.rotaractors}
                onChange={handleInputChange}
              />
              <Input
                label="Facebook Link"
                name="facebookLink"
                value={formData.facebookLink}
                onChange={handleInputChange}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Input
                label="Instagram Link"
                name="instaLink"
                value={formData.instaLink}
                onChange={handleInputChange}
              />
              <Input
                label="President Name"
                name="presidentName"
                value={formData.presidentName}
                onChange={handleInputChange}
              />
              <Input
                label="President Contact"
                name="presidentContact"
                value={formData.presidentContact}
                onChange={handleInputChange}
              />
            </div>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Existing Images
                </label>
                <div className="flex gap-4 overflow-x-auto mb-4">
                  {existingImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative group w-32 h-32 flex-shrink-0 rounded-lg border overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`Existing image ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(idx)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove image"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Image Preview */}
            {newImages.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Image
                </label>
                <div className="relative group w-32 h-32">
                  <img
                    src={URL.createObjectURL(newImages[0])}
                    alt="New image preview"
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={removeNewImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove new image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Add New Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add New Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Plus className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium mt-2">{error}</p>
            )}

            <ProcessingButton
              processing={processing}
              type="submit"
              className="w-full mt-6"
            >
              Update Project
            </ProcessingButton>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdateProjectModal;
