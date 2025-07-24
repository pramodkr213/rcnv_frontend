import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ClubApi } from "../api/club";
import { useAuth } from "../context/jobility/AuthContext";
import { MdLocalPhone } from "react-icons/md";
import { getDecryptedAuthCookie } from "../utils/cookieCrypto";
import UserSection from "./UserSection";
import { ImageCatApi } from "../api/imageCat";
const Header = () => {
  const { setIsLoginModalOpen } = useAuth();
  const user = getDecryptedAuthCookie();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [openSubSubMenu, setOpenSubSubMenu] = useState(null);
  const [openPcmMenu, setOpenPcmMenu] = useState<string | null>(null);
  const [openPcmbMenu, setOpenPcmbMenu] = useState<string | null>(null);

  const toggleMenu = (menu: any) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setOpenSubMenu(null);
    setOpenSubSubMenu(null);
    setOpenPcmMenu(null);
    setOpenPcmbMenu(null);
  };

  const toggleSubMenu = (submenu: any) => {
    setOpenSubMenu(openSubMenu === submenu ? null : submenu);
    setOpenSubSubMenu(null);
    setOpenPcmMenu(null);
    setOpenPcmbMenu(null);
  };

  const toggleSubSubMenu = (subsubmenu: any) => {
    setOpenSubSubMenu(openSubSubMenu === subsubmenu ? null : subsubmenu);
    setOpenPcmMenu(null);
    setOpenPcmbMenu(null);
  };

  const togglePcmMenu = () => {
    setOpenPcmMenu(openPcmMenu ? null : "pcm");
  };

  const togglePcmbMenu = () => {
    setOpenPcmbMenu(openPcmbMenu ? null : "pcmb");
  };

  const { data: clubs = [] } = useQuery({
    queryKey: ["clobs"],
    queryFn: ClubApi.getClubs,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["Img-cat"],

    queryFn: async () => {
      const res = await ImageCatApi.getImageCatHome();

      return res.content;
    },
  });
  return (
    <section className="header-sticky">
      <section className="top_header py-1">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center py-1">
            <div className="col-xl-8 col-lg-10 col-md-9 col-sm-12 col-6">
              <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-8 col-sm-12 col-12 d-flex justify-content-start align-items-center">
                  <MdLocalPhone className="text-white" />
                  <span className="text-white ml-1 font-12">Call:</span>
                  <a
                    href="tel:9960699908"
                    className="text-white font-12 px-2 text-decoration-none"
                  >
                    +91 9923587842
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-2 col-md-3 col-sm-12 col-6 d-flex justify-content-end align-items-center">
              <div className="mobile-none">
                {!user && (
                  <>
                    <div className="dropdown custom-dropdown">
                      <button
                        className="nav-link text-white btn-login dropdown-toggle"
                        type="button"
                      >
                        Sign up
                      </button>
                      <ul className="dropdown-menu drop-first">
                        <li className="nav-item">
                          <NavLink
                            className="nav-link border-bottom-1px p-2 dropdown-color"
                            to="/signup/candidate"
                          >
                            Candidate Sign-up
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            className="nav-link border-bottom-1px p-2 dropdown-color"
                            to="/signup/employer"
                          >
                            Employer Sign-up
                          </NavLink>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="nav-link text-white btn-login"
                    >
                      {" "}
                      Login
                    </button>
                  </>
                )}
                <button
                  className="text-decoration-none text-white font-size-contact btn"
                  onClick={() => navigate("/contact-us")}
                >
                  {" "}
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <header>
        <div className="container-fluid">
          <section className="header-sticky">
            <header>
              <div className="container-fluid">
                <div className="row d-flex justify-content-between align-items-center pt-1 pb-1">
                  <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-5">
                    <NavLink to="/" className="text-decoration-none">
                      <img src="/img/RCNV-logo.jpeg" alt="" width="70%" />
                    </NavLink>
                  </div>
                  <div className="col-xl-9 col-lg-9 col-md-6 col-sm-6 col-7 d-flex justify-content-end">
                    <nav className="navbar navbar-expand-lg desktop-view mt-2">
                      <div className="container-fluid main-navigation px-0">
                        <div className=" pe-0" id="navbarSupportedContent">
                          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item ">
                              <a
                                className="nav-link "
                                href="#"
                                aria-expanded="false"
                              >
                                About RCNV
                              </a>
                              <ul className="dropdown-menu drop-first">
                                <li className="nav-item">
                                  <NavLink
                                    className="nav-link border-bottom-1px dropdown-color"
                                    to="/about/president"
                                  >
                                    About President
                                  </NavLink>
                                </li>
                                <li className="nav-item">
                                  <NavLink
                                    className="nav-link border-bottom-1px dropdown-color"
                                    to="/about/board"
                                  >
                                    Board 2025-2026
                                  </NavLink>
                                </li>
                                <li className="nav-item">
                                  <NavLink
                                    className="nav-link border-bottom-1px dropdown-color"
                                    to="/about/club-members"
                                  >
                                    Club Members
                                  </NavLink>
                                </li>
                              </ul>
                            </li>
                            <li className="nav-item">
                              <NavLink className="nav-link" to="/directors">
                                {" "}
                                Directors
                              </NavLink>
                            </li>
                            <li className="nav-item ">
                              <a
                                className="nav-link "
                                href="#"
                                aria-expanded="false"
                              >
                                Club Project
                              </a>
                              <ul className="dropdown-menu drop-first">
                                {clubs.map((club, index) => {
                                  return (
                                    <li key={index} className="nav-item">
                                      <NavLink
                                        className="nav-link border-bottom-1px dropdown-color"
                                        to={`/projects/${club.id}`}
                                        state={{ clubName: club.name }}
                                      >
                                        {club.name}
                                      </NavLink>
                                    </li>
                                  );
                                })}
                              </ul>
                            </li>

                            {/* <li className="nav-item ">
                              <a
                                className="nav-link "
                                href="#"
                                aria-expanded="false"
                              >
                                Career Cell
                              </a>
                              <ul className="dropdown-menu drop-first">
                                <li className="nav-item">
                                  <NavLink
                                    className="nav-link border-bottom-1px dropdown-color"
                                    to="/career/after-12th"
                                  >
                                    After 12th
                                  </NavLink>
                                </li>
                                <li className="nav-item">
                                  <NavLink
                                    className="nav-link border-bottom-1px dropdown-color"
                                    to="/career/after-graduation"
                                  >
                                    After Graduation
                                  </NavLink>
                                </li>
                              </ul>
                            </li> */}

                            <li className="nav-item">
                              {/* Career Cell */}
                              <div
                                onMouseEnter={() => toggleMenu("main")}
                                onMouseLeave={() => toggleMenu(null)}
                                className="relative inline-block text-left"
                              >
                                <span
                                  className="nav-link text-decoration-none text-black cursor-pointer"
                                  // onClick={() => toggleMenu("main")}
                                >
                                  Career Cell
                                </span>

                                {openMenu === "main" && (
                                  <div className="absolute left-0 w-56 bg-white shadow-lg border rounded-md z-50">
                                    {/* After 12th */}
                                    <div>
                                      <span
                                        onClick={() =>
                                          toggleSubMenu("after12th")
                                        }
                                        className="flex justify-between w-full px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                      >
                                        After 12th
                                        <span>&#9662;</span>
                                      </span>

                                      {openSubMenu === "after12th" && (
                                        <div className="pl-4">
                                          {/* Science */}
                                          <div>
                                            <span
                                              onClick={() =>
                                                toggleSubSubMenu("science")
                                              }
                                              className="flex justify-between w-full px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                              Science
                                              <span>&#9662;</span>
                                            </span>

                                            {openSubSubMenu === "science" && (
                                              <div className="pl-4">
                                                {/* PCM */}
                                                <span
                                                  onClick={togglePcmMenu}
                                                  className="flex justify-between w-full px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                >
                                                  PCM
                                                  <span>&#9662;</span>
                                                </span>

                                                {openPcmMenu && (
                                                  <div className="pl-4">
                                                    <NavLink
                                                      to="/career?filter=btech"
                                                      className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                    >
                                                      B.Tech
                                                    </NavLink>

                                                    <NavLink
                                                      to="/career?filter=bca"
                                                      className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                    >
                                                      BCA
                                                    </NavLink>
                                                    <NavLink
                                                      to="/career?filter=bsc"
                                                      className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                    >
                                                      B.Sc
                                                    </NavLink>
                                                    <NavLink
                                                      to="/career?filter=barch"
                                                      className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                    >
                                                      B.Arch
                                                    </NavLink>
                                                  </div>
                                                )}

                                                {/* PCMB */}
                                                <div>
                                                  <span
                                                    onClick={togglePcmbMenu}
                                                    className="flex justify-between w-full px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                  >
                                                    PCMB
                                                    <span>&#9662;</span>
                                                  </span>
                                                  {openPcmbMenu === "pcmb" && (
                                                    <div className="pl-4">
                                                      <NavLink
                                                        to="/career?filter=mbbs"
                                                        className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                      >
                                                        MBBS
                                                      </NavLink>
                                                      <NavLink
                                                        to="/career?filter=bds"
                                                        className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                      >
                                                        BDS
                                                      </NavLink>
                                                      <NavLink
                                                        to="/career?filter=bsc-biology"
                                                        className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                      >
                                                        B.Sc (Botany, Nursing,
                                                        etc)
                                                      </NavLink>
                                                      <NavLink
                                                        to="/career?filter=bpharma"
                                                        className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                      >
                                                        B.Pharma
                                                      </NavLink>
                                                      <NavLink
                                                        to="/career?filter=paramedics"
                                                        className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                      >
                                                        Paramedics
                                                      </NavLink>
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            )}
                                          </div>

                                          {/* Commerce */}
                                          <div>
                                            <span
                                              onClick={() =>
                                                toggleSubSubMenu("commerce")
                                              }
                                              className="flex justify-between w-full px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                              Commerce
                                              <span>&#9662;</span>
                                            </span>
                                            {openSubSubMenu === "commerce" && (
                                              <div className="pl-4">
                                                <NavLink
                                                  to="/career?filter=bcom"
                                                  className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                >
                                                  B.Com
                                                </NavLink>
                                                <NavLink
                                                  to="/career?filter=bba"
                                                  className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                >
                                                  BBA
                                                </NavLink>
                                                <NavLink
                                                  to="/career?filter=ca"
                                                  className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                >
                                                  C.A.
                                                </NavLink>
                                                <NavLink
                                                  to="/career?filter=cs"
                                                  className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                >
                                                  C.S.
                                                </NavLink>
                                              </div>
                                            )}
                                          </div>

                                          {/* Arts */}
                                          <div>
                                            <span
                                              onClick={() =>
                                                toggleSubSubMenu("arts")
                                              }
                                              className="flex justify-between w-full px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                              Arts
                                              <span>&#9662;</span>
                                            </span>
                                            {openSubSubMenu === "arts" && (
                                              <div className="pl-4">
                                                <NavLink
                                                  to="/career?filter=ba"
                                                  className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                >
                                                  B.A.
                                                </NavLink>
                                                <NavLink
                                                  to="/career?filter=bjms"
                                                  className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                >
                                                  BJMS
                                                </NavLink>
                                                <NavLink
                                                  to="/career?filter=bfa"
                                                  className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                >
                                                  BFA
                                                </NavLink>
                                                <NavLink
                                                  to="/career?filter=bbs"
                                                  className="block nav-link px-4 py-2 hover:bg-gray-100"
                                                >
                                                  BBS
                                                </NavLink>
                                              </div>
                                            )}
                                          </div>

                                          {/* Law */}
                                          <NavLink
                                            to="/career?filter=llb"
                                            className="block nav-link px-4 py-2"
                                          >
                                            Law (LLB)
                                          </NavLink>
                                        </div>
                                      )}
                                    </div>

                                    {/* After Graduation */}
                                    <div>
                                      <span
                                        onClick={() =>
                                          toggleSubMenu("afterGraduation")
                                        }
                                        className="flex justify-between w-full px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                      >
                                        After Graduation
                                        <span>&#9662;</span>
                                      </span>

                                      {openSubMenu === "afterGraduation" && (
                                        <div className="pl-4">
                                          <NavLink
                                            to="/career?filter=mtech"
                                            className="block nav-link px-4 py-2 hover:bg-gray-100"
                                          >
                                            M.Tech
                                          </NavLink>
                                          <NavLink
                                            to="/career?filter=mca"
                                            className="block nav-link px-4 py-2 hover:bg-gray-100"
                                          >
                                            MCA
                                          </NavLink>
                                          <NavLink
                                            to="/career?filter=mba"
                                            className="block nav-link px-4 py-2 hover:bg-gray-100"
                                          >
                                            MBA
                                          </NavLink>
                                          <NavLink
                                            to="/career?filter=ms"
                                            className="block nav-link px-4 py-2 hover:bg-gray-100"
                                          >
                                            MS
                                          </NavLink>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </li>

                            <li className="nav-item mr-1">
                              <NavLink className="nav-link" to="/t&p">
                                Training & Placement
                              </NavLink>
                            </li>
                            <li className="nav-item mr-1">
                              <NavLink className="nav-link" to="/jobs">
                                jobs
                              </NavLink>
                            </li>
                            <li className="nav-item mr-1">
                              <NavLink className="nav-link" to="/internships">
                                Internships
                              </NavLink>
                            </li>
                            <li className="nav-item ">
                              <a
                                className="nav-link "
                                href="#"
                                aria-expanded="false"
                              >
                                Gallery
                              </a>
                              <ul className="dropdown-menu drop-first">
                                {categories?.length > 0 &&
                                  categories.map((category) => (
                                    <li className="nav-item" key={category.id}>
                                      <NavLink
                                        className="nav-link border-bottom-1px dropdown-color"
                                        to={`/gallary/${category.id}`}
                                      >
                                        {category.imgcatname}
                                      </NavLink>
                                    </li>
                                  ))}
                              </ul>
                            </li>

                            {user && <UserSection />}
                          </ul>
                        </div>
                      </div>
                    </nav>
                    <button
                      className=" d-lg-none"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                    >
                      <i className="fas fa-bars pe-2 "></i>
                    </button>
                  </div>
                  <div className="col-xl-1 col-lg-1 col-md-4 col-sm-4 col-5 contact-none  d-flex justify-content-end pe-0">
                    <img src="/img/logo/logo-prev.png" alt="" width="100%" />
                  </div>
                </div>
              </div>

              <div
                className="offcanvas offcanvas-end offcanvas-none normal-view-none"
                tabIndex={-1}
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
              >
                {/* Offcanvas Header */}
                <div className="offcanvas-header">
                  <img
                    src="/img/RCNV-logo.jpeg"
                    alt="RCNV Logo"
                    className="img-fluid"
                    style={{ width: "100px" }}
                  />
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>

                {/* Offcanvas Body */}
                <div
                  className="offcanvas-body overflow-auto"
                  style={{ maxHeight: "80vh" }}
                >
                  <nav className="d-flex flex-column gap-3">
                    <a href="/" className="text-dark text-decoration-none">
                      Home
                    </a>

                    {/* About RCNV Dropdown */}
                    <details>
                      <summary className="text-dark fw-semibold cursor-pointer">
                        About RCNV
                      </summary>
                      <div className="ms-3 mt-2 d-flex flex-column gap-2">
                        <a
                          href="/about/president"
                          className="text-dark text-decoration-none"
                        >
                          About President
                        </a>
                        <a
                          href="/about/board"
                          className="text-dark text-decoration-none"
                        >
                          Board 2025-2026
                        </a>
                        <a
                          href="/about/club-members"
                          className="text-dark text-decoration-none"
                        >
                          Club Members
                        </a>
                      </div>
                    </details>

                    {/* Projects Dropdown */}
                    <details>
                      <summary className="text-dark fw-semibold cursor-pointer">
                        Projects
                      </summary>
                      <div className="ms-3 mt-2 d-flex flex-column gap-2">
                        {clubs.map((item, i) => (
                          <a
                            key={i}
                            href={`/projects/${item.id}`}
                            className="text-dark text-decoration-none"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </details>

                    <details>
                      <summary className="text-dark fw-semibold cursor-pointer">
                        Career Cell
                      </summary>
                      <div className="ms-3 mt-2 d-flex flex-column gap-2">
                        {/* After 12th */}
                        <details>
                          <summary className="text-dark fw-normal cursor-pointer">
                            After 12th
                          </summary>
                          <div className="ms-3 mt-2 d-flex flex-column gap-2">
                            {/* Science */}
                            <details>
                              <summary className="text-dark cursor-pointer">
                                Science
                              </summary>
                              <div className="ms-3 d-flex flex-column gap-2">
                                {/* PCM */}
                                <details>
                                  <summary className="text-dark cursor-pointer">
                                    PCM
                                  </summary>
                                  <div className="ms-3 d-flex flex-column gap-2">
                                    <a
                                      href="/career?filter=btech"
                                      className="text-dark text-decoration-none"
                                    >
                                      B.Tech
                                    </a>
                                    <a
                                      href="/career?filter=bca"
                                      className="text-dark text-decoration-none"
                                    >
                                      BCA
                                    </a>
                                    <a
                                      href="/career?filter=bsc"
                                      className="text-dark text-decoration-none"
                                    >
                                      B.Sc
                                    </a>
                                    <a
                                      href="/career?filter=barch"
                                      className="text-dark text-decoration-none"
                                    >
                                      B.Arch
                                    </a>
                                  </div>
                                </details>

                                {/* PCMB */}
                                <details>
                                  <summary className="text-dark cursor-pointer">
                                    PCMB
                                  </summary>
                                  <div className="ms-3 d-flex flex-column gap-2">
                                    <a
                                      href="/career?filter=mbbs"
                                      className="text-dark text-decoration-none"
                                    >
                                      MBBS
                                    </a>
                                    <a
                                      href="/career?filter=bds"
                                      className="text-dark text-decoration-none"
                                    >
                                      BDS
                                    </a>
                                    <a
                                      href="/career?filter=bsc-biology"
                                      className="text-dark text-decoration-none"
                                    >
                                      B.Sc (Botany, Nursing, etc)
                                    </a>
                                    <a
                                      href="/career?filter=bpharma"
                                      className="text-dark text-decoration-none"
                                    >
                                      B.Pharma
                                    </a>
                                    <a
                                      href="/career?filter=paramedics"
                                      className="text-dark text-decoration-none"
                                    >
                                      Paramedics
                                    </a>
                                  </div>
                                </details>
                              </div>
                            </details>

                            {/* Commerce */}
                            <details>
                              <summary className="text-dark cursor-pointer">
                                Commerce
                              </summary>
                              <div className="ms-3 d-flex flex-column gap-2">
                                <a
                                  href="/career?filter=bcom"
                                  className="text-dark text-decoration-none"
                                >
                                  B.Com
                                </a>
                                <a
                                  href="/career?filter=bba"
                                  className="text-dark text-decoration-none"
                                >
                                  BBA
                                </a>
                                <a
                                  href="/career?filter=ca"
                                  className="text-dark text-decoration-none"
                                >
                                  C.A.
                                </a>
                                <a
                                  href="/career?filter=cs"
                                  className="text-dark text-decoration-none"
                                >
                                  C.S.
                                </a>
                              </div>
                            </details>

                            {/* Arts */}
                            <details>
                              <summary className="text-dark cursor-pointer">
                                Arts
                              </summary>
                              <div className="ms-3 d-flex flex-column gap-2">
                                <a
                                  href="/career?filter=ba"
                                  className="text-dark text-decoration-none"
                                >
                                  B.A.
                                </a>
                                <a
                                  href="/career?filter=bjms"
                                  className="text-dark text-decoration-none"
                                >
                                  BJMS
                                </a>
                                <a
                                  href="/career?filter=bfa"
                                  className="text-dark text-decoration-none"
                                >
                                  BFA
                                </a>
                                <a
                                  href="/career?filter=bbs"
                                  className="text-dark text-decoration-none"
                                >
                                  BBS
                                </a>
                              </div>
                            </details>

                            {/* Law */}
                            <a
                              href="/career?filter=llb"
                              className="text-dark text-decoration-none"
                            >
                              Law (LLB)
                            </a>
                          </div>
                        </details>

                        {/* After Graduation */}
                        <details>
                          <summary className="text-dark fw-normal cursor-pointer">
                            After Graduation
                          </summary>
                          <div className="ms-3 d-flex flex-column gap-2">
                            <a
                              href="/career?filter=mtech"
                              className="text-dark text-decoration-none"
                            >
                              M.Tech
                            </a>
                            <a
                              href="/career?filter=mca"
                              className="text-dark text-decoration-none"
                            >
                              MCA
                            </a>
                            <a
                              href="/career?filter=mba"
                              className="text-dark text-decoration-none"
                            >
                              MBA
                            </a>
                            <a
                              href="/career?filter=ms"
                              className="text-dark text-decoration-none"
                            >
                              MS
                            </a>
                          </div>
                        </details>
                      </div>
                    </details>
                    <details>
                      <summary className="text-dark fw-semibold cursor-pointer">
                        Gallery
                      </summary>
                      <div className="ms-3 d-flex flex-column gap-2">
                        <a
                          href="/gallary/1"
                          className="text-dark text-decoration-none"
                        >
                          Medical
                        </a>
                        <a
                          href="/gallary/2"
                          className="text-dark text-decoration-none"
                        >
                          Tree Plantation
                        </a>
                      </div>
                    </details>
                    <button
                      data-bs-dismiss="offcanvas"
                      onClick={() => setIsLoginModalOpen(true)}
                      className="text-dark text-decoration-none"
                    >
                      Login
                    </button>

                    <a href="/t&p" className="text-dark text-decoration-none">
                      Traning & Placements
                    </a>

                    <a
                      href="/contact-us"
                      className="text-dark text-decoration-none"
                    >
                      Contact Us
                    </a>
                  </nav>
                </div>
              </div>
            </header>
          </section>
        </div>
      </header>
    </section>
  );
};

export default Header;
