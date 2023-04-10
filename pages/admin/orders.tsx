// @ts-nocheck

import { EyeIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { formatDate } from "../../helpers/formatDate";
import { getError } from "../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const AdminOrderScreen: React.FC = (): React.ReactElement => {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="Admin Dashboard">
      <div className="grid lg:grid-cols-4 lg:gap-5">
        <div className="flex items-center gap-5 mt-10 lg:flex-col">
          <Link className="font-bold dashboard-button" href="/admin/dashboard">
            Dashboard
          </Link>
          <button disabled className=" dashboard-inactive" href="/admin/orders">
            Orders
          </button>
          <Link href="/admin/products" className="dashboard-button">
            Products
          </Link>
          <Link className="dashboard-button" href="/admin/users">
            Users
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "tween", duration: 0.5, delay: 0.5 }}
          className="overflow-x-auto md:col-span-3"
        >
          <h1 className="py-4 text-xl font-bold">Admin Orders</h1>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">ID</th>
                    <th className="p-5 text-left">USER</th>
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
                      <td className="p-5">{order._id.substring(20, 24)}</td>
                      <td className="p-5">
                        {order.user ? order.user.name : "DELETED USER"}
                      </td>
                      <td className="p-5">{formatDate(order.createdAt)}</td>
                      <td className="p-5">${order.totalPrice}</td>
                      <td className="p-5">
                        {order.isPaid
                          ? `${formatDate(order.paidAt)}`
                          : "Not Paid"}
                      </td>
                      <td className="p-5">
                        {order.isDelivered
                          ? `${formatDate(order.deliveredAt)}`
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
      </div>
    </Layout>
  );
};

AdminOrderScreen.auth = { adminOnly: true };

export default AdminOrderScreen;
