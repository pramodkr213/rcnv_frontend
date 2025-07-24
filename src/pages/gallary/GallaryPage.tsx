import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GalleryApi } from "../../api/gallery";
import Pagination from "../../components/Pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ImageCatApi } from "../../api/imageCat";
import "swiper/css";
import "swiper/css/navigation";
import { Loader } from "../../components/loader/Loader";
const ProjectPage: React.FC = () => {
  const { category_id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category_id || "");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  // const categories = [
  //   { label: "Select Category", value: "" },
  //   { label: "Medical", value: "1" },
  //   { label: "TreePlantation", value: "2" },
  // ];
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // React Query to fetch gallery images
  const { data: gallaryImg = [], isLoading } = useQuery({
    queryKey: ["gallaryimage", selectedCategory,currentPage],

    queryFn: async () => {
      const res = await GalleryApi.showGallarybyid(
        selectedCategory,
        currentPage
      );
      setTotalPages(res.totalPages);
      return res.content;
    },
    enabled: !!selectedCategory, // Prevent API call on empty category
  });

  const { data: gallaryImgall = [] } = useQuery({
    queryKey: ["gallaryimageall", selectedCategory],

    queryFn: async () => {
      const res = await GalleryApi.showGallaryall(selectedCategory);

      return res.data;
    },
  });


   const { data: categories = [] } = useQuery({
    queryKey: ["Img-cat"],

    queryFn: async () => {
      const res = await ImageCatApi.getImageCatHome();

      return res.content;
    },
  });
  // Sync selectedCategory with category_id from URL
  useEffect(() => {
    if (category_id) {
      setSelectedCategory(category_id);
    }
  }, [category_id]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <section className="breadcrum-img-bg">
        <div className="container"></div>
      </section>

      <div className="container py-4">
        <div className="d-flex justify-content-between">
          <h4>Gallary</h4>
        </div>

        <div className="card-header p-2 mt-3">
          <div className="row g-3 align-items-center">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <select
                className="form-select"
                aria-label="Select Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.imgcatname}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <section className="my-10">
          <div className="container mt-5">
            <div className="d-flex justify-content-center">
              {/* <h1 className="text-center heading-font-weight gallery-heading">
                Gallery
              </h1> */}
            </div>

            <div className="row pt-5">
              {isLoading ? (
                 <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
              <Loader />
            </div>
              ) : gallaryImg.length > 0 ? (
                gallaryImg.map((gallery, index) => (
                  <div
                    key={index}
                    className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3"
                    onClick={() => {
                      const idx = gallaryImgall.findIndex(
                        (g) => g.id === gallery.id
                      );
                      setActiveIndex(idx >= 0 ? idx : 0);
                      setModalOpen(true);
                    }}
                  >
                    <img
                      className="myImg img__height"
                      src={gallery.imageUrl}
                      alt={gallery.title}
                      width="100%"
                    />
                  </div>
                ))
              ) : (
                <p>No images found for this category.</p>
              )}
            </div>
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          )}
          {/* Modal Structure Placeholder (optional to activate later) */}
          <div id="myModal" className="modal">
            <span className="close" id="closeBtn">
              &times;
            </span>
            <img alt="" className="modal-content" id="img01" />
            <div id="caption"></div>
          </div>

          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0"
                onClick={() => setModalOpen(false)}
              />

              <div className="relative w-full max-w-4xl mx-auto">
                <Swiper
                  modules={[Navigation]}
                  navigation
                  initialSlide={activeIndex}
                  spaceBetween={20}
                  slidesPerView={1}
                  loop={true}
                >
                  {gallaryImgall.map((item, idx) => (
                    <SwiperSlide key={item.id || idx}>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="object-contain w-full max-h-[80vh] rounded-lg"
                      />
                      {item.title && (
                        <p className="text-white text-center mt-2">
                          {item.title}
                        </p>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>

                <span
                  style={{
                    position: "absolute",
                    top: "-30px",
                    right: "-30px",
                    fontSize: "40px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => setModalOpen(false)}
                >
                  &times;
                </span>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default ProjectPage;
