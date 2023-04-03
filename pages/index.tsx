// @ts-nocheck

import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import Banner from "../components/Banner";
import Layout from "../components/Layout";
import SectionFive from "../components/SectionFive";
import SectionFour from "../components/SectionFour";
import SectionOne from "../components/SectionOne";
import SectionThree from "../components/SectionThree";
import SectionTwo from "../components/SectionTwo";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/Store";

const Home: React.FC = ({ products }): React.ReactElement => {
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
    <Layout title="Home">
      <div>
        <Banner />
        <SectionOne></SectionOne>
        <div>
          {/* <h1 className="text-bold text-large text-[50px] text-center">
            Featured Collections
          </h1> */}
          <SectionTwo products={products}></SectionTwo>
          <SectionThree products={products}></SectionThree>
          <SectionFour products={products}></SectionFour>
          <SectionFive products={products}></SectionFive>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}

export default Home;
