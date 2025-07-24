import React, { useState } from "react";
import ProjectCard from "../../components/ProjectCard";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProjectApi } from "../../api/project";
import { CategoryApi } from "../../api/category";
import { SubCategoryApi } from "../../api/subcategory";
import cities from "../../data/cities.json";

const ProjectPage: React.FC = () => {
  const { clubId } = useParams();
  const location = useLocation();
  const { clubName } = location.state || {};
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  // const [academicYear, setAcademicYear] = useState<string>(
  //   `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`
  // );
  const getAcademicYear = (): string => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11
  
  return currentMonth >= 6 
    ? `${currentYear}-${currentYear + 1}` 
    : `${currentYear - 1}-${currentYear}`;
};

const [academicYear, setAcademicYear] = useState<string>(getAcademicYear());

  const { data: categories = [] } = useQuery({
    queryKey: ["categories", clubId],
    queryFn: async () => await CategoryApi.getCategoryByClubIdPublic(clubId),
  });

  const { data: subCategories = [] } = useQuery({
    queryKey: ["subCategories", clubId, categoryId],
    queryFn: () =>
      categoryId
        ? SubCategoryApi.getSubCategoryByCategoryIdPublic(categoryId)
        : [],
    enabled: !!categoryId,
  });

  const { data: projects = [] } = useQuery({
    queryKey: [
      "projects",
      clubId,
      categoryId,
      subCategoryId,
      city,
      academicYear,
    ],
    queryFn: () =>
      ProjectApi.getProjects({
        page: 0,
        clubProjectId: clubId,
        categoryId,
        subcategoryId: subCategoryId,
        city: city || undefined,
        academicYear: academicYear || undefined,
      }),
    enabled: !!clubId,
  });

  return (
    <>
      <section className="breadcrum-img-bg">
        <div className="container">
          <a href="#" className="text-decoration-none">
            <h1 className="text-white">{clubName?.toUpperCase()}</h1>
          </a>
        </div>
      </section>
      <div className="container py-4">
        <div className="d-flex justify-content-between">
          <h4></h4>
          <div>
            <select
  className="form-select"
  aria-label="Select academic year"
  value={academicYear}
  onChange={(e) => setAcademicYear(e.target.value)}
>
  {Array.from({ length: 20 }, (_, index) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const baseYear = currentMonth >= 6 ? currentYear : currentYear - 1;
    const startYear = baseYear - index;
    const endYear = startYear + 1;
    
    return (
      <option key={`${startYear}-${endYear}`} value={`${startYear}-${endYear}`}>
        {`${startYear}-${endYear}`}
      </option>
    );
  })}
</select>
          </div>
        </div>
        <div className="card-header p-2 mt-3">
          <div className="row g-3 align-items-center">
            {" "}
            {/* g-3 for consistent spacing */}
            {/* Category Dropdown */}
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setSubCategoryId(null);
                }}
              >
                <option>SELECT CATEGORY</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Subcategory Dropdown */}
            {categoryId && (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setSubCategoryId(e.target.value)}
                >
                  <option>SELECT SUBCATEGORY</option>
                  {subCategories.map((subCategory, index) => (
                    <option key={index} value={subCategory.id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {/* City Dropdown */}
            {categoryId && (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option>SELECT CITY</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {/* Total Count Display */}
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 ms-auto text-end">
              <h5 className="mb-0">
                Total District ACTIVITIES: {projects.length}
              </h5>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          {projects.map((card, index) => (
            <div
              className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-3"
              key={index}
            >
              <ProjectCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
