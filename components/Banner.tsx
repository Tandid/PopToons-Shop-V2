/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { fadeIn, staggerContainer } from "../utils/motion";

const Banner: React.FC = (): React.ReactElement => {
  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="2xl:max-w-[1280px] w-full mx-auto"
    >
      <motion.div
        variants={fadeIn("down", "spring", 0.2, 1)}
        className="relative flex items-center justify-center flex-1"
      >
        <img
          src="/images/backgrounds/banner2.jpg"
          alt="banner-1"
          className="w-full lg:h-[500px] h-auto min-h-[210px] rounded-[20px]"
        ></img>
      </motion.div>
      <motion.div className="flex justify-center p-4">
        <Link className="font-bold text-white primary-button" href="/search">
          Shop Now
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Banner;
