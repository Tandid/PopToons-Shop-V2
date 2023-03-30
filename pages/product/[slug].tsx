import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../../components/Layout";
import products from "../../utils/data";
import { Store } from "../../utils/Store"; //? Provides store access

const ProductScreen: React.FC = (): React.ReactElement => {
  const { state, dispatch } = useContext(Store); //? Provides store access
  const { query } = useRouter();
  const { slug } = query;
  const product = products.find((p) => p.slug === slug);

  const addToCartHandler = () => {
    //? Check if product exists in cart already, if it does, increase quantity by 1
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    //? if quantity exceeds stock, send alert and prevent adding to cart further
    if (product.countInStock < quantity) {
      alert("Sorry, this product is out of stock!");
      return;
    }

    //? Updates the state with the new quantity in cart
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <Layout title={product.name}>
      <div className="flex">
        {/* //* Back to Products Button */}
        <div className="py-2">
          <Link href="/"> Back to Products </Link>
        </div>

        {/*//* Product Image */}
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

        {/*//* Product Details */}
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
              {/*//* Product Price */}
              <div>Price</div>
              <div>{product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              {/* Product Stock */}
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In Stock" : "Unavailable"}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;
