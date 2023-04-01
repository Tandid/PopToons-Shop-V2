import { Menu } from "@headlessui/react";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartItem } from "../utils/data.interface"; //TS
import { Store } from "../utils/Store";
import Dropdown from "./Dropdown";

type LayoutProps = {
  title?: string;
  children?: React.ReactElement | string;
};

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
  const submitHandler = (e) => {
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
          <nav className="flex items-center justify-between h-12 px-4 bg-red-500 shadow-md">
            {/* //? Home Button */}
            <Link href="/">
              <Image
                src={`/images/logo.png`}
                alt={"Pop Toons Shop"}
                width={60}
                height={60}
                className="bg-red-500"
              ></Image>
            </Link>

            <div>
              {/* //? Shop */}
              <Link
                className="p-2 font-bold text-white bg-red-500 text-large hover:text-black"
                href="/search"
              >
                Shop
              </Link>
              {/* //? Badge */}
              <Link
                className="p-2 font-bold text-white bg-red-500 text-large hover:text-black"
                href="/cart"
              >
                Cart
                {cartItemsCount > 0 && (
                  <span className="px-2 py-1 ml-1 text-xs font-bold text-white bg-red-600 rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {/* //? If session exists, show username, else show login */}
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block font-bold">
                  <Menu.Button className="px-2 text-gray-100 bg-red-500 hover:text-black">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 z-10 w-56 origin-top-right bg-white shadow-lg ">
                    <Menu.Item>
                      <Dropdown className="dropdown-link" href="/profile">
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
                        className="dropdown-link"
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
                  className="p-2 font-bold text-white bg-red-500 text-large"
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
            Search
          </button>
        </form>
        <main className="container px-4 m-auto mt-4">{children}</main>
        <footer className="flex items-center justify-center h-10 shadow-inner">
          Copyright @ 2023 Poptoons Shop
        </footer>
      </div>
    </>
  );
};

export default Layout;
