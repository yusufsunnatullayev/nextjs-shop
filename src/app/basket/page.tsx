"use client";

import React, { useEffect, useState } from "react";
import ProductCart from "@/components/ProductCart";
import { ProductType } from "@/interfaces";
import Link from "next/link";

const Basket = () => {
  const [total, setTotal] = useState(0);
  const [basketProducts, setBasketProducts] = useState<ProductType[]>(
    JSON.parse(localStorage.getItem("carts") || "null") || []
  );

  const removeProduct = (id: number) => {
    const updatedBasket = basketProducts.filter((product) => product.id !== id);
    localStorage.setItem("carts", JSON.stringify(updatedBasket));
    setBasketProducts(updatedBasket);
  };

  const handleIncrement = (id: number) => {
    const updatedBasket = basketProducts.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
    localStorage.setItem("carts", JSON.stringify(updatedBasket));
    setBasketProducts(updatedBasket);
  };
  const handleDecrement = (id: number) => {
    const existProduct = basketProducts.find((product) => product.id === id);

    if (existProduct?.quantity === 1) {
      removeProduct(existProduct.id);
    } else {
      const updatedBasket = basketProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });
      localStorage.setItem("carts", JSON.stringify(updatedBasket));
      setBasketProducts(updatedBasket);
    }
  };

  useEffect(() => {
    const total = basketProducts.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0
    );
    setTotal(total);
  }, [basketProducts]);

  return (
    <>
      {basketProducts.length ? (
        <section className="bg-white py-8 antialiased md:py-24">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 ">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Shopping Cart
            </h2>

            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {basketProducts.map((product) => (
                    <ProductCart
                      key={product.id}
                      product={product}
                      removeProduct={removeProduct}
                      handleDecrement={handleDecrement}
                      handleIncrement={handleIncrement}
                    />
                  ))}
                </div>
              </div>

              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 ">
                    Order summary
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 ">
                          Subtotal
                        </dt>
                        <dd className="text-base font-medium text-gray-900 ">
                          ${total.toFixed(1)}
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 ">
                          Shipping
                        </dt>
                        <dd className="text-base font-medium text-green-600">
                          {(10).toLocaleString("en-US", {
                            currency: "usd",
                            style: "currency",
                          })}
                        </dd>
                      </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                      <dt className="text-base font-bold text-gray-900 ">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 ">
                        {(total + 10).toLocaleString("en-US", {
                          currency: "usd",
                          style: "currency",
                        })}
                      </dd>
                    </dl>
                  </div>

                  <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 -600 rimary-700 -primary-800"
                  >
                    Proceed to Checkout
                  </a>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 ">
                      {" "}
                      or{" "}
                    </span>
                    <Link
                      href="/"
                      title=""
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
                    >
                      Continue Shopping
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="voucher"
                        className="mb-2 block text-sm font-medium text-gray-900 "
                      >
                        {" "}
                        Do you have a voucher or gift card?{" "}
                      </label>
                      <input
                        type="text"
                        id="voucher"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                        placeholder=""
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
                    >
                      Apply Code
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white py-20">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-8 text-5xl tracking-tight font-extrabold lg:text-7xl text-primary-600 ">
                empty cart
              </h1>
              <p className="mb-4 text-2xl tracking-tight font-semibold text-gray-900 md:text-3x">
                Add products to cart first to purchase!
              </p>
              <Link
                href={"/"}
                className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  my-4"
              >
                Products
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Basket;
