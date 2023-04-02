import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Checkout from "../components/Checkout";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

const PaymentScreen: React.FC = (): React.ReactElement => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/placeorder");
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Payment Method">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <Checkout activeStep={2} />
        <form className="max-w-screen-md mx-auto" onSubmit={submitHandler}>
          <h1 className="py-4 text-xl font-bold">Choose Your Payment Method</h1>
          {["PayPal", "Stripe", "CashOnDelivery"].map((payment) => (
            <div key={payment} className="mb-4">
              <input
                name="paymentMethod"
                className="p-2 outline-none focus:ring-0"
                id={payment}
                type="radio"
                checked={selectedPaymentMethod === payment}
                onChange={() => setSelectedPaymentMethod(payment)}
              />

              <label className="p-2" htmlFor={payment}>
                {payment}
              </label>
            </div>
          ))}
          <div className="flex justify-between mb-4">
            <div className="py-2 text-gray-400">
              <Link className="font-bold hover:text-gray-500" href="/shipping">
                Back to Shipping
              </Link>
            </div>
            <button className="text-white primary-button">Next</button>
          </div>
        </form>
      </motion.div>
    </Layout>
  );
};

PaymentScreen.auth = true;

export default PaymentScreen;
