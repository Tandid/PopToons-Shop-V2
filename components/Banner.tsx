/* eslint-disable @next/next/no-img-element */
// @ts-nocheck

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { fadeIn, staggerContainer } from "../utils/motion";

SwiperCore.use([Autoplay, Pagination]);

const Banner: React.FC = (): React.ReactElement => {
  const images = [
    "/images/backgrounds/banner1.jpg",
    "/images/backgrounds/banner2.jpg",
    "/images/backgrounds/banner3.jpg",
  ];

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="2xl:max-w-[1280px] w-full mx-auto"
    >
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="relative flex items-center justify-center scale-x-110 sm:scale-100 sm:rounded-xl"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <motion.div
              variants={fadeIn("down", "spring", 0.2, 1)}
              className="relative flex items-center justify-center"
            >
              <img
                src={image}
                alt={`banner-${index + 1}`}
                className="w-full lg:h-[500px] h-auto min-h-[300px] sm:rounded-[20px]"
              ></img>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      <motion.div className="flex justify-center p-4">
        <Link className="font-bold text-white primary-button" href="/search">
          Shop Now
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Banner;
