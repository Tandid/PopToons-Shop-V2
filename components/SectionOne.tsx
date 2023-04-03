import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { fadeIn, staggerContainer } from "../utils/motion";

const SectionOne: React.FC = (): React.ReactElement => {
  const logos = [
    {
      src: "/images/logos/aot-logo.jpeg",
      alt: "Attack on Titans",
    },
    {
      src: "/images/logos/naruto-logo.png",
      alt: "Naruto Shippuden",
    },
    {
      src: "/images/logos/pokemon-logo.png",
      alt: "Pokemon",
    },
    {
      src: "/images/logos/marvel-logo.png",
      alt: "Marvel",
    },
    {
      src: "/images/logos/avatar-logo.png",
      alt: "Avatar the Last Airbender",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer(0, 5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="2xl:max-w-[1280px] w-full mx-auto flex flex-col justify-around lg:flex-row py-10"
    >
      <div className="flex flex-row items-center justify-around">
        {logos.map((logo, idx) => (
          <motion.div
            variants={fadeIn("up", "spring", 0.5 + idx * 0.3, 1.5)}
            key={idx}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={0}
              className="p-2"
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeIn("left", "tween", 1, 1)}
        className="flex-[0.75] flex justify-center flex-col gap-4"
      >
        <h1 className="font-bold text-center sm: text-[24px] md:text-[26px] text-gray-800">
          Browse our catalog!
        </h1>
        <p className="font-normal text-center text-[18px] text-gray-600 md:text-[20px]">
          Shop our unique collection of funkos!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SectionOne;
