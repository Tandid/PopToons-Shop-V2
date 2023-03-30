import React, { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Product } from "../utils/data.interface";
import dynamic from "next/dynamic";

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

  const updateCartHandler = (item: Product, qty: string) => {
    const quantity = Number(qty);
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  return (
    <Layout title="Shopping Cart">
      <div>
        <h1 className="mb-4 text-xl">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div>
            Cart is Empty. <Link href="/"> Return to Shop </Link>
          </div>
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
                    <tr key={item.slug} className="border-b">
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
                          <TrashIcon className="h-5 w-5"></TrashIcon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card p-5">
              <ul>
                <li>
                  <div className="pb-3 text-xl">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :
                    ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </div>
                </li>
                <li>
                  <button
                    className="primary-button w-full"
                    onClick={() => router.push("login?redirect=/shipping")} //If logged in, redirect to shipping page
                  >
                    Checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
