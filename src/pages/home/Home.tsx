import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HeroImageApi } from "../../api/hero";
import { GalleryApi, type GalleryImage } from "../../api/gallery";
import { SponsorsApi } from "../../api/sponsors";
import { getDecryptedAuthCookie } from "../../utils/cookieCrypto";
import MediaAndEvents from "./MediaAndEvents ";
import jobs from "../../data/jobData.json";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Loader } from "../../components/loader/Loader";
import Carousel from "bootstrap/js/dist/carousel";
import { getJobsApi, getJobsBySectorApi, type SectorFilter } from "../../api/public/public";
import type { JobFilterState } from "../../context/jobility/JobFilterContext";
import type { JobCard } from "../../types/JobCard";
import { MemberApi } from "../../api/clubmem";
const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalImage, setModalImage] = useState("");
  const [modalCaption, setModalCaption] = useState("");

  const [showAll, setShowAll] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  

  const sectors = [
    "All Sectors",
    "Information Technology",
    "Sales",
    "Education",
    "Realestate",
    "Others",
  ];

  const [activeTab, setActiveTab] = useState("All Sectors");

  const filteredBySector =
    activeTab === "All Sectors"
      ? jobs
      : jobs.filter((job) => job.sector === activeTab);

  const { data: jobsBySector  = [] } = useQuery({
  queryKey: ["jobsBySector", filteredBySector],
  queryFn: async () => {
    const filter: SectorFilter = {
      page: 0,
      days: 1,
      sector: activeTab === "All Sectors" ? "" : activeTab
      
    };
    const res = await getJobsBySectorApi(filter);
    return res?.data as JobCard[];
  },
  keepPreviousData: true,
});


  // Slice if showAll is false
  const filteredJobs = showAll
    ? jobsBySector
    : jobsBySector.slice(0, 4);

  // Determine if the "View More" / "View Less" button should be shown
  const showViewToggle = filteredJobs.length > 4;

  useEffect(() => {
    const user = getDecryptedAuthCookie();
    if (user?.role === "ADMIN") {
      // navigate("/admin/dashboard");
      window.location.href = "/admin/dashboard";
    } else if (user?.role === "EMPLOYER") {
      // navigate("/employer/dashboard");
      window.location.href = "/employer/dashboard";
    }
  }, []);

  const { data: images = [] } = useQuery({
    queryKey: ["images"],
    queryFn: HeroImageApi.getHeroImages,
  });

   const { data: birthdays = [] } = useQuery({
    queryKey: ["birthdays"],
    queryFn: MemberApi.getMembirthdays,
  });


  // const { data: jobs1 = [] } = useQuery({
  //   queryKey: ["jobs1"],
  //   queryFn: async () => {
  //     const filter: JobFilterState = {
  //       page: 0,
  //       role: "",
  //       location: "",
  //       experience: "",
  //       jobType: "",
  //       //salary: [5000, 50000],
  //       days: 1,
  //       mode: "",
  //       sector:""
  //     };
  //     const res = await getJobsApi(filter);
  //     return res?.data as JobCard[];
  //   },
  // });

  console.log(jobsBySector);

  const { data: galleries = [], isLoading: isGalleryLoading } = useQuery({
    queryKey: ["galleries", page],
    queryFn: async () => {
      const res = await GalleryApi.getGalleryImages(page);
      setTotalPages(res?.totalCount);
      return res?.data as GalleryImage[];
    },
  });

  const { data: sponsors = [] } = useQuery({
    queryKey: ["sponsors"],
    queryFn: SponsorsApi.getSponsors,
  });

  const openModal = (src: string, alt: string | undefined,index:number) => {
    setModalImage(src);
    setModalCaption(alt ? alt : "");
    setModalOpen(true);
      setActiveIndex(index);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
 const { data: gallaryImgall = [] } = useQuery({
    queryKey: ["gallary-imageall"],

    queryFn: async () => {
      const res = await GalleryApi.showGallaryallHome();

      return res.data;
    },
  });
  useEffect(() => {
    const el = document.querySelector("#carouselExampleControls");
    if (el) {
      new Carousel(el, {
        interval: 3000,
        ride: "carousel",
      });
    }
  }, [images]);

  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          {images.map((item, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={item.imageUrl}
                className="d-block w-100 banner-height"
                alt={item.title}
              />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section className="">
        <div className="container pt-3">
          <div className="d-flex justify-content-center">
            <h3 className="heading-with-border">About RCNV</h3>
          </div>
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
              <p className="mt-3">
                Rotary Club of Nagpur Vision is one of central India's premier
                service organizations engaged in the service of the community
                and needy. It comprises over 200 top professionals, business
                people and high profile individuals from all walks of society
                working together for a common cause with the motto "Service
                Above Self". RCNV has created several benchmarks in and around
                Nagpur city with the zeal of its members, its dynamic
                leadership, its positive glo-cal outlook and an unending desire
                to make the world a better place to live in. RCNV has several
                flagship projects that are held on an annual basis and numerous
                service projects which are perennially organized. Community
                service projects of every magnitude require support from local
                and national businesses through their CSR initiatives. At RCNV,
                we ensure that we give our supporters and sponsors true value
                for their money and aid reaches needy beneficiaries in a
                transparent manner. A look at a few will give you a better idea
                of the scope of the club's activities. It will also give you an
                overview of the project you choose to support. Our
                representatives can meet you personally to discuss in detail
                about any project that might interest you
              </p>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
              <img src="./img/About-us.jpg" alt="" width="100%" />
            </div>
          </div>
        </div>
      </section>

      <section className="my-4" id="jobs-latest" style={{border: "1px solid #e0e0e0"}}>
        <div className="container">
          <div className="d-flex justify-content-center">
            <h3 className="heading-with-border">Jobs</h3>
          </div>

          {/* <div className="row mt-3">
            <ul className="nav nav-pills mb-3 bg-tabs-heading" role="tablist">
              {sectors.map((sector) => (
                <li className="nav-item" role="presentation" key={sector}>
                  <button
                    className={`nav-link btn-padding ${
                      activeTab === sector ? "active" : ""
                    }`}
                    type="button"
                    onClick={() => {
                      setActiveTab(sector);
                      setShowAll(false); // Reset view more when changing tab
                    }}
                  >
                    {sector}
                  </button>
                </li>
              ))}
            </ul>

            <div className="tab-content">
              <div className="tab-pane fade show active">
                <div className="row pt-2">
                  {jobsBySector.map((job, index) => (
                    <Link
                      key={index}
                      to={`/jobs/detail/${job.id}`}
                      className="col-xl-6 col-lg-6 col-md-12 col-sm-12 text-decoration-none col-12 mb-4"
                    >
                      <div className="card p-3 card-bottom-colr box-shadow">
                        <div className="row justify-content-center align-items-center">
                          <div className="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-4">
                            <div className="bg-circle overflow-hidden">
                              <img
                                src={job.logo}
                                className="flip-core-icon"
                                width="100%"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-xl-9 col-lg-8 col-md-8 col-sm-8 col-8">
                            <h5 className="color-blue title-card-inner-hover">
                              {job.title}
                            </h5>
                            <p className="mb-2">{job.companyName}</p>
                            <div className="d-flex">
                              <div>
                                <i className="far fa-edit"></i>
                                <span className="px-2">
                                  {job.minExperience} - {job.maxExperience}{" "}
                                  years
                                  <span className="px-2"> |</span>
                                </span>
                              </div>
                              <div className="px-2">
                                <i className="fas fa-map-marker-alt"></i>
                                <span className="px-2">{job.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {showViewToggle && (
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-primary text-white"
                      onClick={() => setShowAll((prev) => !prev)}
                    >
                      {showAll ? "View Less" : "View More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div> */}

          <div className="row mt-3">
  <ul className="nav nav-pills mb-3 bg-tabs-heading" role="tablist">
    {sectors.map((sector) => (
      <li className="nav-item" role="presentation" key={sector}>
        <button
          className={`nav-link btn-padding ${activeTab === sector ? "active" : ""}`}
          type="button"
          onClick={() => {
            setActiveTab(sector);
            setShowAll(false); // Reset view more on tab switch
          }}
        >
          {sector}
        </button>
      </li>
    ))}
  </ul>

  <div className="tab-content">
    <div className="tab-pane fade show active">
      
        {jobsBySector.length === 0 ? (
          <div className="text-center my-4">
            <p className="text-muted">No jobs available in this sector.</p>
          </div>
        ):(

          <>
          <div className="row pt-2">
           {(showAll ? jobsBySector : jobsBySector.slice(0, 4)).map((job, index) => (
          <Link
            key={index}
            to={`/jobs/detail/${job.id}`}
            className="col-xl-6 col-lg-6 col-md-12 col-sm-12 text-decoration-none col-12 mb-4"
          >
            <div className="card p-3 card-bottom-colr box-shadow">
              <div className="row justify-content-center align-items-center">
                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className="bg-circle overflow-hidden">
                    <img
                      src={job.logo}
                      className="flip-core-icon"
                      width="100%"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 col-md-8 col-sm-8 col-8">
                  <h5 className="color-blue title-card-inner-hover">{job.title}</h5>
                  <p className="mb-2">{job.companyName}</p>
                  <div className="d-flex">
                    <div>
                      <i className="far fa-edit"></i>
                      <span className="px-2">
                        {job.minExperience} - {job.maxExperience} years
                        <span className="px-2">|</span>
                      </span>
                    </div>
                    <div className="px-2">
                      <i className="fas fa-map-marker-alt"></i>
                      <span className="px-2">{job.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {jobsBySector.length > 4 && (
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary text-white"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      )}
          </>
        )}
       
    </div>
  </div>
</div>

        </div>
      </section>
      {/* <!-- mission goal section start --> */}
      <section className="background-imgcard d-none">
        <div className="container">
          <div className="d-flex justify-content-center">
            <h1 className="text-center  heading-font-weight gallery-heading ">
              Projects
            </h1>
          </div>
          <div className="col-xl-8 col-lg-9 col-md-12 col-sm-12 col-12 pt-5">
            <div className="row clearfix pt-4">
              {/* <!-- Mission block --> */}
              <div className="col-xl-4 col-lg-6 col-md-6 mission-block">
                <div className="inner-box">
                  <div className="image">
                    <div className="caption">
                      <div>
                        <div className="icon-box">
                          <img
                            src="/img/icon/community.png"
                            alt=""
                            width="25%"
                          />
                        </div>
                        <h4>Community Services</h4>
                      </div>
                    </div>

                    {/* <div className="overlay-box">
                      <div className="overlay-inner">
                        <div className="content">
                          <div className="text">
                            Nostrud exercitation ullamco laboris nisi utm
                            aliquip sed duis aute lorem ipsum.
                          </div>
                          <h4>Community Services</h4>
                          <div className="icon-box">
                            <span className="flaticon-love-and-romance"></span>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <!-- end --> */}
              {/* <!-- Mission block --> */}
              <div className="col-xl-4 col-lg-6 col-md-6 mission-block">
                <div className="inner-box">
                  <div className="image">
                    <div className="caption">
                      <div>
                        <div className="icon-box">
                          {" "}
                          <img
                            src="/img/icon/district.png"
                            alt=""
                            width="25%"
                          />
                        </div>
                        <h4>District Projects</h4>
                      </div>
                    </div>

                    {/* <div className="overlay-box">
                      <div className="overlay-inner">
                        <div className="content">
                          <div className="text">
                            Nostrud exercitation ullamco laboris nisi utm
                            aliquip sed duis aute lorem ipsum.
                          </div>
                          <h4>District Projects</h4>
                          <div className="icon-box">
                            <span className="flaticon-doctor"></span>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <!-- end --> */}
              {/* <!-- Mission block --> */}
              <div className="col-xl-4 col-lg-6 col-md-6 mission-block">
                <div className="inner-box">
                  <div className="image">
                    <div className="caption">
                      <div>
                        <div className="icon-box">
                          <img src="/img/icon/club.png" alt="" width="25%" />
                        </div>
                        <h4>Club Projects</h4>
                      </div>
                    </div>

                    {/* <div className="overlay-box">
                      <div className="overlay-inner">
                        <div className="content">
                          <div className="text">
                            Nostrud exercitation ullamco laboris nisi utm
                            aliquip sed duis aute lorem ipsum.
                          </div>
                          <h4>Club Projects</h4>
                          <div className="icon-box">
                            <span className="flaticon-cancer"></span>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <!-- end --> */}
              {/* <!-- Mission block --> */}
              <div className="col-xl-4 col-lg-6 col-md-6 mission-block">
                <div className="inner-box">
                  <div className="image">
                    <div className="caption">
                      <div>
                        <div className="icon-box">
                          <img
                            src="/img/icon/vocational.png"
                            alt=""
                            width="25%"
                          />
                        </div>
                        <h4>Vocational Services</h4>
                      </div>
                    </div>

                    {/* <div className="overlay-box">
                      <div className="overlay-inner">
                        <div className="content">
                          <div className="text">
                            Nostrud exercitation ullamco laboris nisi utm
                            aliquip sed duis aute lorem ipsum.
                          </div>
                          <h4>Vocational Services</h4>
                          <div className="icon-box">
                            <span className="flaticon-support"></span>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <!-- end --> */}
              {/* <!-- Mission block --> */}
              <div className="col-xl-4 col-lg-6 col-md-6 mission-block">
                <div className="inner-box">
                  <div className="image">
                    <div className="caption">
                      <div>
                        <div className="icon-box">
                          <img
                            src="/img/icon/international.png"
                            alt=""
                            width="25%"
                          />
                        </div>
                        <h4>International Services</h4>
                      </div>
                    </div>

                    {/* <div className="overlay-box">
                      <div className="overlay-inner">
                        <div className="content">
                          <div className="text">
                            Nostrud exercitation ullamco laboris nisi utm
                            aliquip sed duis aute lorem ipsum.
                          </div>
                          <h4>International Services</h4>
                          <div className="icon-box">
                            <span className="flaticon-blood"></span>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <!-- end --> */}
              {/* <!-- Mission block --> */}
              <div className="col-xl-4 col-lg-6 col-md-6 mission-block">
                <div className="inner-box">
                  <div className="image">
                    <div className="caption">
                      <div>
                        <div className="icon-box">
                          <img src="/img/icon/public.png" alt="" width="25%" />
                        </div>
                        <h4>Public Image Initiatives</h4>
                      </div>
                    </div>

                    {/* <div className="overlay-box">
                      <div className="overlay-inner">
                        <div className="content">
                          <div className="text">
                            Nostrud exercitation ullamco laboris nisi utm
                            aliquip sed duis aute lorem ipsum.
                          </div>
                          <h4>Public Image Initiatives</h4>
                          <div className="icon-box">
                            <span className="flaticon-monitor"></span>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <!-- end --> */}
            </div>
          </div>
        </div>
      </section>

<section className="p-4" style={{display:"none"}}>
  <h2 className="text-xl font-semibold mb-4">Birthdays & Anniversaries</h2>

  {birthdays.length === 0 ? (
    <p className="text-gray-500">No data</p>
  ) : (
    <div className="flex overflow-x-auto space-x-3 pb-2 flex-nowrap scroll-smooth">
      {birthdays.map((person) => (
        <div
          key={person.id}
          className="w-48 flex-shrink-0 bg-white shadow rounded-lg p-3"
        >
          <h3 className="text-base font-medium truncate">{person.name}</h3>
          <p className="text-sm text-gray-600">{person.type}</p>
          <p className="text-xs text-gray-500">
            {new Date(person.date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )}
</section>

        <section className="container mt-4">
        <MediaAndEvents />
      </section>

      {/* <!-- mission goal section end --> */}
      <section className="my-10">
        <div className="container mt-5">
          <div className="d-flex justify-content-center">
            <h1 className="text-center  heading-font-weight gallery-heading ">
              Gallery
            </h1>
          </div>
            {isGalleryLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
              <Loader />
            </div>
          ) : (
          <div className="row pt-5">
            
            {galleries.map((gallery, index) => {
              return (
                <div
                  key={index}
                  className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-3"
                >
                  <img
                    className="myImg img__height"
                    src={`${gallery.imageUrl}`}
                    alt={gallery.title}
                    width="100%"
                   onClick={() => {
                        const idx: number = (gallaryImgall as Array<{ id: string | number }>).findIndex(
                        (g: { id: string | number }) => g.id === gallery.id
                        );
                      setActiveIndex(idx >= 0 ? idx : 0);
                      setModalOpen(true);
                    }}
                  />
                </div>
              );
            })}
          </div> )}

          <div className="d-flex justify-content-end mt-4">
            <nav>
              <ul className="pagination mb-0">
                {/* Previous Button */}
                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  >
                    ←
                  </button>
                </li>

                {/* Dynamic Page Numbers with Ellipsis */}
                {Array.from(
                  { length: Math.ceil(totalPages / 6) },
                  (_, index) => {
                    // show first, last, and near current pages
                    if (
                      index === 0 ||
                      index === Math.ceil(totalPages / 6) - 1 ||
                      Math.abs(index - page) <= 1
                    ) {
                      return (
                        <li
                          key={index}
                          className={`page-item ${
                            page === index ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setPage(index)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      );
                    }

                    // Show ellipsis
                    if (
                      (index === page - 2 && index > 1) ||
                      (index === page + 2 &&
                        index < Math.ceil(totalPages / 6) - 2)
                    ) {
                      return (
                        <li key={index} className="page-item disabled">
                          <span className="page-link">...</span>
                        </li>
                      );
                    }

                    return null;
                  }
                )}

                {/* Next Button */}
                <li
                  className={`page-item ${
                    page + 1 >= Math.ceil(totalPages / 6) ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    →
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/* <div id="myModal" className="modal" onclick="document.getElementById('myModal').style.display='none'">
            <span className="close" onclick="document.getElementById('myModal').style.display='none'">&times;</span>
            <img className="modal-content" id="img01">
            <div id="caption"></div>
        </div>  */}

        <div id="myModal" className="modal">
          <span className="close" id="closeBtn">
            &times;
          </span>
          <img alt="" className="modal-content" id="img01" />
          <div id="caption"></div>
        </div>
      </section>
      <section className="bg-blue-color desktop-view-none-client">
        <div className="container">
          <h1 className="text-white font-weight-800 text-center">
            Our Past Sponsors
          </h1>
          <div className="row mt-5">
            {sponsors.map((sponsor, index) => {
              return (
                <div
                  key={index}
                  className="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 padding-both"
                >
                  <img
                    src={`${sponsor.imageUrl}`}
                    className="w-[244px] h-[139px] logo-width-mobile mb-1"
                    alt={sponsor.title}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* <!-- new section start --> */}

      {/* <section>
        <div className="container mb-3">
          <div className="d-flex justify-content-center pt-5">
            <h1 className="text-center  heading-font-weight gallery-heading ">
              This Week in Rotary
            </h1>
          </div>
          <div className="row pt-5">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <h5 className="text-center">Speaker on 10th June 2025</h5>
              <img
                src="./img/Program-1.png"
                width="100%"
                alt=""
                className="height-program pt-3"
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <h5 className="text-center">Speaker on 20th June 2025</h5>
              <img
                src="./img/Program-2.png"
                width="100%"
                alt=""
                className="height-program pt-3"
              />
            </div>
          </div>
        </div>
      </section> */}

    

      {/* Modal */}
      {/* {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={closeModal}
        >
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                top: "-40px",
                right: "-60px",
                fontSize: "60px",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={closeModal}
            >
              &times;
            </span>
            <img
              src={modalImage}
              alt={modalCaption}
              style={{
                maxWidth: "90vw",
                maxHeight: "80vh",
                borderRadius: "8px",
              }}
            />
            <div
              style={{ color: "#fff", textAlign: "center", marginTop: "10px" }}
            >
              {modalCaption}
            </div>
          </div>
        </div>
      )} */}
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
                  {gallaryImgall.map((item:any, idx:any) => (
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


    </>
  );
};

export default Home;
