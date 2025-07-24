import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/modal.css";
import "../css/style.css";
import Header from "../components/Header";
import { useAuth } from "../context/jobility/AuthContext";
import { Suspense } from "react";
import LoginModal from "../pages/jobility/auth/Login";
import { Loader } from "../components/loader/Loader";

const HomeLayout = () => {
  const { isLoginModalOpen, user } = useAuth();

  return (
    <>
      <Header />
      <Outlet />
      <Footer />

      {isLoginModalOpen && !user?.isAuthenticated && (
        <Suspense fallback={<Loader overlay />}>
          <LoginModal />
        </Suspense>
      )}
    </>
  );
};

export default HomeLayout;
