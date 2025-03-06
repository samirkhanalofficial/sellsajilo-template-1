import { headers } from "next/headers";
import { URL } from "url";

export async function getHostName(): Promise<string> {
  const headerList = await headers();

  const path = headerList.get("referer");
  const url = new URL(path ?? "http://localhost:3000");
  return url.hostname;
}

export async function getPathName(): Promise<string> {
  const headerList = await headers();

  const path = headerList.get("referer");
  const url = new URL(path ?? "http://localhost:3000");
  return url.pathname;
}
