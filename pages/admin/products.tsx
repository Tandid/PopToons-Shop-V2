import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      state;
  }
}
const AdminProductsScreen = () => {
  const router = useRouter();
  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  const createHandler = async () => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(`/api/admin/products`);
      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Product created successfully");
      router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (productId) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/products/${productId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("Product deleted successfully");
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Admin Products">
      <div className="grid lg:grid-cols-4 lg:gap-5">
        <div className="flex items-center gap-5 mt-10 lg:flex-col">
          <Link className="font-bold dashboard-button" href="/admin/dashboard">
            Dashboard
          </Link>
          <Link className="font-bold dashboard-button" href="/admin/orders">
            Orders
          </Link>
          <button disabled className="dashboard-inactive">
            Products
          </button>
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
          <div className="flex justify-between">
            <h1 className="py-4 text-xl font-bold">Products</h1>
            {loadingDelete && <div>Deleting item...</div>}
            {loadingCreate ? (
              <MoonLoader size={18} color={"#000"} loading={true} />
            ) : (
              <button disabled={loadingCreate} onClick={createHandler}>
                <PlusIcon className="w-10 h-10 p-2 bg-yellow-400 rounded-full hover:bg-yellow-500" />
              </button>
            )}
          </div>
          {loading ? (
            <MoonLoader size={18} color={"#000"} loading={true} />
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">ID</th>
                    <th className="p-5 text-left">NAME</th>
                    <th className="p-5 text-left">PRICE</th>
                    <th className="p-5 text-left">CATEGORY</th>
                    <th className="p-5 text-left">COUNT</th>
                    <th className="p-5 text-left">RATING</th>
                    <th className="p-5 text-left">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className="p-5 ">{product._id.substring(20, 24)}</td>
                      <td className="p-5 ">{product.name}</td>
                      <td className="p-5 ">${product.price}</td>
                      <td className="p-5 ">{product.category}</td>
                      <td className="p-5 ">{product.countInStock}</td>
                      <td className="p-5 ">{product.rating}</td>
                      <td className="p-5 ">
                        <div className="flex gap-1">
                          <Link href={`/admin/product/${product._id}`}>
                            <PencilSquareIcon className="w-5 h-5 hover:scale-125 active:scale-100">
                              Edit
                            </PencilSquareIcon>
                          </Link>

                          <button
                            onClick={() => deleteHandler(product._id)}
                            type="button"
                          >
                            <TrashIcon className="w-5 h-5 hover:scale-125 active:scale-100"></TrashIcon>
                          </button>
                        </div>
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

AdminProductsScreen.auth = { adminOnly: true };

export default AdminProductsScreen;
