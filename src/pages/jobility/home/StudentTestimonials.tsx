import React, {useState} from "react";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

const testimonials = [
    {
        name: "Yogesh Singh",
        company: "Flipkart",
        message:
            "Lorem ipsum dolor sit amet consectetur. Ac at nisi eget ut lacus diam viverra. Curabitur dui dignissim ultricies iaculis. Magna at mattis quis non pellentesque. Viverra vitae viverra nulla ut blandit tortor nulla sed nunc. Enim ullamcorper massa suscipit et metus nisi ultricies. Eros enim fames risus in rutrum in.",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Priya Sharma",
        company: "Google",
        message:
            "Lorem ipsum dolor sit amet consectetur. Pellentesque habitant morbi tristique senectus et netus et malesuada. Vivamus id nisi ac nibh posuere laoreet.",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Rohit Verma",
        company: "Amazon",
        message:
            "Integer ullamcorper neque eu purus aliquet, a tincidunt est finibus. Donec iaculis, tortor eget placerat fermentum, nisi lacus feugiat metus.",
        image: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
        name: "Sneha Kulkarni",
        company: "Microsoft",
        message:
            "Donec sed ex non sapien dapibus vehicula. Sed vitae luctus metus. Etiam feugiat erat sit amet lorem bibendum, in sagittis magna dictum.",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
];

const StudentTestimonials:React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleNext = React.useCallback(():void => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const handlePrev = React.useCallback(():void => {
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }, []);

    return (
        <section className="relative bg-[#f0f7ff] py-16 px-4 md:px-20 text-center overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What our students says?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
                Lorem ipsum dolor sit amet consectetur. Egestas sapien viverra nunc
                risus scelerisque ipsum accumsan nunc justo. Fermentum congue elit massa
                aliquet bibendum augue non hac.
            </p>

            {/* Circular avatars */}
            <div className="flex justify-center items-center gap-4 md:gap-6 flex-wrap mb-10">
                {testimonials.map((t, i) => (
                    <img
                        key={i}
                        src={t.image}
                        className={`rounded-full w-16 h-16 md:w-20 md:h-20 object-cover border-4 ${
                            i === activeIndex
                                ? "border-blue-500 scale-110"
                                : "border-white opacity-60"
                        } transition duration-300`}
                        alt={t.name}
                    />
                ))}
            </div>

            {/* Testimonial box */}
            <div className="relative bg-[#e6f0ff] max-w-4xl mx-auto px-8 py-10 rounded-lg shadow-md text-left">
                {/* Left Arrow */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 rounded-full p-2 shadow-md hover:bg-blue-100 transition"
                >
                    <FaChevronLeft/>
                </button>

                {/* Right Arrow */}
                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 rounded-full p-2 shadow-md hover:bg-blue-100 transition"
                >
                    <FaChevronRight/>
                </button>

                <h3 className="text-xl font-bold text-blue-800 mb-1">
                    {testimonials[activeIndex].name}
                </h3>
                <p className="text-sm text-gray-600 font-medium mb-4">
                    Placed in {testimonials[activeIndex].company}
                </p>
                <p className="text-gray-700 leading-relaxed">
                    {testimonials[activeIndex].message}
                </p>
            </div>
        </section>
    );
};

export default StudentTestimonials;
