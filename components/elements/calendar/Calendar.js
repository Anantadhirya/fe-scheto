import { MinHeap } from "@/components/utils";
import {
  addDays,
  addMilliseconds,
  areIntervalsOverlapping,
  differenceInCalendarDays,
  differenceInMilliseconds,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  endOfDay,
  endOfWeek,
  format,
  getDate,
  getDay,
  getHours,
  getMinutes,
  getSeconds,
  isToday,
  isWithinInterval,
  max,
  min,
  set,
  setDay,
  startOfDay,
  startOfWeek,
} from "date-fns";
import { Fragment, useMemo } from "react";
import { twMerge } from "tailwind-merge";

export function Calendar({ schedules, start_date, group }) {
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
    const getScheduleInWeek = (schedules) => {
      // Filter Schedules for Each Week and Handle Repeating Schedules
      const schedulesNoRepeat = schedules
        .filter((schedule) => !schedule.repeat || schedule.repeat === "NONE")
        .filter(isWithinCalendar);
      const schedulesRepeat = schedules
        .filter((schedule) => schedule.repeat && schedule.repeat !== "NONE")
        .flatMap((schedule) => {
          const repeat_interval = {
            start: max([startOfWeek(start_date), schedule.start_time]),
            end: schedule.repeat_until
              ? min([endOfWeek(start_date), schedule.repeat_until])
              : endOfWeek(start_date),
          };
          const duration = differenceInMilliseconds(
            schedule.end_time,
            schedule.start_time,
          );
          const repeatedSchedules = (
            schedule.repeat === "MONTHLY"
              ? eachMonthOfInterval(repeat_interval).map((month) =>
                  set(month, {
                    date: getDate(schedule.start_time),
                    hours: getHours(schedule.start_time),
                    minutes: getMinutes(schedule.start_time),
                    seconds: getSeconds(schedule.start_time),
                  }),
                )
              : schedule.repeat === "WEEKLY"
                ? eachWeekOfInterval(repeat_interval).map((week) =>
                    setDay(
                      set(week, {
                        hours: getHours(schedule.start_time),
                        minutes: getMinutes(schedule.start_time),
                        seconds: getSeconds(schedule.start_time),
                      }),
                      getDay(schedule.start_time),
                    ),
                  )
                : schedule.repeat === "DAILY"
                  ? eachDayOfInterval(repeat_interval).map((day) =>
                      set(day, {
                        hours: getHours(schedule.start_time),
                        minutes: getMinutes(schedule.start_time),
                        seconds: getSeconds(schedule.start_time),
                      }),
                    )
                  : []
          ).map((start_time) => ({
            ...schedule,
            start_time,
            end_time: addMilliseconds(start_time, duration),
          }));
          return repeatedSchedules
            .filter(isWithinCalendar)
            .filter(
              (schedule) =>
                isWithinInterval(schedule.start_time, repeat_interval) &&
                isWithinInterval(schedule.end_time, repeat_interval),
            );
        });
      return [...schedulesNoRepeat, ...schedulesRepeat];
    };
    const getOverlappingScheduleCol = (schedules) => {
      // Set Column and Max Columns for each schedules
      const overlapping = new MinHeap();
      const available = new MinHeap();
      schedules.sort((a, b) => a.start_time - b.start_time);
      for (let i = 0, indexes = [], mx = 0; i <= schedules.length; i++) {
        if (i < schedules.length && group && schedules[i].is_user_owned)
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
  }, [group, schedules, start_date]);
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
            <div
              key={idx}
              className={twMerge(
                "absolute flex flex-col overflow-hidden p-2 font-semibold",
                group &&
                  (schedule.is_user_owned
                    ? "bg-orange-100/60"
                    : "z-20 bg-green-100/50"),
                !group &&
                  (schedule.is_private ? "bg-orange-100" : "bg-green-50"),
                (!group || !schedule.is_user_owned) &&
                  "outline outline-1 -outline-offset-1 outline-blue-200",
                schedule.actual_start && "rounded-t-[10px]",
                schedule.actual_end && "rounded-b-[10px]",
              )}
              style={getStylePos(schedule)}
            >
              {(!group || !schedule.is_user_owned) && (
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
