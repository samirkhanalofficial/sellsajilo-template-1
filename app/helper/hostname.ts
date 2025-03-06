import { headers } from "next/headers";

export async function getHostName(): Promise<string> {
  const headerList = await headers();

  const host = headerList.get("Host");
  console.log(host);
  return host ?? "localhost";
}

// export async function getPathName(): Promise<string> {
//   const headerList = await headers();

//   const path = headerList.get("content-location");
//   console.log("path", path);
//   const url = new URL(path ?? "http://localhost:3000");
//   return '/';
// }
