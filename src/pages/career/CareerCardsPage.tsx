import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const data = [
  {
    title: "B.Tech",
    description:
      "It is one of the most popular and preferred career options for science students. Most of the parents in India want their children to become an engineer. Every year around 15 lakh engineers graduate according to AICTE data.",
    category: "btech",
  },
  {
    title: "B.Sc.",
    description:
      "Bachelor of Science. Both PCM and PCB students can elect to join this 3-year program. You can specialize in different subjects like chemistry, physics, mathematics, computer science, biology, etc.",
    category: "bsc",
  },
  {
    title: "BCA",
    description:
      "Bachelor of Computer Application is a 3-year program. Perfect for candidates looking to build a career in the world of Information Technology and Digital data.",
    category: "bca",
  },
  {
    title: "B.Arch",
    description:
      "A Bachelor’s degree in Architecture is a five-year graduation course covering building science, construction, interior and exterior designing. Requires NATA for admission.",
    category: "barch",
  },
  {
    title: "MBBS",
    description:
      "Bachelor of Medicine & Bachelor of Surgery is a five-and-a-half-year course preparing students for a career as doctors. Many specializations and research opportunities.",
    category: "mbbs",
  },
  {
    title: "BDS",
    description:
      "5-years Bachelor’s degree in Dental Surgery. A popular choice for students wanting to become dental surgeons.",
    category: "bds",
  },
  {
    title: "B.Pharma",
    description:
      "Bachelor in Pharmacy is a 4-year course. Graduates can practise as chemists or work as Medical Representatives with lucrative salary packages.",
    category: "bpharma",
  },
  {
    title: "Paramedics",
    description:
      "Numerous paramedical programs after 10+2 focusing on ECG technology, anaesthesia, lab technician, etc.",
    category: "paramedics",
  },

  {
    title: "B.Com",
    description:
      "It is one of the most popular graduation programs for commerce candidates. Bachelor of Commerce is a 3-year course with an abundance of specializations like Financial Accountancy, Economics, Business Organisation, Business Statistics and others. You have the option to choose either B.Com or B.Com (Hons) depending upon your 10+2 marks. More or less, both courses are alike, but B.Com (Hons) has a higher value given that the subjects are more complex.  ",
    category: "bcom",
  },

  {
    title: "BBA",
    description:
      "Students who are interested in Business and Management can go for Bachelor of Business Administration. This program is the primary step for students who are considering doing a Masters in Management. It offers a great career opportunity for students as they get to know a lot about the dynamics of management and other issues related to business administration",
    category: "bba",
  },

  {
    title: "Charted Accountant:",
    description:
      "Charted Accountancy is one of the toughest course in the world, and students should be willing to work hard to become certified Chartered Accountants or Cost Accountants. After 10+2, you can study a Fundamental Course of either Chartered Accountancy (Approved by ICAI, New Delhi) or Cost Accounting (Approved by ICWAI, Kolkata). ",
    category: "charted_accountant",
  },
  {
    title: "Company Secretary:",
    description:
      "Company Secretary is a course for students who are interested in pursuing the study of taxations from a financial and investment perspective. Students will gain knowledge and insights about company affairs and all its legal aspects. This program is conducted by the ICSI, New Delhi.",
    category: "company_secretary",
  },
  {
    title: "BA or BA (Hons):",
    description:
      " Bachelor of Arts is still the most favorite course for art students. Candidates can get admission to BA with specialization in their desired subjects either through 10+2 marks or entrance exams conducted by colleges and universities.",
    category: "ba",
  },
  {
    title: "BJMC",
    description:
      "It is a perfect choice for students aspiring to join the journalism or media industry. It is a 3-year degree course offered by various colleges and universities worldwide.  Some of the famous Government colleges for Journalism and Mass Communication in India are IIMC (New Delhi), Delhi College (New Delhi), FTII (Pune), BHU (Varanasi), Jamia Milia University (Aligarh), and others. Several other private universities and colleges are offering degree and diploma courses in Journalism like Amity University, HR college, etc.",
    category: "bjmc",
  },
  {
    title: "Bachelor of Fine Arts (BFA):",
    description:
      "Creative minds that enjoy painting and drawing can opt for this course. It can be a stepping stone for careers in interior designing of homes, cars, hotels, buildings , etc.",
    category: "bfa",
  },
  {
    title: "LLB(Law):",
    description:
      "Students can take admission into BA/ BCom (LLB) after passing +2. It’s a 5-year integrated course.",
    category: "llb",
  },
  {
    title: "BBS:",
    description:
      "BBS is an undergraduate degree program that focuses on various aspects of business management and administration. It is designed to equip students with the necessary skills and knowledge to succeed in the business world.",
    category: "bbs",
  },
  {
    title: "M.Tech (Master of Technology)",
    description:
      "Focus: M.Tech is a postgraduate degree aimed at engineering and technology disciplines. It emphasizes advanced technical knowledge and research skills. Eligibility: Typically requires a B.Tech or B.E. degree in a relevant field. Career Prospects: Graduates can pursue careers in research and development, academia, or specialized engineering roles in industries such as IT, manufacturing, and telecommunications.",
    category: "mtech",
  },
  {
    title: "M.Sc (Master of Science)",
    description:
      "Focus: M.Sc is a postgraduate degree that concentrates on scientific and mathematical disciplines, fostering analytical and research skills. Eligibility: Requires a bachelor's degree in a relevant science field (e.g., B.Sc in Physics, Chemistry, Biology, or Mathematics). Career Prospects: Graduates can work in research, academia, laboratories, pharmaceuticals, and various scientific industries.",
    category: "msc",
  },
  {
    title: "MBA (Master of Business Administration)",
    description:
      "Focus: MBA is a professional degree that prepares students for leadership and management roles in business. It covers various aspects of business management, including finance, marketing, and operations. Eligibility: Requires a bachelor's degree in any discipline; work experience may be preferred by some institutions. Career Prospects: Graduates can pursue careers in management, consulting, finance, marketing, and entrepreneurship across various sectors.",
    category: "mba",
  },
  {
    title: "MS (Master of Science)",
    description:
      "Focus: MS is a postgraduate degree that emphasizes research and advanced knowledge in a specific science or engineering field. It typically involves coursework and a thesis or project. Eligibility: Requires a bachelor's degree in a relevant discipline (such as B.Sc., B.Tech, or equivalent), with strong academic performance. Career Prospects: Graduates can pursue roles in research and development, academia, or specialized industry positions, or continue toward a Ph.D.",
    category: "ms",
  },
];

export default function CareerCardsPage() {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("filter") || "all";
  const [filter, setFilter] = useState(filterParam);

  useEffect(() => {
    setFilter(filterParam);
  }, [filterParam]);

  const filteredData =
    filter === "all" ? data : data.filter((item) => item.category === filter);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Career Options</h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("btech")}
          className={`px-4 py-2 rounded-md ${
            filter === "btech" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          B.Tech
        </button>
        <button
          onClick={() => setFilter("bsc")}
          className={`px-4 py-2 rounded-md ${
            filter === "bsc" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          B.Sc
        </button>
        {/* Add other filter buttons as needed */}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
