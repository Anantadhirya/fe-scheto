"use client";
import { Button } from "@/components/elements/button";
import { CalendarDayPicker } from "@/components/elements/calendar";
import { Timeline } from "@/components/elements/timeline";
import { groups, schedules } from "@/components/pages/group/dummy_group";
import { GroupPageAdd } from "@/components/pages/group/GroupPageAdd";
import { GroupPageCalendar } from "@/components/pages/group/GroupPageCalendar";
import { GroupPageDetails } from "@/components/pages/group/GroupPageDetails";
import { getUpcomingSchedules } from "@/components/utils/getUpcomingSchedules";
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
    <main className="flex w-full max-md:flex-col">
      {/* Column 1: Page Content */}
      <div className="flex flex-none flex-col max-md:w-full md:w-[75%]">
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
        {page === "add" && <GroupPageAdd group={group} setPage={setPage} />}
      </div>
      {/* Column 2: Calendar and Events */}
      <div className="flex h-full flex-none flex-col items-center gap-10 overflow-hidden border-blue-200 p-5 pt-20 max-md:w-full max-md:border-t-[1px] md:w-[25%] md:border-l-[1px]">
        <CalendarDayPicker
          mode="week"
          selected={selectedWeek}
          onSelect={setSelectedWeek}
          className="w-full max-md:mx-5 max-md:max-w-[350px] md:min-w-[180px] md:max-w-[300px]"
        />
        <div className="scroll-container relative flex h-0 w-full grow flex-col overflow-auto overflow-x-hidden max-md:min-h-fit max-md:max-w-[400px] md:max-w-[350px]">
          <div className="sticky top-0 z-20 w-full bg-gradient-to-b from-white from-70% to-white/0 pb-4 text-2xl font-extrabold text-blue-200">
            Upcoming Events
          </div>
          <Timeline schedules={getUpcomingSchedules(schedules, 10)} />
          <div className="sticky bottom-0 min-h-3 bg-gradient-to-t from-white to-white/0"></div>
        </div>
      </div>
    </main>
  );
}
