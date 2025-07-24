import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProcessingButton from "./ProcessingButton";
import { useState } from "react";
import { ToastMessage } from "../utils/toast";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";
import { CategoryApi, type Category } from "../api/category";
import { SubCategoryApi, type SubCategory } from "../api/subcategory";
import { ClubApi, type Club } from "../api/club";
import { ProjectApi } from "../api/project";

const AddProjectForm = () => {
  const [processing, setProcessing] = useState(false);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [date, setDate] = useState("");
  const [clubId, setClubId] = useState<string>("");
  const [districtName, setDistrictName] = useState("");
  const [destrictNo, setDestrictNo] = useState("");
  const [cost, setCost] = useState("");
  const [beneficiaries, setBeneficiaries] = useState("");
  const [manHours, setManHours] = useState("");
  const [rotarians, setRotarians] = useState("");
  const [rotaractors, setRotaractors] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [email, setEmail] = useState("");
  const [instaLink, setInstaLink] = useState("");
  const [clubProjectId, setClubProjectId] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [subCategoryId, setSubCategoryId] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [presidentName, setPresidentName] = useState("");
  const [presidentContact, setPresidentContact] = useState("");
  const [academicYear, setAcademicYear] = useState<string>(
    `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`
  );

  const { data: clubs = [] } = useQuery({
    queryKey: ["clubs"],
    queryFn: ClubApi.getClubs,
  });

  // Fetch categories for selected club
  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["categories", clubProjectId],
    queryFn: () =>
      clubProjectId
        ? CategoryApi.getCategoryByClubId(Number(clubProjectId))
        : Promise.resolve([]),
    enabled: !!clubProjectId,
  });

  // Fetch subcategories for selected category
  const { data: subcategories = [], isLoading: loadingSubcategories } =
    useQuery({
      queryKey: ["subcategories", categoryId],
      queryFn: () =>
        categoryId
          ? SubCategoryApi.getSubCategoryByCategoryId(Number(categoryId))
          : Promise.resolve([]),
      enabled: !!categoryId,
    });

  const queryClient = useQueryClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
      setImagePreviews(filesArray.map((file) => URL.createObjectURL(file)));
    }
  };

  // Reset category and subcategory when club/category changes
  const handleClubProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClubProjectId(e.target.value);
    setCategoryId("");
    setSubCategoryId("");
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value);
    setSubCategoryId("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setProcessing(true);
    try {
      await ProjectApi.addProject(
        {
          title,
          detail,
          date,
          clubId,
          year: academicYear,
          districtName,
          destrictNo,
          cost: Number(cost),
          beneficiaries: Number(beneficiaries),
          manHours: Number(manHours),
          rotarians: Number(rotarians),
          rotaractors: Number(rotaractors),
          facebookLink,
          email,
          instaLink,
          clubProjectId: Number(clubProjectId),
          categoryId: Number(categoryId),
          subCategoryId: Number(subCategoryId),
          presidentName,
          presidentContact,
        },
        images
      );
      ToastMessage.success("Project added successfully.");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setTitle("");
      setDetail("");
      setDate("");
      setClubId("");
      setDistrictName("");
      setDestrictNo("");
      setCost("");
      setBeneficiaries("");
      setManHours("");
      setRotarians("");
      setRotaractors("");
      setFacebookLink("");
      setEmail("");
      setInstaLink("");
      setClubProjectId("");
      setCategoryId("");
      setSubCategoryId("");
      setImages([]);
      setImagePreviews([]);
      setPresidentName("");
      setPresidentContact("");
    } catch {
      ToastMessage.error("Failed to add project.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Select
            label="Club"
            name="clubProjectId"
            value={clubProjectId}
            onChange={handleClubProjectChange}
            options={clubs.map((club: Club) => ({
              label: club.name,
              value: club.id?.toString() || "",
            }))}
          />
          <Select
            label="Category"
            name="categoryId"
            value={categoryId}
            onChange={handleCategoryChange}
            options={categories.map((category: Category) => ({
              label: category.name,
              value: category.id?.toString() || "",
            }))}
            disabled={!clubProjectId || loadingCategories}
          />
          <Select
            label="Sub Category"
            name="subCategoryId"
            value={subCategoryId}
            onChange={(e) => setSubCategoryId(e.target.value)}
            options={subcategories.map((sub: SubCategory) => ({
              label: sub.name,
              value: sub.id?.toString() || "",
            }))}
            disabled={!categoryId || loadingSubcategories}
          />
          <Input
            label="Project Title"
            placeholder="Enter project title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            label="Project Detail"
            placeholder="Enter project detail"
            name="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
          <Input
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />
          <label htmlFor="academicYear">Year</label>
          <select
            className="pr-4 py-3 w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            id="academicYear"
            aria-label="Select academic year"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
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
        <div className="space-y-6">
          <Input
            label="District Name"
            placeholder="Enter district name"
            name="districtName"
            value={districtName}
            onChange={(e) => setDistrictName(e.target.value)}
          />
          <Input
            label="District No"
            placeholder="Enter district no"
            name="destrictNo"
            value={destrictNo}
            onChange={(e) => setDestrictNo(e.target.value)}
          />
          <Input
            label="Cost"
            placeholder="Enter cost"
            name="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            type="number"
          />
          <Input
            label="Beneficiaries"
            placeholder="Enter number of beneficiaries"
            name="beneficiaries"
            value={beneficiaries}
            onChange={(e) => setBeneficiaries(e.target.value)}
            type="number"
          />
          <Input
            label="Man Hours"
            placeholder="Enter man hours"
            name="manHours"
            value={manHours}
            onChange={(e) => setManHours(e.target.value)}
            type="number"
          />
          <Input
            label="Rotarians"
            placeholder="Enter number of rotarians"
            name="rotarians"
            value={rotarians}
            onChange={(e) => setRotarians(e.target.value)}
            type="number"
          />
          <Input
            label="Rotaractors"
            placeholder="Enter number of rotaractors"
            name="rotaractors"
            value={rotaractors}
            onChange={(e) => setRotaractors(e.target.value)}
            type="number"
          />
        </div>

        <div className="space-y-6">
          <Input
            label="Facebook Link"
            placeholder="Enter Facebook link"
            name="facebookLink"
            value={facebookLink}
            onChange={(e) => setFacebookLink(e.target.value)}
          />
          <Input
            label="Instagram Link"
            placeholder="Enter Instagram link"
            name="instaLink"
            value={instaLink}
            onChange={(e) => setInstaLink(e.target.value)}
          />
        </div>
        <div className="space-y-6">
          <Input
            label="Email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            label="Club Id"
            name="clubId"
            value={clubId}
            onChange={(e) => setClubId(e.target.value)}
          />
        </div>
        <div className="space-y-6">
          <Input
            label="President Name"
            placeholder="Enter president name"
            name="presidentName"
            value={presidentName}
            onChange={(e) => setPresidentName(e.target.value)}
          />
          <Input
            label="President Contact"
            placeholder="Enter president contact"
            name="presidentContact"
            value={presidentContact}
            onChange={(e) => setPresidentContact(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Project Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 border border-gray-200 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {imagePreviews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`preview-${idx}`}
                className="h-20 w-20 object-cover rounded"
              />
            ))}
          </div>
        </div>
        <div></div>
      </div>
      <div className="max-w-sm mx-auto">
        <ProcessingButton type="submit" processing={processing}>
          Add Project
        </ProcessingButton>
      </div>
    </form>
  );
};

export default AddProjectForm;
