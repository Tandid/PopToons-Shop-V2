// @ts-nocheck

import axios from "axios";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Checkout from "../components/Checkout";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";

const PlaceOrderScreen: React.FC = (): React.ReactElement => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place Order">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <Checkout activeStep={3} />
        <h1 className="py-4 text-xl font-bold">Place Order</h1>
        {cartItems.length === 0 ? (
          <div>
            Cart is empty. <Link href="/">Go shopping</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <div className="p-5 card">
                <h2 className="mb-2 text-lg font-bold">Shipping Address</h2>
                <div>
                  {shippingAddress.fullName}, {shippingAddress.address},{" "}
                  {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                  {shippingAddress.country}
                </div>
                <div className="py-2 text-gray-400">
                  <Link className=" hover:text-gray-500" href="/shipping">
                    Edit
                  </Link>
                </div>
              </div>
              <div className="p-5 card">
                <h2 className="mb-2 text-lg font-bold">Payment Method</h2>
                <div>{paymentMethod}</div>
                <div className="py-2 text-gray-400">
                  <Link className=" hover:text-gray-500" href="/payment">
                    Edit
                  </Link>
                </div>
              </div>
              <div className="p-5 overflow-x-auto card">
                <h2 className="mb-2 text-lg font-bold">Order Items</h2>
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-5 text-left">Item</th>
                      <th className="p-5 text-right ">Quantity</th>
                      <th className="p-5 text-right ">Price</th>
                      <th className="p-5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td>
                          <Link
                            className="flex items-center"
                            href={`/product/${item.slug}`}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </Link>
                        </td>
                        <td className="p-5 text-right ">{item.quantity}</td>
                        <td className="p-5 text-right">${item.price}</td>
                        <td className="p-5 text-right">
                          ${item.quantity * item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="py-2 text-gray-400">
                  <Link className=" hover:text-gray-500" href="/cart">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="p-5 card">
                <h2 className="mb-2 text-lg font-bold">Order Summary</h2>
                <ul>
                  <li>
                    <div className="flex justify-between mb-2">
                      <div>Items</div>
                      <div>${itemsPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="flex justify-between mb-2">
                      <div>Tax</div>
                      <div>${taxPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="flex justify-between mb-2">
                      <div>Shipping</div>
                      <div>${shippingPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="flex justify-between mb-2">
                      <div>Total</div>
                      <div>${totalPrice}</div>
                    </div>
                  </li>
                  <li>
                    <button
                      disabled={loading}
                      onClick={placeOrderHandler}
                      className="w-full text-white primary-button"
                    >
                      {loading ? "Loading..." : "Place Order"}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

PlaceOrderScreen.auth = true;

export default PlaceOrderScreen;
