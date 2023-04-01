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
      className="card"
    >
      <Link href={`/product/${product.slug}`} className="flex justify-center">
        <Image
          src={product.image}
          alt={product.name}
          width={250}
          height={250}
          className="p-2"
        />
      </Link>

      <div className="flex flex-col items-center p-1">
        <h2 className="text-lg">{product.name}</h2>
        <p>${product.price}</p>
      </div>

      <div className="flex justify-around p-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to Cart
        </motion.button>

        <Link href={`/product/${product.slug}`}>
          <button className="p-2">
            <ArrowTopRightOnSquareIcon className="h-5 w-15"></ArrowTopRightOnSquareIcon>
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductItem;
