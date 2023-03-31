import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import products from "../utils/products";

const Home: React.FC = (): React.ReactElement => {
  return (
    <Layout title="Home">
      <div className="grid grid-cols-1 gap-4 md:grid-cols3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem product={product} key={product.slug}></ProductItem>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
