import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MediaCoveragePAge from "../components/MediaCovPage.tsx";
import UpEvtPage from "../pages/UpEvtPage.tsx";
import AddClubMember from "../pages/AddClubMembers.tsx";
import AllClubMembers from "../pages/AllClubMembers.tsx";
import CareerePage from "../pages/jobs/CareerePage.tsx";
import Enginnering from "../pages/enginnering.tsx";
// import AdminLayout from "../layout/AdminLayout";
// import { type User } from "../context/AuthContext";
// import { decryptFromCookie } from "../utils/cookieCrypto";
const HomeLayout = lazy(() => import("../layout/HomeLayout.tsx"));
const AdminLogin = lazy(() => import("../pages/Login"));
const AddHeroImage = lazy(() => import("../pages/AddHeroImage"));
const AddGalleryImages = lazy(() => import("../pages/AddGalleryImages"));
const AddSponsors = lazy(() => import("../pages/AddSponsors"));
const AddClub = lazy(() => import("../pages/AddClub"));
const AddCategory = lazy(() => import("../pages/AddCategory"));
const AddSubCategory = lazy(() => import("../pages/AddSubCategory"));
const AddProject = lazy(() => import("../pages/AddProject"));
const AllProjects = lazy(() => import("../pages/AllProjects"));
const AddDirectors = lazy(() => import("../pages/AddDirectors"));
const AddDirectries = lazy(() => import("../pages/AddDirectries"));
const Home = lazy(() => import("../pages/home/Home.tsx"));
const ProjectDetail = lazy(() => import("../pages/project/ProjectDetail.tsx"));
const ProtectedLayout = lazy(() => import("../layout/ProtectedLayout.tsx"));
const ProjectPage = lazy(() => import("../pages/project/ProjectPage.tsx"));
const GallaryPage = lazy(()=>import('../pages/gallary/GallaryPage.tsx'))
const AddUpcomingEvents = lazy(()=> import("../components/AddUpcomingEvents.tsx"));
const AddMediaCov = lazy(() => import("../pages/AddMediaCov.tsx"));
const AddImageCat = lazy(() => import("../pages/AddImageCat.tsx"));
const BookMark = lazy(()=> import("../pages/student/BookMark.tsx"));
const CandidateSignUp = lazy(
  () => import("../pages/jobility/auth/Register.tsx")
);
const EmployerSignUp = lazy(
  () =>
    import(
      "../pages/jobility/auth/employer/registration/EmployerRegistration.tsx"
    )
);
const AdminDashboard = lazy(
  () => import("../pages/admin/dashboard/Dashboard.tsx")
);
const EmployerDashboard = lazy(
  () => import("../pages/employer/dashboard/Dashboard.tsx")
);
const Directors = lazy(() => import("../pages/directors/Directors.tsx"));
const EmployerList = lazy(
  () => import("../pages/admin/employers/EmployerList.tsx")
);
const JobList = lazy(() => import("../pages/admin/joblist/JobList.tsx"));
const InternshipList = lazy(
  () => import("../pages/admin/internshiplist/InternshipList.tsx")
);
const CandidatesList = lazy(
  () => import("../pages/admin/candidates/CandidatesList.tsx")
);
const JobApplicationList = lazy(
  () => import("../pages/admin/applications/JobApplicationList.tsx")
);
const InternshipApplicationList = lazy(
  () => import("../pages/admin/applications/InternshipApplicationList.tsx")
);
const EmployerRequests = lazy(
  () => import("../pages/admin/employerRequest/EmployerRequests.tsx")
);
const VerifyEmail = lazy(
  () =>
    import("../pages/jobility/auth/employer/verification/EmailVerification.tsx")
);
const AddOrganization = lazy(
  () => import("../pages/employer/company/registration/OrganizationForm.tsx")
);
const MyJobs = lazy(() => import("../pages/employer/myjobs/MyJobs.tsx"));
const MyInternships = lazy(
  () => import("../pages/employer/myinternships/MyInternships.tsx")
);
const PostJob = lazy(() => import("../pages/employer/post/JobPost.tsx"));
const AboutPresident = lazy(() => import("../pages/about/AboutPresident.tsx"));
const CommingSoon = lazy(() => import("../pages/soon/ComingSoon.tsx"));
const JobFilterProvider = lazy(
  () => import("../context/jobility/JobFilterContext.tsx")
);
const InternshipFilterProvider = lazy(
  () => import("../context/jobility/InternshipFilterContext.tsx")
);
const Jobs = lazy(() => import("../pages/jobs/Jobs.tsx"));
const Internships = lazy(() => import("../pages/internships/Internships.tsx"));
const JobDetail = lazy(() => import("../pages/jobs/JobDetail.tsx"));
const InternshipDetail = lazy(
  () => import("../pages/internships/InternshipDetail.tsx")
);
const ContactUs = lazy(() => import("../pages/contact/ContactUs.tsx"));
const Board = lazy(() => import("../pages/board/Board.tsx"));
const ClubMembers = lazy(() => import("../pages/clubmembers/ClubMembers.tsx"));
const TrainingPlacement = lazy(() => import("../pages/TP/TraningPlaments.tsx"));
const CareerCardsPage = lazy(
  () => import("../pages/career/CareerCardsPage.tsx")
);
const StudentDashboard = lazy(
  () => import("../pages/student/dashboard/StudentDashboard.tsx")
);
const StudentLayout = lazy(() => import("../layout/StudentLayout.tsx"));
const StudentProfile = lazy(
  () => import("../pages/student/profile/StudentProfile.tsx")
);
const StudentProfileUpdate = lazy(
  () => import("../pages/student/profile/StudentProfileUpdate.tsx")
);

// const COOKIE_KEY = import.meta.env.VITE_COOKIE_KEY;

// eslint-disable-next-line react-refresh/only-export-components
// function ProtectedRoute() {
//   const user = decryptFromCookie<User>(COOKIE_KEY);
//   if (!user) return <Navigate to="/" replace />;
//   return <Outlet />;
// }

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/directors",
        element: <Directors />,
      },
      {
        path: "signup/candidate",
        element: <CandidateSignUp />,
      },
      {
        path: "signup/employer",
        element: <EmployerSignUp />,
      },
      {
        path: "/projects/:clubId",
        element: <ProjectPage />,
      },
      {
        path: "/project-detail/:projectId",
        element: <ProjectDetail />,
      },
      {
        path: "/about/president",
        element: <AboutPresident />,
      },
      {
        path: "/about/board",
        element: <Board />,
      },
      {
        path: "/about/club-members",
        element: <ClubMembers />,
      },
      {
        path: "/career/after-10th",
        element: <CommingSoon />,
      },
      {
        path: "/career/after-12th",
        element: <CommingSoon />,
      },
      {
        path: "/career/after-graduation",
        element: <CommingSoon />,
      },
      {
        path: "/t&p",
        element: <TrainingPlacement />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/career/12th",
        element: <CareerePage />,
      },
      {
        path: "/career/aftergraduation",
        element: <CareerePage />,
      },
      {
        path: "/career/govsector",
        element: <CareerePage />,
      },
      {
        path: "jobs",
        element: (
          <JobFilterProvider>
            <Jobs />
          </JobFilterProvider>
        ),
      },
      {
        path: "/jobs/detail/:id",
        element: <JobDetail />,
      },
      {
        path: "/internships",
        element: (
          <InternshipFilterProvider>
            <Internships />
          </InternshipFilterProvider>
        ),
      },
      {
        path: "/internships/detail/:id",
        element: <InternshipDetail />,
      },
      {
        path: "/career",
        element: <CareerCardsPage />,
      },
       {
        path: "/gallary",
        element: <GallaryPage />,
      },
      {
        path: "/gallary/:category_id",
        element: <GallaryPage />,
      },
       {
        path: "/media-coverage",
        element: <MediaCoveragePAge />,
      },
       {
        path: "/upcoming-events/:event_id",
        element: <UpEvtPage />,
      },
       {
        path: "/engineering",
        element: <Enginnering />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <ProtectedLayout allowedRoles={["ADMIN"]} />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "add-hero-image", element: <AddHeroImage /> },
      { path: "add-gallery-images", element: <AddGalleryImages /> },
      { path: "add-sponsors", element: <AddSponsors /> },
      { path: "add-club", element: <AddClub /> },
      { path: "add-image-cat", element: <AddImageCat /> },
       { path: "add-club-members", element: <AddClubMember /> },
      { path: "add-media-coverage", element: <AddMediaCov /> },
       { path: "add-upcoming-event", element: <AddUpcomingEvents /> },
      { path: "add-category", element: <AddCategory /> },
      { path: "add-sub-category", element: <AddSubCategory /> },
      { path: "add-project", element: <AddProject /> },
      { path: "all-projects", element: <AllProjects /> },
       { path: "all-club-members", element: <AllClubMembers /> },
      { path: "add-directors", element: <AddDirectors /> },
      { path: "add-directries", element: <AddDirectries /> },
      { path: "employers", element: <EmployerList /> },
      { path: "jobs-list", element: <JobList /> },
      { path: "internships-list", element: <InternshipList /> },
      { path: "candidates-list", element: <CandidatesList /> },
      { path: "job-applications", element: <JobApplicationList /> },
      {
        path: "internship-applications",
        element: <InternshipApplicationList />,
      },
      {
        path: "employer-requests",
        element: <EmployerRequests />,
      },
    ],
  },
  {
    path: "employer",
    element: <ProtectedLayout allowedRoles={["EMPLOYER"]} />,
    children: [
      { path: "dashboard", element: <EmployerDashboard /> },
      { path: "my-jobs", element: <MyJobs /> },
      { path: "my-internships", element: <MyInternships /> },
      { path: "post-job", element: <PostJob /> },
    ],
  },
  {
    path: "/registration/employer/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/registration/employer/organization",
    element: <AddOrganization />,
  },

  {
    path: "candidate",
    element: <StudentLayout />,
    children: [
      { path: "dashboard", element: <StudentDashboard /> },
      { path: "profile", element: <StudentProfile /> },
      { path: "applications", element: <CommingSoon /> },
      { path: "bookmarks", element: <BookMark /> },
      { path: "settings", element: <CommingSoon /> },
      { path: "profile/update", element: <StudentProfileUpdate /> },
    ],
  },
]);

export default router;
