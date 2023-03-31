/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import React from "react";

const SectionTwo: React.FC = (): React.ReactElement => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card"
    >
      Hello
    </motion.div>
  );
};

export default SectionTwo;
