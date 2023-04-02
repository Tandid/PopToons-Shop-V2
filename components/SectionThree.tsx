import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { fadeIn, staggerContainer } from "../utils/motion";
import { Store } from "../utils/Store";
import ProductItem from "./ProductItem";

const SectionThree: React.FC = ({ products }): React.ReactElement => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    toast.success("Product added to the cart");
  };
  return (
    <div className="flex flex-col items-center py-10">
      <Image
        src={"/images/naruto-logo.png"}
        alt={"Narutologo"}
        width={300}
        height={0}
        className="items-center text-center"
      />
      <motion.div
        variants={staggerContainer(0, 5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="2xl:max-w-[1280px] w-full mx-auto flex flex-col justify-around lg:flex-row gap-8"
      >
        <div className="grid items-center grid-cols-2 gap-4 md:grid-cols-4">
          {products
            .filter((x) => x.category === "shonen")
            .slice(0, 4)
            .map((product, idx) => (
              <motion.div
                variants={fadeIn("right", "spring", 1 + idx * 0.3, 1.5)}
                key={idx}
              >
                <ProductItem
                  key={product.slug}
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              </motion.div>
            ))}
        </div>
        <motion.div
          variants={fadeIn("right", "tween", 0, 1)}
          className="flex items-center justify-center"
        >
          <Image
            src={"/images/naruto-bg1.png"}
            alt={"AOT"}
            width={450}
            height={0}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SectionThree;
