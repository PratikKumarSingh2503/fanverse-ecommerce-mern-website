import React, { useRef } from "react";
import { useSelector } from "react-redux";
import HomeCard from "../component/HomeCard";
import CardFeature from "../component/CardFeature";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";
import Clients from "../component/Client";

const Home = () => {
  // Fetching product data from Redux state
  const productData = useSelector((state) => state.product.productList);

  // Slicing and filtering product data for specific use cases
  const homeProductCartList = productData.slice(0, 5); // First 5 products
  const homeProductCartListTShirts = productData.filter(
    (el) => el.category === "upper garment"
  );

  // Loading placeholders
  const loadingArray = new Array(5).fill(null);
  const loadingArrayFeature = new Array(7).fill(null);

  // Carousel scrolling refs
  const slideProductRef = useRef();

  // Handlers for carousel scrolling
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 300; // Adjusted scroll distance
  };

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 300;
  };

  return (
    <div className="p-4 md:p-4 ">
      {/* Header Section */}
      <div className="md:flex gap-6 py-4 bg-gradient-to-r from-blue-200 via-blue-100 to-bg-slate-100 rounded-lg ">
        {/* Left Section - Hero Text */}
        <div className="md:w-1/2  justify-center p-4">
          <div className="flex items-center gap-3 bg-blue-100 w-max px-3 py-1 rounded-full">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-6"
              alt="Bike Delivery Icon"
            />
            <p className="text-sm font-medium text-blue-900">
              Bike Delivery
              {/* 🚴‍♂️ */}
            </p>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold py-3 text-gray-800">
            Wear Your <span className="text-red-600">Fandom</span>, Live Your{" "}
            <span className="text-red-600">Passion!</span>{" "}
          </h2>
          <p className="py-3 text-lg text-gray-600">
          Explore a unique collection of apparel, accessories, and collectibles that let you express your love for your favorite worlds. Make your fandom part of your style!
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow-lg transition transform hover:scale-105">
            Order Now
          </button>
        </div>

        {/* Right Section - Product Preview */}
        <div className="md:w-1/2 flex flex-wrap gap-5 py-4 justify-center">
          {homeProductCartList.length > 0
            ? homeProductCartList.map((el) => (
                <HomeCard
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  brand={el.brand}
                  category={el.category}
                />
              ))
            : loadingArray.map((_, index) => (
                <HomeCard key={index} loading="Loading..." />
              ))}
        </div>
      </div>

      {/* T-Shirts Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-3xl text-gray-800">
            Graphic Printed T-Shirts
          </h2>
          <div className="flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-blue-100 hover:bg-blue-200 text-xl p-2 rounded-full shadow"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-blue-100 hover:bg-blue-200 text-xl p-2 rounded-full shadow"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-x-scroll scrollbar-none py-4"
          ref={slideProductRef}
        >
          {homeProductCartListTShirts.length > 0
            ? homeProductCartListTShirts.map((el) => (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  brand={el.brand}
                  category={el.category}
                  price={el.price}
                  image={el.image}
                />
              ))
            : loadingArrayFeature.map((_, index) => (
                <CardFeature key={index} loading="Loading..." />
              ))}
        </div>
      </div>

      {/* All Products Section */}
      <AllProduct heading="Discover Our Products" />

      {/* Client Testimonials */}
      <Clients />
    </div>
  );
};

export default Home;