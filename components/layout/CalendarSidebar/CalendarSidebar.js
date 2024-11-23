"use client";
import { CalendarDayPicker } from "@/components/elements/calendar";
import { Timeline } from "@/components/elements/timeline";
import { getUpcomingSchedules } from "@/components/utils/getUpcomingSchedules";
import { twMerge } from "tailwind-merge";

export function CalendarSidebar({
  children,
  selectedWeek,
  setSelectedWeek,
  schedules,
  className = "",
}) {
  return (
    <main className="flex w-full max-md:flex-col">
      {/* Column 1: Page Content */}
      <div className="flex flex-none flex-col max-md:w-full md:w-[75%]">
        {children}
      </div>
      {/* Column 2: Calendar and Events */}
      <div
        className={twMerge(
          "flex h-full flex-none flex-col items-center gap-10 overflow-hidden border-blue-200 p-5 pt-20",
          "max-md:w-full max-md:border-t-[1px]",
          "md:w-[25%] md:border-l-[1px]",
          className,
        )}
      >
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
