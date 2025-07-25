import React from "react";
import { Link, useLocation } from "react-router-dom";

const categories12th = [
  { name: "Engineering", url: "/ug-courses" },
  { name: "Medical", url: "/ug-courses" },
  { name: "Management", url: "/ug-courses" },
  { name: "Law", url: "/ug-courses" },
  { name: "Commerce", url: "/ug-courses" },
  { name: "Science", url: "/ug-courses" },
  { name: "Arts", url: "/ug-courses" },
];

const categoriesgraduation = [
  { name: "Management", url: "/aftergraduation-courses" },
  { name: "Masters", url: "/aftergraduation-courses" },
  { name: "MD", url: "/aftergraduation-courses" },
  { name: "Law", url: "/aftergraduation-courses" },
  { name: "Commerce", url: "/aftergraduation-courses" },
  { name: "Science", url: "/aftergraduation-courses" },
  { name: "Arts", url: "/aftergraduation-courses" },
];

const categoriesGovt = [
  { name: "Banking", url: "/govtsector" },
  { name: "Railway", url: "/govtsector" },
  { name: "Airforce", url: "/govtsector" },
  { name: "Army", url: "/govtsector" },
  { name: "UPSC(IAS/IPS)", url: "/govtsectorg" },
  { name: "UPSC(IES)", url: "/govtsector" },
  { name: "MPSC", url: "/govtsector" },
];

const CareerPage: React.FC = () => {
  const location = useLocation();

  const categories =
    location.pathname === "/career/aftergraduation"
      ? categoriesgraduation
      : location.pathname === "/career/12th"
      ? categories12th
      : location.pathname === "/career/govsector"
      ? categoriesGovt
      : [];

  const heading =
    location.pathname === "/career/aftergraduation"
      ? "Careers After Graduation"
      : location.pathname === "/career/12th"
      ? "Careers After 12th"
      : location.pathname === "/career/govsector"
      ? "Govt Sector Careers"
      : "Career Categories";

  const description =
    location.pathname === "/career/aftergraduation"
      ? "Discover a wide range of career opportunities available after graduation, from pursuing higher education like a master's or MBA to entering fields such as management, law, commerce, or science. Whether you're aiming to specialize further in your domain or pivot to a new career path, this section provides guidance on the most in-demand sectors, required qualifications, and potential career growth after completing your undergraduate studies."
      : location.pathname === "/career/12th"
      ? "Explore a variety of career options available after completing 12th grade, tailored to your stream—whether it's science, commerce, or arts. From professional courses like engineering, medical, and law to fields like management, design, and humanities, this section helps you understand the eligibility criteria, course duration, and future prospects to make informed decisions about your academic and career journey"
      : location.pathname === "/career/govsector"
      ? "Explore various government sector career opportunities by selecting a category from the sidebar. Whether you're interested in prestigious UPSC roles like IAS or IES, looking to join the Indian Armed Forces, or aiming for a secure job in banking or railways, each category provides detailed information to help you understand the eligibility, preparation path, and growth prospects in that sector."
      : "";

  return (
    <section className="my-10">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-4">
        {/* Sidebar */}
        <aside className="hidden lg:block w-full lg:w-1/4">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-2">
              {heading}
            </h3>
            {categories.length > 0 ? (
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      to={category.url}
                      className="block text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition px-3 py-2 rounded-md"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No categories found.</p>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Select a Category
          </h2>
          <p className="text-gray-600 text-lg">{description}</p>
        </main>
      </div>
    </section>
  );
};

export default CareerPage;
