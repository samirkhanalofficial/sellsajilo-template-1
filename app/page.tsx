import { getHostName } from "./helper/hostname";
import ProductsList from "./components/Products/ProductsList";
import { AiOutlineWhatsApp } from "react-icons/ai";
import Link from "next/link";
import { getCompanyData } from "./functions/get-data";
export default async function Home({
  searchParams,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: any;
}) {
  const { search = "", category = "", page = 0 } = await searchParams;
  const url = await getHostName();
  if (!url) throw new Error("No host name found");
  const hostname = await getHostName();
  const company = await getCompanyData(hostname);

  return (
    <div className="py-5 px-5">
      <Link
        href={
          "https://api.whatsapp.com/send?phone=" +
          company.phone.replace("+", "")
        }
        className="p-2 fixed bottom-5 right-3 rounded-full bg-green-400 transition-all duration-300 cursor-pointer hover:bg-green-800 active:bg-green-600"
      >
        <AiOutlineWhatsApp size={35} color="white" />
      </Link>
      <br />

      <ProductsList
        search={search.toString()}
        category={category.toString()}
        page={Number(page.toString())}
      />
    </div>
  );
}
