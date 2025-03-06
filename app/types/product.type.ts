import { mediaType } from "./media.type";

export type productType = {
  _id: string;
  name: string;
  desc: string;
  images: mediaType[];
  price: number;
  discount: number;
  profit: number;
  stocks: number;
  vendor: string;
  category: string;
  unlimitedStocks: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};
