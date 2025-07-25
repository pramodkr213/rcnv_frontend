const Footer = () => {
  return (
    <section className="footer_bg">
      <div className="container pt-xl-4 pt-lg-4 pt-md-3 pt-sm-2 pt-2 ">
        <div className="row px-3">
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 mb-3">
            <div className="mt-4">
              <span className="font-w-500 text-white">
                {" "}
                Rotary Club of Nagpur Vision
              </span>
              <p className="footer-text mt-xl-2 mt-lg-3 mt-md-1 mt-sm-1 mt-1 para-text font-14">
                Plor 185, Friends Colony, Katol Road, Nagpur Maharashtra -
                440013
              </p>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 mb-3">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                <h4 className="footer-text mt-xl-4 mt-lg-4 mt-md-2 mt-sm-1 mt-1 mb-3">
                  About Us
                </h4>
                <p className="mb-2 link-font para-text">
                  <span>
                    <a
                      href="#"
                      className="ContactAddress footer-text text-decoration-none font-14"
                    >
                      {" "}
                      About RCNV
                    </a>
                  </span>
                </p>

                <p className="mb-2 link-font para-text">
                  <span>
                    <a
                      href="#"
                      className="ContactAddress footer-text text-decoration-none font-14"
                    >
                      Training
                    </a>
                  </span>
                </p>
                <p className="mb-2 link-font para-text">
                  <span>
                    <a
                      href="#"
                      className="ContactAddress footer-text text-decoration-none font-14"
                    >
                      Placement
                    </a>
                  </span>
                </p>

                <p className="mb-2 link-font para-text">
                  <span>
                    <a
                      href="#"
                      className="ContactAddress footer-text text-decoration-none font-14"
                    >
                      Our Project
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 mb-3 d-none">
            <div className="row ">
              <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                <h4 className="footer-text mt-xl-4 mt-lg-4 mt-md-2 mt-sm-1 mt-1 mb-3">
                  Quick Links
                </h4>

                <p className="mb-2 link-font para-text">
                  <span>
                    <a
                      href="Mission.html"
                      className="ContactAddress footer-text text-decoration-none font-14"
                    >
                      Mission
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-3">
            <div className="row justify-content-center">
              <h4 className="footer-text mt-xl-4 mt-lg-4 mt-md-2 mt-sm-1 mt-1 mb-3">
                Follow on
              </h4>
              <div className="d-flex justify-content-start pt-2">
                <div className="mx-2">
                  <div className="footer-circle">
                    <a
                      href="https://www.facebook.com/RCNV3030"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook icon-footer"></i>
                    </a>
                  </div>
                </div>

                <div className="mx-2">
                  <div className="footer-circle">
                    <a
                      href="https://www.instagram.com/rotaryclubofnagpurvision/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram icon-footer"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid end-footer p-3">
        <div className="container border-top-footer">
          <div className="row pt-3 align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-2">
              <p className="footer-text  mb-0 ">
                {" "}
                Designed & Developed by Prevoyance IT Solutions Pvt. Ltd
              </p>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-2">
              <div className="d-flex justify-content-end">
                <a href="#" className="text-decoration-none text-white">
                  Terms & Conditions
                </a>
                <a href="#" className="text-decoration-none text-white ps-3">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
