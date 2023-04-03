// @ts-nocheck

import Banner from "../components/Banner";
import Layout from "../components/Layout";
import SectionFive from "../components/SectionFive";
import SectionFour from "../components/SectionFour";
import SectionOne from "../components/SectionOne";
import SectionSix from "../components/SectionSix";
import SectionThree from "../components/SectionThree";
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
            <h1 className="font-bold md:text-[64px] text-[40px] text-gray-500 text-center">
              Featured Collection
            </h1>
          </div>
          <SectionTwo products={products}></SectionTwo>
          <div className="p-4 scale-x-125 bg-gray-100 sm:scale-150 lg:scale-125 xl:scale-110"></div>
          <SectionSix products={products}></SectionSix>
          <div className="p-10 mt-8 scale-110 bg-gray-300 opacity-80">
            <h1 className="font-bold md:text-[64px] text-[40px] text-white text-center">
              Fan Favorites
            </h1>
          </div>
          <SectionThree products={products}></SectionThree>
          <SectionFour products={products}></SectionFour>
          <div className="p-4 mt-8 scale-110 bg-gray-300 "></div>
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
