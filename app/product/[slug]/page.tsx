import PickSlider from "@/app/components/PickSlider/PickSlider";
import { getCompanyData, getProductById } from "@/app/functions/get-data";
import { getHostName } from "@/app/helper/hostname";
import React from "react";
import BookingForm from "./BookingForm/BookingForm";

export default async function Product({
  params,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: any;
}) {
  const { slug: productId } = await params;
  const product = await getProductById(productId?.toString() ?? "");

  const hostname = await getHostName();
  const company = await getCompanyData(hostname);
  if (!product) return <></>;

  return (
    <div className="">
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative  aspect-square p-20">
          <PickSlider medias={product.images} />
        </div>
        <div>
          <h2 className="text-4xl">{product.name}</h2>
          <p className="whitespace-pre-wrap">{product.desc}</p>
          <br />
          <div className="flex gap-x-4">
            <span className="px-3 py-3 bg-black text-white rounded-md">
              Stocks: {product.unlimitedStocks ? "unlimited" : product.stocks}
            </span>
          </div>
          <br />
          <br />
          <div className="flex gap-x-5">
            <span className="line-through text-red-500 text-2xl">
              Rs. ${product.price}
            </span>

            <span>Rs. {product.price - product.discount}</span>
          </div>
          <br />

          <BookingForm
            hostname={hostname}
            company={company}
            product={product}
          />
        </div>
      </div>
    </div>
  );
}
