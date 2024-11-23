"use client";
import { Button } from "@/components/elements/button";
import { CalendarSidebar } from "@/components/layout/CalendarSidebar";
import { HomePageCalendar } from "@/components/pages/home";
import { schedules } from "@/components/pages/home/dummy_home";
import { addWeeks, endOfWeek, format, startOfWeek } from "date-fns";
import { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

export default function Home() {
  const [page, setPage] = useState("calendar");
  const [selectedWeek, setSelectedWeek] = useState({
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date()),
  });
  return (
    <CalendarSidebar
      selectedWeek={selectedWeek}
      setSelectedWeek={setSelectedWeek}
      schedules={schedules}
      className={page !== "calendar" ? "max-md:hidden" : ""}
    >
      {/* Top Menu */}
      <div className="relative z-30 flex h-28 flex-none items-center justify-between px-10 py-6 shadow-md">
        {page === "add" ? (
          // Add Menu
          <button
            className="flex items-center text-blue-200 outline-0"
            onClick={() => setPage("calendar")}
          >
            <span className="text-[50px]">
              <BiChevronLeft />
            </span>
            <span className="text-2xl">Back</span>
          </button>
        ) : (
          <>
            {/* Left Top Menu */}
            <div className="flex items-center gap-5 self-end text-2xl font-semibold text-blue-200">
              {page === "calendar" ? (
                // Calendar
                <>
                  <div className="w-[180px]">
                    {format(selectedWeek.from, "MMMM yyyy")}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() =>
                        setSelectedWeek({
                          from: startOfWeek(addWeeks(selectedWeek.from, -1)),
                          to: endOfWeek(addWeeks(selectedWeek.to, -1)),
                        })
                      }
                    >
                      <BsCaretLeftFill />
                    </button>
                    <button
                      className="rounded-full bg-blue-200 px-3 py-0.5 text-sm text-white"
                      onClick={() =>
                        setSelectedWeek({
                          from: startOfWeek(new Date()),
                          to: endOfWeek(new Date()),
                        })
                      }
                    >
                      Today
                    </button>
                    <button
                      onClick={() =>
                        setSelectedWeek({
                          from: startOfWeek(addWeeks(selectedWeek.from, 1)),
                          to: endOfWeek(addWeeks(selectedWeek.to, 1)),
                        })
                      }
                    >
                      <BsCaretRightFill />
                    </button>
                  </div>
                </>
              ) : (
                // List
                <>Upcoming Events</>
              )}
            </div>
            {/* Right Top Menu */}
            <div className="flex flex-col gap-3 self-start">
              <div className="flex rounded-full bg-purple-200/80 text-base text-white">
                <button
                  className={twMerge(
                    "rounded-full px-12 py-0.5 text-center",
                    page === "calendar" && "bg-blue-200",
                  )}
                  onClick={() => setPage("calendar")}
                >
                  Calendar
                </button>
                <button
                  className={twMerge(
                    "rounded-full px-14 py-0.5 text-center",
                    page === "list" && "bg-blue-200",
                  )}
                  onClick={() => setPage("list")}
                >
                  List
                </button>
              </div>
              <Button
                className="h-fit w-fit self-end py-1"
                onClick={() => setPage("add")}
              >
                Add Schedule
              </Button>
            </div>
          </>
        )}
      </div>
      {/* Content */}
      {page === "calendar" && (
        <HomePageCalendar
          schedules={schedules}
          start_date={selectedWeek.from}
        />
      )}
    </CalendarSidebar>
  );
}
