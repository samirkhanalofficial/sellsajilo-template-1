import {
  getCategories,
  getCompanyData,
  getProducts,
} from "@/app/functions/get-data";
import { getHostName } from "@/app/helper/hostname";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Search from "../Search/Search";

export default async function ProductsList({
  search,
  category,
  page,
}: {
  search: string;
  category: string;
  page: number;
}) {
  const hostname = await getHostName();
  const products = await getProducts(hostname, page, search, category);
  const company = await getCompanyData(hostname);
  const categories = await getCategories(company._id);
  // const path = await getPathName();

  if (!products) return <></>;
  return (
    <>
      <center>
        <h2 className="text-3xl font-poppins">Our Products</h2>
        <p className="text-sm text-gray-500">
          Get the latest products in no time.
        </p>
        <br />
        <Search />
      </center>
      <br />
      <br />
      <div className="mx-auto max-w-[900px] h-12 ">
        <ul className="flex gap-x-5 flex-wrap">
          <li>
            <Link
              className={`px-2 py-1  inline-block  hover:border-b-4 ${
                category == "" && "border-b-4"
              } `}
              style={{
                borderColor: `${company.brandColor}`,
                color: category == "" ? `${company.brandColor}` : "black",
              }}
              href={"/"}
            >
              All Category
            </Link>
          </li>

          {categories.categories.map((tempCategory) => (
            <li key={`nav-${tempCategory._id}`}>
              <Link
                className={`px-2 py-1  inline-block  hover:border-b-4 ${
                  category == tempCategory._id && "border-b-4"
                }`}
                style={{
                  borderColor: `${company.brandColor}`,
                  color:
                    category == tempCategory._id
                      ? `${company.brandColor}`
                      : "black",
                }}
                href={".?category=" + tempCategory._id}
              >
                {tempCategory.name.toString()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {products.products.length == 0 && (
        <div className="py-20">
          <center>
            <Image
              src={"/no-product.png"}
              width={300}
              height={300}
              alt="no products"
              className="object-contain"
            />
          </center>
        </div>
      )}
      <div className="pt-6 mx-auto max-w-[900px] gap-x-2 gap-y-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.products.map((product) => (
          <Link
            href={`/product/${product._id}`}
            className="block bg-white p-5 group cursor-pointer transition-all duration-700 hover:scale-95 active:scale-110"
            key={"product" + product._id}
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={`${product.images[0].path}`}
                alt={product.name}
                fill
                className="absolute cover group-hover:scale-110 transition-all duration-700"
              />
            </div>
            <span className="pt-3 block line-clamp-2 font-poppins text-sm font-semibold transition-all duration-700  text-ellipsis group-hover:text-red-500">
              {product.name}
            </span>
            <div className="flex justify-between items-center">
              <span className="line-through text-red-500 text-lg">
                Rs. <span>{product.price}</span>
              </span>
              <span>
                Rs. <span>{product.price - product.discount}</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
