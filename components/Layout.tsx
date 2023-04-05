// @ts-nocheck
import { Menu } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";
import { CartItem } from "../utils/data.interface"; //TS
import Dropdown from "./Dropdown";
import Footer from "./Footer";

type LayoutProps = {
  title?: string;
  children?: React.ReactElement | string;
};

// type SessionUser = {
//   _id: string;
//   name?: string | null;
//   email?: string | null;
//   image?: string | null;
//   isAdmin?: any;
// };

// type CustomSession = {
//   user: SessionUser;
// };

const Layout: React.FC<LayoutProps> = ({
  title,
  children,
}): React.ReactElement => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(
      cart.cartItems.reduce((a: number, c: CartItem) => a + c.quantity, 0)
    );
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  const [query, setQuery] = useState("");

  const router = useRouter();
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <>
      <Head>
        <title>{title ? `${title} - Poptoons` : "Poptoons"}</title>
        <meta name="description" content="ECommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex flex-col justify-between min-h-screen">
        <header>
          <nav className="flex items-center justify-between h-12 px-4 shadow-md bg-gradient-to-b from-red-500 to-red-700">
            {/* //? Home Button */}
            <Link href="/">
              <Image
                src={`/images/logos/logo.png`}
                alt={"Pop Toons Shop"}
                width={60}
                height={60}
              ></Image>
            </Link>

            <div className="flex justify-center">
              {/* //? Shop */}
              <Link
                className="p-2 font-medium text-large hover:text-gray-100"
                href="/search"
              >
                Shop
              </Link>
              {/* //? Badge */}
              <Link
                className="p-2 font-bold text-large hover:text-gray-100"
                href="/cart"
              >
                <div className="cartIcon">
                  <ShoppingCartIcon className="w-6 h-6 hover:scale-110"></ShoppingCartIcon>
                </div>
                {cartItemsCount > 0 && (
                  <span className="absolute px-2 py-1 ml-3 text-xs font-bold text-white -translate-y-8 bg-red-500 rounded-full border-[1px]">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {/* //? If session exists, show username, else show login */}
              {status === "loading" ? (
                <div className="flex items-center justify-center h-full translate-y-2">
                  <MoonLoader size={18} color={"#000"} loading={true} />
                </div>
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block font-medium">
                  <Menu.Button className="px-2 mt-2 hover:text-gray-100">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 z-10 w-56 origin-top-right bg-white rounded-lg shadow-lg">
                    <Menu.Item>
                      <Dropdown
                        className="rounded-t-lg dropdown-link"
                        href="/profile"
                      >
                        Profile
                      </Dropdown>
                    </Menu.Item>
                    <Menu.Item>
                      <Dropdown className="dropdown-link" href="/order-history">
                        Order History
                      </Dropdown>
                    </Menu.Item>

                    {session.user.isAdmin && (
                      <Menu.Item>
                        <Dropdown
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </Dropdown>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <Link
                        className="rounded-b-lg dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </Link>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link
                  className="p-2 font-medium text-large hover:text-gray-100"
                  href="/login"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        {/* //? Search Button */}
        <form
          onSubmit={submitHandler}
          className="justify-center hidden w-full p-2 mx-auto bg-gray-100 md:flex"
        >
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="p-1 text-sm rounded-tr-none rounded-br-none focus:ring-0"
            placeholder="Search products"
          />
          <button
            className="p-1 text-sm rounded rounded-tl-none rounded-bl-none bg-amber-300 dark:text-black"
            type="submit"
            id="button-addon2"
          >
            <MagnifyingGlassIcon className="w-5 h-5 hover:scale-105"></MagnifyingGlassIcon>
          </button>
        </form>
        <main className="container px-4 m-auto mt-4">{children}</main>
        <Footer></Footer>
        {/* <footer className="flex items-center justify-center h-10 shadow-inner">
          Copyright @ 2023 Poptoons Shop
        </footer> */}
      </div>
    </>
  );
};

export default Layout;
