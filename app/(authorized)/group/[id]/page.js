"use client";
import { Button } from "@/components/elements/button";
import { groups } from "@/components/pages/group/dummy_group";
import { GroupPageAdd } from "@/components/pages/group/GroupPageAdd";
import { GroupPageCalendar } from "@/components/pages/group/GroupPageCalendar";
import { GroupPageDetails } from "@/components/pages/group/GroupPageDetails";
import Link from "next/link";
import { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";

const getGroup = (id) => {
  return groups.find((group) => group.id === id);
};

export default function GroupPage({ params }) {
  const { id } = params;
  const group = getGroup(id);
  const [page, setPage] = useState("calendar");
  return (
    <main className="flex w-full max-md:flex-col">
      {/* Column 1: Page Content */}
      <div className="flex grow flex-col">
        {/* Back Button */}
        <div className="relative z-30 flex justify-between px-10 py-6 shadow-md">
          {page === "calendar" ? (
            <>
              <Link href="/group" className="flex items-center text-blue-200">
                <span className="text-[50px]">
                  <BiChevronLeft />
                </span>
                <span className="text-2xl">Back</span>
              </Link>
              <Button onClick={() => setPage("add")}>Add Schedule</Button>
            </>
          ) : (
            <>
              <button
                className="flex items-center text-blue-200"
                onClick={() => setPage("calendar")}
              >
                <span className="text-[50px]">
                  <BiChevronLeft />
                </span>
                <span className="text-2xl">Back</span>
              </button>
            </>
          )}
        </div>
        {/* Content */}
        {page === "calendar" && (
          <GroupPageCalendar group={group} setPage={setPage} />
        )}
        {page === "details" && (
          <GroupPageDetails group={group} setPage={setPage} />
        )}
        {page === "add" && <GroupPageAdd group={group} setPage={setPage} />}
      </div>
      {/* Column 2: Calendar and Events */}
      <div className="border-blue-200 max-md:w-full max-md:border-t-[1px] md:w-[25%] md:border-l-[1px]"></div>
    </main>
  );
}
