import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useSpring, animated } from "@react-spring/web";

const Counter = ({ value }) => {
  const props = useSpring({
    from: { number: 0 },
    to: { number: value },
    delay: 200,
    config: { duration: 1500 },
  });
  return <animated.div>{props.number.to((n) => n.toFixed(0))}</animated.div>;
};

const About = () => {
  return (
    <div className="about-page font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 py-20 text-white text-center">
        <motion.h1
          className="text-5xl font-extrabold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Discover Enigma Vault
        </motion.h1>
        <motion.p
          className="mt-4 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Fanverse Merch Hub - Your Fandom, Your Style
        </motion.p>
        <div className="absolute inset-0 bg-[url('https://via.placeholder.com/1920x1080')] bg-cover opacity-20"></div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-8 md:px-16 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-semibold text-gray-800">Our Journey</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Welcome to Enigma Vault, your ultimate hub for exploring a wide
            range of fascinating topics. Whether you're passionate about movies,
            comics, technology, travel, or staying updated with the latest news,
            we've got you covered!
            <br />
            Join us as we celebrate creativity, innovation, and curiosity. Your
            journey begins here!
          </p>
        </div>
        <motion.img
          src="https://via.placeholder.com/600x400"
          alt="Our Journey"
          className="md:w-1/2 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 py-16">
        <h2 className="text-4xl font-semibold text-center text-gray-800">
          What Makes Us Special
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-8">
          {[{ label: "Happy Customers", value: 10000 }, { label: "Orders Delivered", value: 25000 }, { label: "Years in Business", value: 7 }].map(
            (stat, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-3xl font-extrabold text-blue-600">
                  <Counter value={stat.value} />
                </h3>
                <p className="mt-2 text-gray-600">{stat.label}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <h2 className="text-4xl font-semibold text-center text-gray-800">
          Meet Our Team
        </h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mt-8"
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {[{ name: "Pratik Kumar Singh", role: "CEO", img: "https://via.placeholder.com/150" }, { name: "Jane Smith", role: "Marketing Head", img: "https://via.placeholder.com/150" }, { name: "Chris Brown", role: "Lead Designer", img: "https://via.placeholder.com/150" }].map(
            (member, index) => (
              <SwiperSlide key={index}>
                <div className="text-center bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="mx-auto w-24 h-24 rounded-full shadow-md"
                  />
                  <h3 className="mt-4 text-xl font-medium text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-8 bg-gray-100">
        <h2 className="text-4xl font-semibold text-center text-gray-800">
          What Our Customers Say
        </h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mt-8"
        >
          {[{ name: "Alex Johnson", feedback: "Amazing products and excellent service!" }, { name: "Sophie Lee", feedback: "Fanverse brings Marvel magic to life!" }, { name: "Mark Taylor", feedback: "High-quality merch for true fans!" }].map(
            (testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto hover:scale-105 transition-transform duration-300">
                  <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
                  <p className="mt-4 font-semibold text-gray-800">
                    - {testimonial.name}
                  </p>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-purple-600 py-16 text-center text-white">
        <h2 className="text-3xl font-semibold">Join the Fanverse Experience</h2>
        <p className="mt-4">Discover unique Marvel-themed merchandise today!</p>
        <motion.button
          className="mt-6 px-8 py-3 bg-white text-purple-600 font-medium rounded-lg shadow-md"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          Explore Now
        </motion.button>
      </section>
    </div>
  );
};

export default About;
