import { getRepeatedSchedules, MinHeap } from "@/components/utils";
import {
  addDays,
  areIntervalsOverlapping,
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfDay,
  endOfWeek,
  format,
  getHours,
  getMinutes,
  isToday,
  startOfDay,
  startOfWeek,
} from "date-fns";
import { Fragment, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import {
  BsArrowClockwise,
  BsCalendarDate,
  BsLock,
  BsPersonFill,
  BsStopwatch,
} from "react-icons/bs";
import { Button } from "../button";

export function Calendar({ schedules, start_date, isGroup, group, onEdit }) {
  const formatNumberWithSign = (number) => {
    const sign = number >= 0 ? "+" : "-";
    return `${sign}${number}`;
  };
  const getDayPos = (day, col = 0, max_col = 1, reverse = false) => {
    const ret = day * (100 / 7) + (col / max_col) * (100 / 7);
    return `${reverse ? 100 - ret : ret}%`;
  };
  const getHourPos = (hour, reverse = false) => {
    const ret = (hour * 100) / 24;
    return `${reverse ? 100 - ret : ret}%`;
  };
  const getStylePos = (schedule) => {
    const { start_time, end_time } = schedule;
    const day = differenceInCalendarDays(start_time, start_date);
    const hourStart = getHours(start_time) + getMinutes(start_time) / 60;
    const hourEnd = getHours(end_time) + getMinutes(end_time) / 60;
    return {
      left: getDayPos(day, schedule.column || 0, schedule.max_column || 1),
      right: getDayPos(
        day,
        (schedule.column || 0) + 1,
        schedule.max_column || 1,
        true,
      ),
      top: getHourPos(hourStart),
      bottom: getHourPos(hourEnd, true),
    };
  };
  const displayedSchedules = useMemo(() => {
    const isWithinCalendar = (schedule) => {
      const { start_time, end_time } = schedule;
      return areIntervalsOverlapping(
        { start: start_time, end: end_time },
        { start: startOfWeek(start_date), end: endOfWeek(start_date) },
      );
    };
    const getScheduleInWeek = (schedules) =>
      getRepeatedSchedules(
        schedules,
        startOfWeek(start_date),
        endOfWeek(start_date),
      );
    const getOverlappingScheduleCol = (schedules) => {
      // Set Column and Max Columns for each schedules
      const overlapping = new MinHeap();
      const available = new MinHeap();
      schedules.sort((a, b) => a.start_time - b.start_time);
      for (let i = 0, indexes = [], mx = 0; i <= schedules.length; i++) {
        if (i < schedules.length && isGroup && schedules[i].is_user_owned)
          continue;
        while (
          !overlapping.empty() &&
          (i === schedules.length ||
            overlapping.top()[0] <= schedules[i].start_time)
        ) {
          available.push(overlapping.top()[1]);
          overlapping.pop();
        }
        if (overlapping.empty()) {
          indexes.forEach((index) => {
            schedules[index] = { ...schedules[index], max_column: mx };
          });
          indexes = [];
          available.heap = [];
          mx = 0;
        }
        if (i === schedules.length) break;
        indexes.push(i);
        if (available.empty()) available.push(mx++);
        schedules[i] = { ...schedules[i], column: available.top() };
        overlapping.push([schedules[i].end_time, available.pop()]);
      }
      return schedules;
    };
    const splitByDay = (schedules) => {
      // Split Schedules that doesn't start and end at the same day to daily schedule object
      return schedules.flatMap((schedule) => {
        const day_schedules = eachDayOfInterval({
          start: schedule.start_time,
          end: schedule.end_time,
        }).map((day) => ({
          ...schedule,
          actual_start_time: schedule.start_time,
          actual_end_time: schedule.end_time,
          start_time: startOfDay(day),
          end_time: endOfDay(day),
        }));
        day_schedules[0].start_time = schedule.start_time;
        day_schedules[0].actual_start = true;
        day_schedules[day_schedules.length - 1].end_time = schedule.end_time;
        day_schedules[day_schedules.length - 1].actual_end = true;
        return day_schedules.filter(isWithinCalendar);
      });
    };
    return splitByDay(getOverlappingScheduleCol(getScheduleInWeek(schedules)));
  }, [isGroup, schedules, start_date]);
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="grid grid-cols-8 bg-blue-100 py-4 pl-3 text-base font-semibold text-blue-200 shadow-md md:pr-[10px]">
        <div className="flex items-center justify-center">
          GMT {formatNumberWithSign(-new Date().getTimezoneOffset() / 60)}
        </div>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const item_date = addDays(start_date, i);
          return (
            <div
              key={i}
              className="flex flex-wrap items-center justify-center gap-[2px]"
            >
              <span>{format(item_date, "EEE")}</span>
              <span
                className={twMerge(
                  "rounded-[4px] px-[4px] py-[2px]",
                  isToday(item_date) ? "ml-1 bg-purple-100 text-white" : "",
                )}
              >
                {format(item_date, "dd")}
              </span>
            </div>
          );
        })}
      </div>
      {/* Calendar Content */}
      <div className="scroll-container grid h-0 grow grid-cols-8 overflow-auto pl-3 max-md:min-h-[calc(24*40px)]">
        <div className="relative col-span-7 col-start-2 h-full md:min-h-[calc(24*40px)]">
          {/* Vertical bars */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="absolute inset-y-0 w-[1px] translate-x-[-50%] bg-gray-200/20"
              style={{ left: getDayPos(i) }}
            />
          ))}
          {/* Horizontal bars & timestamps */}
          {Array(23)
            .fill()
            .map((_, i) => (
              <Fragment key={i}>
                <div
                  className="absolute inset-x-0 h-[1px] translate-y-[-50%] bg-gray-200/20"
                  style={{ top: getHourPos(i + 1) }}
                />
                <div
                  className="absolute right-[calc(100%+min(10px,1vw))] translate-y-[-50%] text-base font-semibold text-blue-200"
                  style={{ top: getHourPos(i + 1) }}
                >
                  {format(new Date(0, 0, 0, i + 1, 0), "HH:mm")}
                </div>
              </Fragment>
            ))}
          {/* Schedules */}
          {displayedSchedules.map((schedule, idx) => (
            <Popover key={idx}>
              <PopoverTrigger asChild>
                <button
                  className={twMerge(
                    "absolute flex flex-col overflow-hidden p-2 font-semibold",
                    isGroup &&
                      (schedule.is_user_owned
                        ? "bg-orange-100/60 hover:bg-orange-100/80"
                        : "z-20 bg-green-100/50 hover:bg-green-100/80"),
                    !isGroup &&
                      (schedule.is_private
                        ? "bg-orange-100 hover:bg-orange-100/90"
                        : "bg-green-50 hover:bg-green-50/90"),
                    (!isGroup || !schedule.is_user_owned) &&
                      "outline outline-1 -outline-offset-1 outline-blue-200",
                    schedule.actual_start && "rounded-t-[10px]",
                    schedule.actual_end && "rounded-b-[10px]",
                  )}
                  style={getStylePos(schedule)}
                >
                  {(!isGroup || !schedule.is_user_owned) && (
                    <>
                      <span className="flex-none truncate text-base">
                        {schedule.title}
                      </span>
                      <span className="truncate text-wrap text-xs">
                        {format(
                          schedule.actual_start_time,
                          schedule.actual_start && schedule.actual_end
                            ? "HH:mm"
                            : "MMM d, HH:mm",
                        )}
                        &nbsp;-&nbsp;
                        {format(
                          schedule.actual_end_time,
                          schedule.actual_start && schedule.actual_end
                            ? "HH:mm"
                            : "MMM d, HH:mm",
                        )}
                      </span>
                    </>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                align="start"
                className={twMerge(
                  "flex flex-col gap-2 outline-1",
                  isGroup &&
                    (schedule.is_user_owned
                      ? "bg-orange-100"
                      : "z-20 bg-green-50"),
                  !isGroup &&
                    (schedule.is_private ? "bg-orange-100" : "bg-green-50"),
                )}
              >
                <div className="font-semibold">
                  {isGroup && schedule.is_user_owned && schedule.is_private
                    ? "Private schedule"
                    : schedule.title}
                </div>
                <div className="h-[1px] w-full bg-foreground" />
                <div className="flex items-center gap-2 text-xs font-medium">
                  <BsCalendarDate className="flex-none text-xl" />
                  <span>
                    {format(schedule.actual_start_time, "EEEE, d MMMM yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium">
                  <BsStopwatch className="flex-none text-xl" />
                  <span>
                    {`${format(schedule.actual_start_time, "HH:mm")} - ${format(schedule.actual_end_time, "HH:mm")}`}
                  </span>
                </div>
                {!isGroup && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <BsArrowClockwise className="flex-none text-xl" />
                      <span>
                        {!schedule.repeat || schedule.repeat === "NONE"
                          ? "Does not repeat"
                          : `Repeats ${schedule.repeat.toLowerCase()}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <BsLock className="flex-none text-xl" />
                      <span>{schedule.is_private ? "Private" : "Public"}</span>
                    </div>
                  </>
                )}
                {isGroup && schedule.is_user_owned && (
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <BsPersonFill className="flex-none text-xl" />
                    <span>
                      {group?.members?.find(
                        (member) => member.id_user === schedule.id_creator,
                      )?.name ?? ""}
                    </span>
                  </div>
                )}
                <div className="flex gap-2 self-end">
                  {!isGroup && (
                    <Button
                      variant="black"
                      size="sm"
                      className="w-fit text-xs"
                      onClick={() => onEdit(schedule)}
                    >
                      Edit
                    </Button>
                  )}
                  {(!isGroup || !schedule.is_user_owned) && (
                    <Button variant="black" size="sm" className="w-fit text-xs">
                      Delete
                    </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </div>
    </div>
  );
}
