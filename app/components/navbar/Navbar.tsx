import { companyType } from "@/app/types/company.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Navbar(company: companyType) {
  if (!company) return <></>;
  return (
    <nav className="w-full bg-white shadow-lg ">
      <div className="max-w-[900px] mx-auto flex justify-between items-center">
        <Link className="cursor-pointer" href={"/"}>
          <Image
            alt={company.shopName}
            src={company.logo.path}
            width={70}
            height={20}
            className="object-contain"
          />
        </Link>
        <div>
          <ul className="flex gap-x-3">
            <li className="px-5">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="px-5">
              <Link href={company.facebook}>Facebook</Link>
            </li>
            <li className="px-5">
              <Link href={company.instagram}>Instagram</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
