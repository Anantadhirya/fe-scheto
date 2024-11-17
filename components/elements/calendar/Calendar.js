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
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

export function Calendar({ schedules, start_date }) {
  const formatNumberWithSign = (number) => {
    const sign = number >= 0 ? "+" : "-";
    return `${sign}${number}`;
  };
  const getDayPos = (day, reverse = false) => {
    const ret = (day * 100) / 7;
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
      left: getDayPos(day),
      right: getDayPos(day + 1, true),
      top: getHourPos(hourStart),
      bottom: getHourPos(hourEnd, true),
    };
  };
  const isWithinCalendar = (schedule) => {
    const { start_time, end_time } = schedule;
    return areIntervalsOverlapping(
      { start: start_time, end: end_time },
      { start: startOfWeek(start_date), end: endOfWeek(start_date) },
    );
  };
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
          {schedules.filter(isWithinCalendar).map((schedule, idx) => {
            const day_schedules = eachDayOfInterval({
              start: schedule.start_time,
              end: schedule.end_time,
            }).map((day) => ({
              start_time: startOfDay(day),
              end_time: endOfDay(day),
            }));
            day_schedules[0].start_time = schedule.start_time;
            day_schedules[0].actual_start = true;
            day_schedules[day_schedules.length - 1].end_time =
              schedule.end_time;
            day_schedules[day_schedules.length - 1].actual_end = true;
            return day_schedules
              .filter(isWithinCalendar)
              .map((day_schedule, idx) => (
                <div
                  key={idx}
                  className={twMerge(
                    "absolute flex flex-col overflow-hidden p-2 font-semibold",
                    schedule.is_user_owned
                      ? "bg-orange-100/60"
                      : "bg-green-100/50 outline outline-1 -outline-offset-1 outline-blue-200",
                    day_schedule.actual_start && "rounded-t-[10px]",
                    day_schedule.actual_end && "rounded-b-[10px]",
                  )}
                  style={getStylePos(day_schedule)}
                >
                  {!schedule.is_user_owned && (
                    <>
                      <span className="flex-none truncate text-base">
                        {schedule.title}
                      </span>
                      <span className="truncate text-wrap text-xs">
                        {format(
                          schedule.start_time,
                          day_schedules.length > 1 ? "MMM d, HH:mm" : "HH:mm",
                        )}
                        &nbsp;-&nbsp;
                        {format(
                          schedule.end_time,
                          day_schedules.length > 1 ? "MMM d, HH:mm" : "HH:mm",
                        )}
                      </span>
                    </>
                  )}
                </div>
              ));
          })}
        </div>
      </div>
    </div>
  );
}
