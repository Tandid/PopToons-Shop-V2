// @ts-nocheck

import { EyeIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useReducer } from "react";
import { BeatLoader } from "react-spinners";
import Layout from "../components/Layout";
import { getError } from "../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
const OrderHistoryScreen: React.FC = (): React.ReactElement => {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Layout title="Order History">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <h1 className="py-4 text-xl font-bold">Order History</h1>
        {loading ? (
          <div>
            <BeatLoader size={10} color={"#000"} loading={true}></BeatLoader>
          </div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">ID</th>
                  <th className="p-5 text-left">DATE</th>
                  <th className="p-5 text-left">TOTAL</th>
                  <th className="p-5 text-left">PAID</th>
                  <th className="p-5 text-left">DELIVERED</th>
                  <th className="p-5 text-left">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="p-5 ">{order._id.substring(20, 24)}</td>
                    <td className="p-5 ">{formatDate(order.createdAt)}</td>
                    <td className="p-5 ">${order.totalPrice}</td>
                    <td className="p-5 ">
                      {order.isPaid
                        ? `${formatDate(order.paidAt)}`
                        : "Not Paid"}
                    </td>
                    <td className="p-5 ">
                      {order.isDelivered
                        ? `${order.deliveredAt.substring(0, 10)}`
                        : "Not Delivered"}
                    </td>

                    <td className="p-5 text-gray-400">
                      <Link
                        className=" hover:text-gray-500"
                        href={`/order/${order._id}`}
                        passHref
                      >
                        <EyeIcon className="w-5 h-5 hover:scale-125 active:scale-100"></EyeIcon>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

OrderHistoryScreen.auth = true;
export default OrderHistoryScreen;
