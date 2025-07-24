import { useParams } from "react-router-dom";
import jobData from "../../data/jobData.json";
import { useEffect } from "react";

export default function JobDetail() {
  const { id } = useParams();
  const job = jobData.find((j) => j.id === parseInt(id || "0"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!job) {
    return <div className="p-6 text-red-500">Job not found</div>;
  }
  return (
    <div className="container py-6">
      <div className=" bg-white p-6 rounded shadow">
        <div className="flex items-center gap-4 mb-4">
          <img src={job.logo} alt={job.company} className="w-auto h-20" />
          <div>
            <h2 className="text-2xl font-bold text-blue-700">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
          </div>
        </div>

        <p className="text-gray-700 mb-2">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Experience:</strong> {job.experience}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Sector:</strong> {job.sector}
        </p>

        <h3 className="text-lg font-semibold mb-2">Job Description</h3>
        <p className="text-gray-800 leading-relaxed">{job.description}</p>

        <div className="d-flex justify-content-start mt-4 align-items-center">
          <button className="btn btn-primary px-5">Apply</button>
        </div>
      </div>
    </div>
  );
}
