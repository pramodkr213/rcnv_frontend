import React from "react";
import type { Project } from "../api/project";
import { useNavigate } from "react-router-dom";

const ProjectCard: React.FC<Project> = ({
  imageUrls,
  title,
  detail,
  date,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <div className="card h-100">
      <img src={`${imageUrls?.[0]}`} className="card-img-top" alt={title} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{detail}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div>
            <i className="far fa-calendar-alt text-warning me-1"></i>
            {date}
          </div>
          <button
            onClick={() => navigate(`/project-detail/${id}`)}
            className="btn btn-outline-primary btn-sm"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
