"use client";

import { ProductType } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import CustomImage from "./Image";

const Product: FC<{ product: ProductType }> = ({ product }) => {
  console.log(product);
  return (
    <Link
      href={`/product/${product.id}`}
      className="h-96 flex flex-col p-6 rounded-lg group hover:scale-105 transition-transform ease-out duration-200 shadow cursor-pointer"
    >
      <div className="relative max-h-72 flex-1">
        <CustomImage product={product} fill />
      </div>
      <h3 className="mt-5 tracking-widest text-indigo-500 text-xs font-medium title-font">
        {product.category}
      </h3>
      <div className="font-semibold flex items-center justify-between mt-4 mb-1">
        <p className="w-44 truncate">{product.title}</p>
        <p>${product.price}</p>
      </div>
      <p className="leading-relaxed text-base line-clamp-3">
        {product.description}
      </p>
    </Link>
  );
};

export default Product;
