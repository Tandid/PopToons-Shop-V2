"use client";
/* eslint-disable @next/next/no-img-element */

import { motion } from "framer-motion";
import React from "react";
import { fadeIn, imgVariants, staggerContainer } from "../utils/motion";

const SectionOne: React.FC = (): React.ReactElement => {
  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="2xl:max-w-[1280px] w-full mx-auto flex lg:flex-row flex-col gap-8"
    >
      <motion.div
        variants={imgVariants("left")}
        className="flex items-center justify-center flex-1 bg-gray-400"
      >
        {/* <Image
          src={"/images/banner2.jpg"}
          alt="case01"
          width={500}
          height={200}
        /> */}
      </motion.div>
      <motion.div
        variants={fadeIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] flex justify-center flex-col gap-4"
      >
        <h1 className="font-bold lg:text-[26px] text-[26px] text-gray-800">
          Browse our catalog!
        </h1>
        <p className="mt-[16px] font-normal lg:text-[20px] text-[14px] text-gray-600">
          Shop our unique collection of funkos.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SectionOne;
