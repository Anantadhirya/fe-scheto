"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/elements/button";
import { CalendarSidebar } from "@/components/layout/CalendarSidebar";
import {
  HomePageAdd,
  HomePageCalendar,
  HomePageList,
} from "@/components/pages/home";
import { addWeeks, endOfWeek, format, startOfWeek, getMonth } from "date-fns";
import { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";

import {
  GetScheduleMonth,
  AddSchedule,
  DeleteSchedule,
  EditSchedule,
} from "@/components/query/kalenderPribadi";
import { ReformatData } from "@/lib/apiUtils";
import { onError } from "@/components/query/errorHandler";

export default function Home() {
  const [page, setPage] = useState("calendar");
  const [selectedWeek, setSelectedWeek] = useState({
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date()),
  });
  const [selectedMonth, SetSelectedMonth] = useState(
    getMonth(selectedWeek.from) || getMonth(new Date()),
  );

  useEffect(() => {
    SetSelectedMonth(getMonth(selectedWeek.from));
  }, [selectedWeek]);

  const GetAllScheduleWithinTheMonth = useQuery({
    queryKey: [selectedMonth],
    queryFn: (props) => {
      return GetScheduleMonth({
        ...props,
        callback: (data) => {
          ReformatData(data.schedules);
          return data.schedules;
        },
      });
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const GetScheduleData = () => {
    if (GetAllScheduleWithinTheMonth.isLoading) {
      return [];
    } else if (GetAllScheduleWithinTheMonth.isError) {
      return [];
    } else {
      return GetAllScheduleWithinTheMonth.data;
    }
  };

  const AddScheduleQuery = useMutation({
    mutationFn: (props) => {
      toast.loading("Processing schedule");
      return AddSchedule({
        props,
        callback: (data) => {
          toast.dismiss();
          toast.success(data.message);
          return data.schedule;
        },
      });
    },
    retry: 2,
    onError: (error) => {
      toast.dismiss();
      onError(error);
    },
    onSuccess: (data) => {
      GetAllScheduleWithinTheMonth.refetch();
    },
  });

  const DeleteScheduleQuery = useMutation({
    mutationFn: (props) => {
      toast.loading("Deleting schedule");
      return DeleteSchedule({
        props,
        callback: (data) => {
          toast.dismiss();
          toast.success(data.message);
          return data;
        },
      });
    },
    retry: 2,
    onError: (error) => {
      toast.dismiss();
      onError(error, "schedule");
    },
    onSuccess: (data) => {
      GetAllScheduleWithinTheMonth.refetch();
    },
  });

  const EditScheduleQuery = useMutation({
    mutationFn: (props) => {
      toast.loading("Editting schedule");
      return EditSchedule({
        props,
        callback: (data) => {
          toast.dismiss();
          toast.success(data.message);
          return data;
        },
      });
    },
    retry: 2,
    onError: (error) => {
      onError(error, "schedule");
    },
    onSuccess: (data) => {
      GetAllScheduleWithinTheMonth.refetch();
    },
  });

  const handleDelete = (schedule, type) => {
    if (type === "all") {
      DeleteScheduleQuery.mutate({
        _id: schedule._id,
        is_repeat_until: false,
      });
    } else if (type === "following") {
      DeleteScheduleQuery.mutate({
        _id: schedule._id,
        is_repeat_until: true,
        repeat_until: schedule.actual_start_time,
      });
    }
  };

  const [editingSchedule, setEditingSchedule] = useState();
  return (
    <CalendarSidebar
      selectedWeek={selectedWeek}
      setSelectedWeek={setSelectedWeek}
      schedules={GetScheduleData()}
      className={page !== "calendar" ? "max-md:hidden" : ""}
    >
      {/* Top Menu */}
      <div className="relative z-30 flex flex-none justify-between py-6 shadow-md max-lg:h-fit max-lg:flex-col-reverse max-lg:gap-2 max-md:px-[min(40px,7vw-16.4px)] md:px-10 lg:h-28 lg:items-center">
        {page === "add" || page === "edit" ? (
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
            <div className="flex items-center gap-5 text-2xl font-semibold text-blue-200 md:self-start lg:self-end">
              {page === "calendar" ? (
                // Calendar
                <>
                  <div className="w-[180px] text-nowrap">
                    {format(selectedWeek.from, "MMMM yyyy")}
                  </div>
                  <div className="flex gap-1">
                    <button
                      className="outline-0"
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
                      className="rounded-full bg-blue-200 px-3 py-0.5 text-sm text-white outline-0"
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
                      className="outline-0"
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
            <div className="flex flex-col gap-3 max-lg:self-end lg:self-start">
              <div className="flex rounded-full bg-purple-200/80 text-base text-white">
                <button
                  className={twMerge(
                    "rounded-full px-12 py-0.5 text-center outline-0",
                    page === "calendar" && "bg-blue-200",
                  )}
                  onClick={() => setPage("calendar")}
                >
                  Calendar
                </button>
                <button
                  className={twMerge(
                    "rounded-full px-14 py-0.5 text-center outline-0",
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
          schedules={GetScheduleData()}
          start_date={selectedWeek.from}
          onEdit={(schedule) => {
            setPage("edit");
            setEditingSchedule(schedule);
          }}
          onDelete={handleDelete}
        />
      )}
      {page === "list" && <HomePageList schedules={GetScheduleData()} />}
      {page === "add" && (
        <HomePageAdd
          type="add"
          AddSchedule={AddScheduleQuery}
          setPage={setPage}
        />
      )}
      {page === "edit" && (
        <HomePageAdd
          type="edit"
          editingSchedule={editingSchedule}
          EditSchedule={EditScheduleQuery}
          setPage={setPage}
        />
      )}
    </CalendarSidebar>
  );
}
