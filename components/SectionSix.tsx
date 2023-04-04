import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Product } from "../utils/data.interface";
import { fadeIn, staggerContainer } from "../utils/motion";

const SectionFive: React.FC<{ products: Product[] }> = ({
  products,
}): React.ReactElement => {
  return (
    //yello-400 red-800
    <div className="flex flex-col items-center pt-2 text-white bg-gradient-to-l from-red-800 to-black text-shadow-md">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 2, delay: 1 }}
        className="z-10"
      >
        <Image
          src={"/images/logos/demon-slayer-logo.png"}
          alt={"demon slayer logo"}
          width={150}
          height={0}
          className="items-center m-5 text-center"
        />
      </motion.div>

      <motion.div
        variants={staggerContainer(0, 5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div
          variants={fadeIn("up", "tween", 0, 1)}
          className="absolute items-center z-1"
        >
          <Image
            src={"/images/backgrounds/demonslayer.png"}
            alt={"lionking"}
            width={500}
            height={500}
            className="scale-90 opacity-30 rounded-xl md:scale-125 lg:scale-90"
          />
        </motion.div>

        <motion.div
          variants={fadeIn("right", "spring", 1, 1.5)}
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={"/images/products/tanjiro2.png"}
            alt={"tanjiro2"}
            width={500}
            height={500}
            className="scale-90 translate-y"
          ></Image>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SectionFive;
