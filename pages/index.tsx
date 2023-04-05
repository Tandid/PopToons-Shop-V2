// @ts-nocheck

import Banner from "../components/Banner";
import CollectionOne from "../components/CollectionOne";
import CollectionTwo from "../components/CollectionTwo";
import FeaturedOne from "../components/FeaturedOne";
import FeaturedTwo from "../components/FeaturedTwo";
import Layout from "../components/Layout";
import SectionFive from "../components/SectionFive";
import SectionOne from "../components/SectionOne";
import SectionSix from "../components/SectionSix";
import SectionTwo from "../components/SectionTwo";
import Product from "../models/Product";
import db from "../utils/db";

const Home: React.FC = ({ products }): React.ReactElement => {
  return (
    <Layout title="Home">
      <div>
        <Banner />
        <SectionOne></SectionOne>
        <div>
          <div className="scale-110 bg-slate-800 p-14">
            <h1 className="font-bold md:text-[64px] text-[36px] text-gray-500 text-center">
              Featured Collection
            </h1>
          </div>
          <FeaturedOne products={products}></FeaturedOne>
          <div className="p-4 scale-x-125 bg-gray-100 sm:scale-150 lg:scale-125 xl:scale-110"></div>
          <FeaturedTwo products={products}></FeaturedTwo>
          <div className="scale-110 bg-slate-800 ">
            <SectionTwo></SectionTwo>
          </div>
          {/* <div className="p-10 mt-8 scale-110 bg-gray-300 opacity-80">
            <h1 className="font-bold md:text-[64px] text-[40px] text-white text-center">
              Fan Favorites
            </h1>
          </div> */}
          <CollectionOne products={products}></CollectionOne>
          <CollectionTwo products={products}></CollectionTwo>
          {/* <div className="p-4 mt-8 scale-110 bg-gray-300 "></div> */}
          <div className="flex flex-col justify-center lg:flex-row">
            <SectionFive products={products}></SectionFive>
            <SectionSix products={products}></SectionSix>
          </div>
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
