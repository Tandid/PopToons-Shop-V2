import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import products from "../../utils/data";

const ProductScreen: React.FC = (): React.ReactElement => {
  const { query } = useRouter();
  const { slug } = query;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <Layout title={product.name}>
      <div className="flex">
        {/* Back to Products Button */}
        <div className="py-2">
          <Link href="/"> Back to Products </Link>
        </div>

        {/* Product Image */}
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
            />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>{product.description}</li>
          </ul>
        </div>

        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              {/* Product Price */}
              <div>Price</div>
              <div>{product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              {/* Product Stock */}
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In Stock" : "Unavailable"}</div>
            </div>
            <button className="primary-button w-full">Add to Cart</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;
