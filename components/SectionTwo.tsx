import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { Product } from "../utils/data.interface";
import { fadeIn, staggerContainer } from "../utils/motion";
import { Store } from "../utils/Store";
import ProductItem from "./ProductItem";

const SectionTwo: React.FC<{ products: Product[] }> = ({
  products,
}): React.ReactElement => {
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
        src={"/images/logos/aot-logo.jpeg"}
        alt={"AOTlogo"}
        width={300}
        height={0}
        className="items-center text-center"
      />
      <motion.div
        variants={staggerContainer(0, 5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="2xl:max-w-[1280px] w-full mx-auto flex flex-col justify-around lg:flex-row gap-8"
      >
        <motion.div
          variants={fadeIn("left", "tween", 0, 1)}
          className="absolute"
        >
          <Image
            src={"/images/backgrounds/aotbg.png"}
            alt={"AOT"}
            width={700}
            height={0}
            className="md:-translate-x-1/3 sm:-translate-y-10 md:scale-90 lg:-translate-x-1/2 lg:-translate-y-1/4"
          />
        </motion.div>

        <div className="grid items-center grid-cols-2 gap-4 md:grid-cols-4">
          {products
            .filter((x) => x.category === "Attack on Titan")
            .map((product, idx) => (
              <motion.div
                variants={fadeIn("left", "spring", 1 + idx * 0.3, 1.5)}
                whileHover={{ scale: 1.05 }}
                key={idx}
                className="z-10"
              >
                <ProductItem
                  key={product.slug}
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SectionTwo;
