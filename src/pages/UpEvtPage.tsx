import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { upcomingEvent } from "../api/mediaandevents";

const UpEvtPage: React.FC = () => {
  const{event_id}= useParams()

 
   const { data: event = [], isLoading } = useQuery({
     queryKey: ["up-evnt-page",event_id],
       queryFn: async () => {
       const res = await upcomingEvent.getEventsByPage(event_id);
       return res;
     },
   });


  return (
    <>
      <section className="breadcrum-img-bg">
        <div className="container"></div>
      </section>

      <div className="container py-4">
        <div className="d-flex justify-content-between">
          <h4>Upcoming Event</h4>
        </div>

        

        <section className="my-10">
          <div className="container mt-2">
          

            <div className="row pt-5">
              {isLoading ? (
                <p>Loading...</p>
              ) : event ? (
                
                  <div className="col-md-8">
              <div className="card shadow border-0">
                <div className="card-body p-4">
                  <h3 className="card-title text-primary fw-bold mb-3">{event.title}</h3>

                  <div className="mb-2">
                    <strong className="text-secondary">Date:</strong>{" "}
                    <span className="text-dark">{event.date}</span>
                  </div>

                  <div className="mb-2">
                    <strong className="text-secondary">Description:</strong>
                    <p className="text-muted mt-1 mb-0" style={{ whiteSpace: "pre-line" }}>
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
               
              ) : (
                <p>No Upcoming Event Found</p>
              )}
            </div>
          </div>

          {/* Modal Structure Placeholder (optional to activate later) */}
       
        </section>
      </div>
    </>
  );
};

export default UpEvtPage;
