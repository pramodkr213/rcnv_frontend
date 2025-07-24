import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MediaImageApi } from "../api/mediacov";
import Pagination from "./Pagination";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
const MediaCoveragePAge: React.FC = () => {


  const [currentPage, setCurrentPage] = useState<number>(0);
   const [totalPages, setTotalPages] = useState<number>(1);

  const [modalOpen, setModalOpen] = useState(false);
   const [activeIndex, setActiveIndex] = useState(0);
   const { data: images = [], isLoading } = useQuery({
     queryKey: ["media-images-page",currentPage],
       queryFn: async () => {
       const res = await MediaImageApi.getMediaImagesPage(currentPage);
       setTotalPages(res.totalPages);
       return res?.data;
     },
   });

   const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

 const { data: mediaImgall = [] } = useQuery({
    queryKey: ["mediaimageall"],

    queryFn: async () => {
      const res = await MediaImageApi.getMediaImages();

      return res;
    },
  });
  return (
    <>
      <section className="breadcrum-img-bg">
        <div className="container"></div>
      </section>

      <div className="container py-4">
        <div className="d-flex justify-content-between">
          <h4>Media Coverage</h4>
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
                <p>Loading...</p>
              ) : images.length > 0 ? (
                images.map((gallery, index) => (
                  <div
                    key={index}
                    className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3"
                  >
                    <img
                      className="myImg img__height"
                      src={gallery.imageUrl}
                      alt={gallery.title}
                      width="100%"
                       onClick={() => {
                      const idx = mediaImgall.findIndex(
                        (g) => g.id === gallery.id
                      );
                      setActiveIndex(idx >= 0 ? idx : 0);
                      setModalOpen(true);
                    }}
                    />
                  </div>
                ))
              ) : (
                <p>No images found for Media Category</p>
              )}
            </div>
          </div>

          {/* Modal Structure Placeholder (optional to activate later) */}
         {totalPages >1 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        )}
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
                          {mediaImgall.map((item, idx) => (
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

export default MediaCoveragePAge;
