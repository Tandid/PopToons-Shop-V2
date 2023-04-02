import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { Product } from "../utils/data.interface";
import { Store } from "../utils/Store";

const CartScreen: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  //? Removes item from cart
  const removeItemHandler = (item: Product) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateCartHandler = async (item: Product, qty: string) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success("Product updated in the cart");
  };

  return (
    <Layout title="Shopping Cart">
      <div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "tween", duration: 0.5 }}
        >
          <h1 className="py-4 text-xl font-bold">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <div className="py-4">Oops! Looks like your cart is empty. </div>
          ) : (
            <div className="grid md:grid-cols-4 md:gap-5">
              <div className="overflow-x-auto md:col-span-3">
                <table className="min-w-full">
                  <thead className="border-b"></thead>
                  {/* Item | Quantity | Price | Action */}
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5">Action</th>
                  </tr>
                  <tbody>
                    {/* Row containing Cart Item Information */}
                    {cartItems.map((item) => (
                      <tr key={item.slug} className="border-b ">
                        <td>
                          <Link
                            className="flex items-center"
                            href={`/product/${item.slug}`}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={75}
                              height={50}
                              className="p-2"
                            ></Image>
                            &nbsp;
                            {item.name}
                          </Link>
                        </td>
                        <td className="px-5 text-right">
                          <select
                            value={item.quantity}
                            onChange={(e) =>
                              updateCartHandler(item, e.target.value)
                            }
                          >
                            {[...Array(item.countInStock).keys()].map(
                              (x: number) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </td>
                        <td className="px-5 text-right">${item.price}</td>
                        <td className="px-5 text-center">
                          <button onClick={() => removeItemHandler(item)}>
                            <TrashIcon className="w-5 h-5 hover:scale-125"></TrashIcon>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-5 card">
                <ul>
                  <li>
                    <div className="pb-3 text-xl">
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)})
                      : $
                      {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </div>
                  </li>
                  <li>
                    <button
                      className="w-full text-white primary-button"
                      onClick={() => router.push("login?redirect=/shipping")} //If logged in, redirect to shipping page
                    >
                      Checkout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </motion.div>
        <div className="py-2 text-gray-400">
          <Link className="font-bold hover:text-gray-500" href="/search">
            Return to Shop
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
