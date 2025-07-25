import React from "react";
import { Link, useLocation } from "react-router-dom";

const categories12th = [
  { name: "Engineering", url: "/engineering" },
  { name: "Medical", url: "/engineering" },
  { name: "Management", url: "/engineering" },
  { name: "Law", url: "/engineering" },
  { name: "Commerce", url: "/engineering" },
  { name: "Science", url: "/engineering" },
  { name: "Arts", url: "/engineering" },
];

const categoriesgraduation = [
  { name: "Management", url: "/engineering" },
  { name: "Masters", url: "/engineering" },
  { name: "MD", url: "/engineering" },
  { name: "Law", url: "/engineering" },
  { name: "Commerce", url: "/engineering" },
  { name: "Science", url: "/engineering" },
  { name: "Arts", url: "/engineering" },
];

const categoriesGovt = [
  { name: "Banking", url: "/engineering" },
  { name: "Railway", url: "/engineering" },
  { name: "Airforce", url: "/engineering" },
  { name: "Army", url: "/engineering" },
  { name: "UPSC(IAS/IPS)", url: "/engineering" },
  { name: "UPSC(IES)", url: "/engineering" },
  { name: "MPSC", url: "/engineering" },
];
const CareerPage: React.FC = () => {
  const location = useLocation();

  // Determine which category set to show
  const isAfter12th = location.pathname === "/aftergraduation";
  const isGovtSector = location.pathname === "/12th";

  const categories = location.pathname === "/career/aftergraduation"
    ? categoriesgraduation
    :location.pathname === "/career/12th"
    ? categories12th
    : location.pathname === "/career/govsector"? categoriesGovt:[];

  return (
    <section className="my-5">
      <div className="container mx-auto flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-full lg:w-[20%] pl-4">
          <div className="bg-gray-100 rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-4">
              {isAfter12th
                ? "Careers After 12th"
                : isGovtSector
                ? "Govt Sector Careers"
                : "Career Categories"}
            </h3>
            {categories.length > 0 ? (
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      to={category.url}
                      className="block text-sm p-2 rounded hover:bg-blue-100 transition"
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
        <main className="flex-1 px-4">
          <h2 className="text-2xl font-bold mb-3">Select a category</h2>
          <p className="text-gray-700 text-base">
            {location.pathname === "/career/aftergraduation" && "Browse career paths you can choose after completing 12th grade."}
            {location.pathname === "/career/12th" && "Browse government sector careers and opportunities."}
            {location.pathname === "/career/govsector"&& "Click a category from the sidebar to view career options."}
          </p>
        </main>
      </div>
    </section>
  );
};

export default CareerPage;
