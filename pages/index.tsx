// @ts-nocheck

import Banner from "../components/Banner";
import Layout from "../components/Layout";
import SectionFive from "../components/SectionFive";
import SectionFour from "../components/SectionFour";
import SectionOne from "../components/SectionOne";
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
