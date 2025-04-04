import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Amit Sharma",
    review: "GoCart ne mera kaam bohot aasan kar diya! Ab fresh fruits aur vegetables ghar baithe mil jate hain.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Neha Verma",
    review: "Bahut hi reliable service! Load transport booking ka experience seamless raha.",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rohit Singh",
    review: "Vendors ke liye ek game-changer! Mere sales aur customers dono badh gaye hain.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/47.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-green-700 text-center">
      <h2 className="text-3xl font-bold text-green-700 mb-8">GoCart Users Love Us!</h2>
      <div className="max-w-4xl mx-auto">
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          className="py-6"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 shadow-lg rounded-xl flex flex-col items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mb-4 border-4 border-green-300"
                />
                <p className="text-gray-700 italic mb-4">"{testimonial.review}"</p>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-yellow-400 ${i < Math.floor(testimonial.rating) ? "" : "opacity-50"}`}
                    />
                  ))}
                </div>
                <h4 className="text-green-700 font-semibold">{testimonial.name}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
