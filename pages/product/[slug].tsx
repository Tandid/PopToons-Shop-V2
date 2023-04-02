import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import Product from "../../models/Product";
import db from "../../utils/db";
import { Store } from "../../utils/Store"; //? Provides store access

const ProductScreen: React.FC = (props): React.ReactElement => {
  const { product } = props;
  const { state, dispatch } = useContext(Store); //? Provides store access
  const router = useRouter();

  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    //? Check if product exists in cart already, if it does, increase quantity by 1
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    //? if quantity exceeds stock, send toast alert and prevent adding to cart further
    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }

    //? Updates the state with the new quantity in cart
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  return (
    <Layout title={product.name}>
      <div>
        {/* //* Back to Products Button */}
        <div className="py-4">
          <Link className="font-bold text-gray-500" href="/search">
            Back to Products
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "tween", duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3"
        >
          {/*//* Product Image */}

          <div className="border-[1px]">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
            />
          </div>
          {/*//* Product Details */}
          <ul className="p-4">
            <li>
              <h1 className="text-lg font-bold md:text-[24px]">
                {product.brand} {product.name}
              </h1>
            </li>
            <li className="text-yellow-500 md:text-[18px]">
              {product.category}
            </li>
            <li>{product.description}</li>
          </ul>

          <div>
            <div className="p-5 card">
              <div className="flex justify-between mb-2">
                {/*//* Product Price */}
                <div className="font-bold">Price</div>
                <div>${product.price}</div>
              </div>
              <div className="flex justify-between mb-2">
                {/* Product Stock */}
                <div className="font-bold">Status</div>
                <div>
                  {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="w-1/2 text-white primary-button"
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Product Reviews */}
        <div className="flex p-4 flex-cols">
          {product.rating} of {product.numReviews} reviews
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}

export default ProductScreen;
