"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  BsPersonFill,
  BsFillPeopleFill,
  BsFillEnvelopeOpenFill,
} from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { useOnClickOutside } from "@/components/hooks";
import { twMerge } from "tailwind-merge";

import axios from "axios";
import { onError } from "@/components/query/errorHandler";
import { apiLogout } from "@/lib/apiRoutes";
import toast from "react-hot-toast";

export function Navbar({ children }) {
  const routes = [
    {
      name: "Scheto",
      href: "",
      icon: (
        <div className="relative aspect-[1/1] w-[5vw]">
          <Image src="/icon.svg" alt="" fill />
        </div>
      ),
    },
    { name: "Profile", href: "/profile", icon: <BsPersonFill /> },
    { name: "Home", href: "/", icon: <IoMdHome /> },
    { name: "Group", href: "/group", icon: <BsFillPeopleFill /> },
    { name: "Inbox", href: "/inbox", icon: <BsFillEnvelopeOpenFill /> },
  ];
  const pathname = usePathname();
  const [hide, setHide] = useState(true);
  const navbarRef = useRef();
  useOnClickOutside(navbarRef, () => setHide(true));

  const router = useRouter();

  async function Logout() {
    try {
      const response = await axios.patch(
        apiLogout,
        {},
        {
          withCredentials: true,
        },
      );
      toast.success(response.data?.message || "Process successful");
      router.push("/sign-in");
    } catch (error) {
      onError(error);
      if (error.status == 401) {
        router.push("/sign-in");
      }
    }
  }
  return (
    <div className="flex max-md:flex-col">
      <div className="flex w-full items-center gap-[2%] bg-blue-100 px-4 py-3 text-blue-200 md:hidden">
        <button onClick={() => setHide(!hide)} className="text-lg">
          <RxHamburgerMenu />
        </button>
        <div className="text-lg font-bold text-blue-300">Scheto</div>
      </div>
      <nav
        ref={navbarRef}
        className={twMerge(
          "z-[9999] flex min-h-screen min-w-[50px] shrink-0 flex-col items-end gap-[2vh] bg-blue-100 pb-[7vh] pt-[10px] transition-transform duration-300 max-md:fixed max-md:w-[60%] md:w-[8%] md:pt-[max(5px,2vh)] md:shadow-xl",
          hide ? "max-md:translate-x-[-100%]" : "max-md:translate-x-0",
        )}
      >
        <button
          onClick={() => setHide(!hide)}
          className="mb-4 h-6 self-start px-5 text-lg text-blue-200 md:hidden"
        >
          <RxHamburgerMenu />
        </button>
        {routes.map((route, idx) => {
          const active =
            idx !== 0 &&
            (route.href === "/"
              ? pathname === route.href
              : pathname.startsWith(route.href));
          return (
            <Link
              key={route.name}
              href={route.href}
              className={twMerge(
                "flex items-center justify-center gap-2 rounded-l-full py-[max(5px,1vh)] text-lg outline-0 max-md:w-[95%] md:w-[87%] md:text-[3vw]",
                idx === 0 ? "pt-0 max-md:hidden" : "",
                active ? "bg-blue-200 text-white" : "text-blue-200",
              )}
              onClick={() => setHide(true)}
            >
              {route.icon}
              <div className="text-sm md:hidden">{route.name}</div>
            </Link>
          );
        })}
        <div className="h-[5vh] grow" />
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 self-center text-blue-200 outline-0 md:w-[5vw] md:rounded-full"
          onClick={(e) => Logout()}
        >
          <div className="flex aspect-[1/1] w-8 items-center justify-center rounded-full bg-white pr-1 text-xl shadow-xl md:w-full md:pr-[5%] md:text-[2.7vw]">
            <BiLogOut />
          </div>
          <div className="text-sm md:hidden">Logout</div>
        </button>
      </nav>
      {children}
    </div>
  );
}
