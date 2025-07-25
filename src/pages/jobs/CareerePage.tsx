import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Engineering", url: "/engineering" },
  { name: "Medical", url: "/medical" },
  { name: "Management", url: "/management" },
  { name: "Law", url: "/law" },
  { name: "Commerce", url: "/commerce" },
  { name: "Science", url: "/science" },
  { name: "Arts", url: "/arts" },
];

const CareerPage: React.FC = () => {
  return (
    <section className="my-5">
      <div className="container mx-auto flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-full lg:w-[20%] pl-4">
          <div className="bg-gray-100 rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-4">Career Categories</h3>
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
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4">
          <h2 className="text-2xl font-bold mb-3">Select a category</h2>
          <p className="text-gray-700 text-base">
            Click a category from the sidebar to view career options.
          </p>
        </main>
      </div>
    </section>
  );
};

export default CareerPage;
