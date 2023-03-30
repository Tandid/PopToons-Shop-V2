import Head from "next/head";
import Link from "next/link";
import React from "react";

type Props = {
  title?: string;
  children?: React.ReactElement | string;
};

const Layout: React.FC<Props> = ({ title, children }): React.ReactElement => {
  return (
    <>
      <Head>
        <title>{title ? `${title} - Poptoons` : "Poptoons"}</title>
        <meta name="description" content="ECommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center px-4">
            <Link href="/">
              <h1 className="text-lg font-bold">Poptoons</h1>
            </Link>
            <div>
              <Link className="p-2" href="/cart">
                Cart
              </Link>
              <Link className="p-2" href="/login">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center h-10 items-center shadow-inner">
          Copyright @ 2023 Poptoons Shop
        </footer>
      </div>
    </>
  );
};

export default Layout;
