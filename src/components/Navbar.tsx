import Link from "next/link";
import React from "react";
import { FaShopify } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 left-0 w-full flex items-center justify-between p-5 bg-white shadow backdrop-blur-md">
      <Link className="flex items-center justify-start gap-3" href={"/"}>
        <FaShopify className="text-3xl" />
        <h1 className="text-2xl font-semibold">Shop</h1>
      </Link>
      <div className="flex items-center justify-end gap-5">
        <Link
          className="text-base font-medium hover:opacity-60 duration-200"
          href={"/"}
        >
          Home
        </Link>
        <Link
          className="text-base font-medium hover:opacity-60 duration-200"
          href={"/products"}
        >
          All products
        </Link>
        <Link
          href={"/basket"}
          className="flex items-center justify-center gap-2 py-2 px-3 bg-black text-white hover:bg-transparent font-semibold border hover:text-black duration-200 rounded-md"
        >
          <MdOutlineShoppingBag />
          <button className="">My bag</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
