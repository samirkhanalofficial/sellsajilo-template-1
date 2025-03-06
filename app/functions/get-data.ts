import { URL } from "url";
import { API_URL } from "../config/constant";
import { categoryType } from "../types/category.type";
import { companyType } from "../types/company.type";
import { productType } from "../types/product.type";

export const getCompanyData = async (hostname: string): Promise<companyType> =>
  await fetch(`${API_URL}/v1/vendors/get-vendor/${hostname}`, {
    cache: "no-cache",
  }).then((res) => res.json());

export const getCategories = async (
  vendor: string
): Promise<{
  total: number;
  categories: categoryType[];
}> =>
  await fetch(`${API_URL}/v1/category/all/${vendor}`, {
    cache: "no-cache",
  }).then((res) => res.json());

export const getProducts = async (
  hostname: string,
  page: number,
  search: string,
  category: string
): Promise<{
  total: number;
  products: productType[];
}> => {
  const url = new URL(`${API_URL}/v1/product/all`);
  url.searchParams.append("domain", hostname.toString());
  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", "20");
  if (search != "") {
    url.searchParams.append("search", search.toString());
  }
  if (category != "") {
    url.searchParams.append("categoryId", category.toString());
  }
  return await fetch(url.href, {
    cache: "no-cache",
  }).then((res) => res.json());
};
export const getProductById = async (id: string): Promise<productType | null> =>
  await fetch(`${API_URL}/v1/product/id/${id}`, {
    cache: "no-cache",
  }).then((res) => res.json());
