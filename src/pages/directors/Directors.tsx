import { useQuery } from "@tanstack/react-query";
import { DirectorApi } from "../../api/directors";

const Directors = () => {
  const { data: directors = [] } = useQuery({
    queryKey: ["directors"],
    queryFn: DirectorApi.getDirectorsPublic,
  });
  return (
    <section className="mt-3">
      <div className="container">
        {/* <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-6 col-md-12 col-12 d-flex ">
            <div className=" mb-3">
              <input
                type="text"
                className="form-control border-radius-input"
                placeholder="Enter Keywords.."
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="ms-2">
              <button type="button" className="btn  btn_free">
                Search
              </button>
            </div>
          </div>
        </div> */}
        <div className="row mt-3">
          {directors.map((director, index) => {
            return (
              <div
                key={index}
                className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-3"
              >
                <div className="card px-2 py-4 d-flex justify-content-center align-items-center card-shadow-director">
                  <div className="profile-director mt-3">
                    <img
                      src={director.imageUrl}
                      width="100%"
                      className="border-radius-img"
                    />
                  </div>
                  <p className="pt-3 fw-bold">{director.designation}</p>
                  <p className="">{director.name}</p>
                  {/* <a href="#" className="text-decoration-none mt-2">
                    <i className="far fa-envelope"></i> {director.email}
                  </a> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Directors;
