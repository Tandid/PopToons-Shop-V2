// @ts-nocheck

import axios from "axios";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

import Link from "next/link";
import { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
const AdminDashboardScreen: React.FC = (): React.ReactElement => {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Sales",
        backgroundColor: "rgba(162, 222, 208, 1)",
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };
  return (
    <Layout title="Admin Dashboard">
      <div className="grid lg:grid-cols-4 lg:gap-5">
        <div className="flex items-center gap-5 mt-10 lg:flex-col">
          <button disabled className="dashboard-inactive">
            Dashboard
          </button>
          <Link className="dashboard-button" href="/admin/orders">
            Orders
          </Link>
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
          className="md:col-span-3"
        >
          <h1 className="py-2 text-xl font-bold">Admin Dashboard</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="p-5 m-5 card">
                  <p className="text-3xl">${summary.ordersPrice} </p>
                  <p>Total Sales</p>
                  <div className="text-gray-400 ">
                    <button
                      className=" hover:text-gray-500"
                      href="/admin/orders"
                    >
                      View Sales
                    </button>
                  </div>
                </div>
                <div className="p-5 m-5 card">
                  <p className="text-3xl">{summary.ordersCount} </p>
                  <p>Total Orders</p>
                  <div className="text-gray-400 ">
                    <button
                      className=" hover:text-gray-500"
                      href="/admin/orders"
                    >
                      View Orders
                    </button>
                  </div>
                </div>
                <div className="p-5 m-5 card">
                  <p className="text-3xl">{summary.productsCount} </p>
                  <p>Products</p>
                  <div className="text-gray-400 ">
                    <button
                      className=" hover:text-gray-500"
                      href="/admin/products"
                    >
                      View Products
                    </button>
                  </div>
                </div>
                <div className="p-5 m-5 card">
                  <p className="text-3xl">{summary.usersCount} </p>
                  <p>Users</p>
                  <div className="text-gray-400 ">
                    <button
                      className=" hover:text-gray-500"
                      href="/admin/users"
                    >
                      View Users
                    </button>
                  </div>
                </div>
              </div>
              <h2 className="py-4 text-xl font-bold">Sales Revenue</h2>
              <Bar
                options={{
                  legend: { display: true, position: "right" },
                }}
                data={data}
              />
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;
