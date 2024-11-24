"use client";
import { Button } from "@/components/elements/button";
import { CalendarSidebar } from "@/components/layout/CalendarSidebar";
import {
  GroupPageAdd,
  GroupPageCalendar,
  GroupPageDetails,
} from "@/components/pages/group";
import { groups, schedules } from "@/components/pages/group/dummy_group";
import { endOfWeek, startOfWeek } from "date-fns";
import Link from "next/link";
import { useState, use } from "react";
import { BiChevronLeft } from "react-icons/bi";

const getGroup = (id) => {
  return groups.find((group) => group.id === id);
};

export default function GroupPage({ params }) {
  const { id } = use(params);
  const group = getGroup(id);
  const [page, setPage] = useState("calendar");
  const [selectedWeek, setSelectedWeek] = useState({
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date()),
  });
  return (
    <CalendarSidebar
      selectedWeek={selectedWeek}
      setSelectedWeek={setSelectedWeek}
      schedules={schedules.filter((schedule) => !schedule.is_user_owned)}
      className={page !== "calendar" ? "max-md:hidden" : ""}
    >
      {/* Back Button */}
      <div className="relative z-30 flex items-center justify-between px-10 py-6 shadow-md">
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
              className="flex items-center text-blue-200 outline-0"
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
        <GroupPageCalendar
          group={group}
          setPage={setPage}
          schedules={schedules}
          start_date={selectedWeek.from}
        />
      )}
      {page === "details" && (
        <GroupPageDetails group={group} setPage={setPage} />
      )}
      {page === "add" && <GroupPageAdd group={group} schedules={schedules} />}
    </CalendarSidebar>
  );
}
