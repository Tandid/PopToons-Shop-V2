import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "../utils/data.interface";
import { fadeIn, staggerContainer } from "../utils/motion";

const SectionFive: React.FC<{
  products: Product[];
}> = (): React.ReactElement => {
  return (
    <div className="flex flex-col items-center pt-2 pb-10 text-white bg-gradient-to-r from-sky-700 to-black text-shadow-md">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 2, delay: 1 }}
        className="z-10"
      >
        <Image
          src={"/images/logos/lionking-logo.png"}
          alt={"lion king logo"}
          width={300}
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
            src={"/images/backgrounds/lionking.jpeg"}
            alt={"lionking"}
            width={500}
            height={500}
            className="scale-90 -translate-x-2 -translate-y-20 opacity-30 rounded-xl md:scale-100 lg:scale-75"
          />
        </motion.div>

        <motion.div
          variants={fadeIn("right", "spring", 1, 1.5)}
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={"/images/products/lionking.png"}
            alt={"lionking"}
            width={500}
            height={500}
            className="scale-75 translate-y-10 "
          ></Image>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "tween", duration: 2, delay: 1 }}
          className="z-10 text-center"
        >
          <Link
            className="absolute font-bold text-gray-300 -translate-x-10 -translate-y-10 hover:text-gray-100"
            href="/product/timon-pumbaa"
          >
            View Product
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SectionFive;
