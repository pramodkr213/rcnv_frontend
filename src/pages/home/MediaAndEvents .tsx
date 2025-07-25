import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MediaImageApi } from "../../api/mediacov";
import {upcomingEvent} from "../../api/mediaandevents";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const mediaImages = [
  { url: "/img/media/media1.jpg", alt: "Event 1" },
  { url: "/img/media/media2.jpg", alt: "Event 2" },
  { url: "/img/media/media3.jpg", alt: "Event 3" },
  { url: "/img/media/media4.jpg", alt: "Event 4" },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Blood Donation Priyadarshni College",
    date: "July 1, 2025",
    description: "Annual tech fest",
  },
  {
    id: 2,
    title: "Blood Donation And Installation",
    date: "July 4, 2025",
    description: "Celebrating diversity",
  },
  {
    id: 3,
    title: "Tree Plantation Parsad Kamptee",
    date: "July 6, 2025",
    description: "Blood donation drive",
  },
  {
    id: 4,
    title: "Mini Fellowship",
    date: "July 11, 2025",
    description: "Blood donation drive",
  },
  {
    id: 5,
    title: "Regular Meeting",
    date: "July 18, 2025",
    description: "Blood donation drive",
  },
  {
    id: 6,
    title: "Interact Installation Edify School",
    date: "July 19, 2025",
    description: "Blood donation drive",
  },
  {
    id: 7,
    title: "Vocational Visit Haldiram's",
    date: "July 20, 2025",
    description: "Blood donation drive",
  },
  {
    id: 8,
    title: "Joint Meeting",
    date: "July 25, 2025",
    description: "Blood donation drive",
  },
  {
    id: 9,
    title: "Interact Installation Deaf & Dumb School",
    date: "July 26, 2025",
    description: "Blood donation drive",
  },
  {
    id: 10,
    title: "Take Rotary home",
    date: "July 27, 2025",
    description: "Blood donation drive",
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
};





const MediaAndEvents = () => {
const navigate= useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
 const { data: images = [], isLoading } = useQuery({
    queryKey: ["media-images-scroll"],
    queryFn: MediaImageApi.getMediaImages,
  });

  const { data: upEvent = [] } = useQuery({
    queryKey: ["upcoming-events"],
    queryFn: upcomingEvent.upcomingevents,
  });
  const openModal = (index:number) => {
 navigate('/media-coverage')
    // setModalOpen(true);
    //   setActiveIndex(index);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="container py-5">
      <div className="row">
        {/* Media Photographs */}
        <div className="col-md-6 text-center  mb-4 mb-md-0">
          <h4 className="mb-3 text-black">Media Coverage</h4>
          <Slider {...sliderSettings}>
            {images.map((img, idx) => (
              <div key={idx} className="position-relative">
                <img
                  src={img.imageUrl}
                  alt='Media Image'
                  className="img-fluid rounded"
                  style={{
                    width: "100%",
                    height: "500px",
                    objectFit: "contain",
                    objectPosition: "center",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                      openModal( idx)
                    }
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Upcoming Events */}
        <div className="col-md-6">
          <h4 className="mb-3 text-black">Upcoming Events</h4>
          <ul
            className="list-group shadow-sm"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            {upEvent.map((event) => (
              <div
                key={event.id}
                // to={`/events/${event.id}`}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/upcoming-events/${event.id}`)}
                className="text-decoration-none text-dark"
              >
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1 fw-bold">{event.title}</h6>
                    <small className="text-muted">{event.date}</small>
                  </div>
                  <span className="badge bg-primary rounded-pill">
                    Upcoming
                  </span>
                </li>
              </div>
            ))}
          </ul>
        </div>


      </div>
      {modalOpen && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      zIndex: 9999,
    }}
  >
    {/* BACKDROP - closes modal on click */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      onClick={() => setModalOpen(false)}
    />

    {/* SLIDER CONTAINER - don't bubble to backdrop */}
    <div
      style={{
        position: "relative",
        zIndex: 10000,
        width: "90%",
        maxWidth: "1000px",
        margin: "auto",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <Swiper
        modules={[Navigation]}
        navigation
        initialSlide={activeIndex}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
      >
        {images.map((gallery, idx) => (
          <SwiperSlide key={idx}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={gallery.imageUrl}
                alt={gallery.title}
                style={{
                  maxHeight: "80vh",
                  width: "100%",
                  objectFit: "contain",
                  borderRadius: "8px",
                  
                }}
              />
              <p style={{ color: "#fff", marginTop: "10px" }}>
                {gallery.title}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Close Button */}
      <span
        style={{
          position: "absolute",
          top: "-30px",
          right: "-30px",
          fontSize: "40px",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={() => setModalOpen(false)}
      >
        &times;
      </span>
    </div>
  </div>
)}
    </div>
  );
};

export default MediaAndEvents;
