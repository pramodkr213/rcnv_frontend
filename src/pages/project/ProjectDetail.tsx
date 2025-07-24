import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ProjectApi } from "../../api/project";
import "../../css/subpage.css";
import { useState } from "react";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | undefined>("");

  const { data: project } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const res = await ProjectApi.getProjectById(projectId);
      setSelectedImage(res.imageUrls?.[0]);
      return res;
    },
  });

  return (
    <>
      <section className="breadcrum-img-bg">
        <div className="container">
          <a href="#" className="text-decoration-none">
            <h1 className="text-white"> Project Details</h1>
          </a>
        </div>
      </section>

      <section className="bg-subsection pt-4 pb-5 ">
        <div className="container">
          <div className="d-flex justify-content-between mb-3">
            <h4>District ACTIVITIES</h4>
            <div>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>2025-2026</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 mb-3 ">
              <div className="card p-3 dash-card">
                <div className="row">
                  <div className="col-4">
                    <div className="bg-iocn-dash">
                      <img
                        src="/img/icon/card-1.png"
                        alt=""
                        className="dash-iocn"
                      ></img>
                    </div>
                  </div>
                  <div className="col-8">
                    <h5>{project?.cost}</h5>
                    <h6>Cost(INR)</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 mb-3 ">
              <div className="card p-3 dash-card">
                <div className="row">
                  <div className="col-4">
                    <div className="bg-iocn-dash">
                      <img
                        src="/img/icon/card-1.png"
                        alt=""
                        className="dash-iocn"
                      ></img>
                    </div>
                  </div>
                  <div className="col-8">
                    <h5>{project?.beneficiaries}</h5>
                    <h6>Beneficiaries</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 mb-3 ">
              <div className="card p-3 dash-card">
                <div className="row">
                  <div className="col-4">
                    <div className="bg-iocn-dash">
                      <img
                        src="/img/icon/card-1.png"
                        alt=""
                        className="dash-iocn"
                      ></img>
                    </div>
                  </div>
                  <div className="col-8">
                    <h5>{project?.manHours}</h5>
                    <h6>Man Hours</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 mb-3 ">
              <div className="card p-3 dash-card">
                <div className="row">
                  <div className="col-4">
                    <div className="bg-iocn-dash">
                      <img
                        src="/img/icon/card-1.png"
                        alt=""
                        className="dash-iocn"
                      ></img>
                    </div>
                  </div>
                  <div className="col-8">
                    <h5>{project?.rotarians}</h5>
                    <h6>Rotarians Involved</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container ">
          <div className="card p-3">
            <div className="row pt-3">
              <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12 mb-3">
                <div className="gallery-wrapper position-relative">
                  {/* <!-- Main Image --> */}
                  <div
                    className="main"
                    id="mainDisplay"
                    style={{
                      backgroundImage: `url(${selectedImage})`,
                      //   backgroundSize: "cover",
                      //   backgroundPosition: "center",
                    }}
                  ></div>

                  {/* <!-- Thumbnail Scroll with Arrows --> */}
                  <div className="thumb-container">
                    <div className="arrow left">&#10094;</div>

                    <div className="thumb-roll" id="thumbRoll">
                      {project?.imageUrls?.map((image, index) => {
                        return (
                          <div
                            key={index}
                            className="thumb"
                            style={{
                              backgroundImage: `url(${
                                import.meta.env.VITE_API_BASE_URL
                              }${image})`,
                              //   backgroundSize: "cover",
                              //   backgroundPosition: "center",
                            }}
                          ></div>
                        );
                      })}
                    </div>

                    <div className="arrow right">&#10095;</div>
                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="row">
                  <h5>{project?.title}</h5>
                  <p>{project?.detail}</p>
                  <div>
                    <h6>
                      <i className="far fa-calendar-alt orange-icon-color"></i>{" "}
                      {project?.date}
                    </h6>
                  </div>
                  <div className="table-responsive mt-4">
                    <table className="table table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th>Club ID</th>
                          <th>President Name</th>
                          <th>District</th>
                          <th>Contact</th>
                          <th>Email ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{project?.clubId}</td>
                          <td>Jayshree Chhabrani</td>
                          <td>3030</td>
                          <td>9325290311</td>
                          <td>jaishreechhabrani@yahoo.com</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <div className="d-flex justify-content-end">
                      <i className="fas fa-share ms-2 color-blue"></i>
                      <i className="fab fa-facebook-square ms-2 color-blue"></i>
                      <i className="fas fa-envelope ms-2 color-blue"></i>
                      <i className="far fa-copy ms-2 color-blue"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
