import { Navbar } from "@/components/elements/navbar";
import { apiVerify } from "@/lib/apiRoutes";

import { redirect} from "next/navigation";

import { cookies, headers } from "next/headers";

async function EnsureUser() {
  try {
    const response = await fetch(apiVerify, {
      credentials: "include",
      method: "GET",
      headers: { Cookie : cookies().toString()}
    });
    //console.log("COOKIES",cookies().toString())
    return {
      data : await response.json(),
      status : response.status,
      ok : response.ok,
      isError : false
    }
  } catch (error) {
    return {
      status : null,
      isError : true,
      error : error,
      ok : false
    }
  }
} 

export default function NavbarLayout({ children }) {
  const isUser = EnsureUser();
  if(!isUser.ok){
    redirect("/sign-in", "replace")
  }
  return <Navbar>{children}</Navbar>;
}
