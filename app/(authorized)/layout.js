import { Navbar } from "@/components/elements/navbar";
import { apiVerify } from "@/lib/apiRoutes";

import { redirect } from "next/navigation";

import { cookies } from "next/headers";

async function EnsureUser() {
  try {
    const response = await fetch(apiVerify, {
      credentials: "include",
      method: "GET",
      headers: { Cookie: (await cookies()).toString() },
      credentials: "include", 
    });
    return {
      data: await response.json(),
      status: response.status,
      ok: response.ok,
      isError: false,
    };
  } catch (error) {
    return {
      status: null,
      isError: true,
      error,
      ok: false,
    };
  }
}

export default async function NavbarLayout({ children }) {
  const isUser = await EnsureUser();
  if (isUser.ok == false) {
    redirect("sign-in", "replace");
  }

  return <Navbar>{children}</Navbar>;
}
