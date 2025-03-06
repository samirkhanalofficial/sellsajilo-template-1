"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function Search() {
  const query = useSearchParams();
  const router = useRouter();
  const search = query.get("search");
  const category = query.get("category");
  const [searchValue, setSearchValue] = useState(
    () => search?.toString() ?? ""
  );
  return (
    <div className="flex items-center  max-w-[900px] px-3 py-2 bg-white rounded-3xl">
      <BiSearch />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (category) {
            router.push(`/?category=${category}&search=${searchValue}`);
          } else {
            router.push(`/?search=${searchValue}`);
          }
        }}
      >
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className="w-full outline-none px-3 bg-transparent "
        />
      </form>
    </div>
  );
}
