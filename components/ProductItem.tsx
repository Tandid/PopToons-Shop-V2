/* eslint-disable @next/next/no-img-element */
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "../utils/data.interface";

interface ProductItemProps {
  product: Product;
  addToCartHandler: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  addToCartHandler,
}): React.ReactElement => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white card"
    >
      <Link
        href={`/product/${product.slug}`}
        className="flex justify-center bg-white"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={250}
          height={250}
          className="p-2"
        />
        <div className="absolute py-4 scale-125">
          <p className="relative px-2 text-white bg-yellow-500 shadow-lg rounded-xl text-bold">
            ${product.price}
          </p>
        </div>
      </Link>

      <div className="flex flex-col px-5 text-center">
        <h2 className="text-lg text-bold">{product.name}</h2>
        <p className="px-5 text-sm text-yellow-400">{product.category}</p>
      </div>

      <div className="flex justify-around p-2 bg-gray-100 rounded-b-lg">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to Cart
        </motion.button>

        <Link className="py-2" href={`/product/${product.slug}`}>
          <ArrowTopRightOnSquareIcon className="w-6 h-6 hover:scale-110"></ArrowTopRightOnSquareIcon>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductItem;
