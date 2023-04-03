import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { fadeIn, staggerContainer } from "../utils/motion";

const SectionTwo: React.FC = (): React.ReactElement => {
  return (
    <motion.div
      variants={staggerContainer(0, 5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="2xl:max-w-[1280px] w-full mx-auto flex flex-col justify-around lg:flex-row py-6"
    >
      <motion.div variants={fadeIn("up", "spring", 0.3, 1.5)}>
        <Image
          src="/images/backgrounds/banner4.jpeg"
          alt="banner"
          width={800}
          height={500}
        ></Image>
      </motion.div>

      <motion.div
        variants={fadeIn("left", "tween", 1, 1)}
        className="flex flex-col justify-center gap-4 m-4 "
      >
        <h1 className="font-bold text-center sm: text-[24px] md:text-[26px] lg:-translate-x-10 text-white">
          Explore with us!
        </h1>
        <motion.div className="flex justify-center lg:-translate-x-10">
          <Link className="font-bold text-white primary-button" href="/search">
            Shop Now
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SectionTwo;
