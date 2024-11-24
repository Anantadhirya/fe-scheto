import { differenceInCalendarDays, format } from "date-fns";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

export function Timeline({ schedules, className = "" }) {
  const active = (schedule) =>
    differenceInCalendarDays(schedule.start_time, new Date()) <= 1;
  return (
    <div
      className={twMerge(
        "grid grow grid-cols-[20px_1fr_70px] items-center gap-x-2 pr-2",
        className,
      )}
    >
      {schedules.length === 0 && (
        <div className="col-span-3 self-start text-blue-200">
          No upcoming events
        </div>
      )}
      {schedules.map((schedule, idx) => (
        <Fragment key={idx}>
          {/* Timeline: Circle */}
          <div className="relative flex h-full flex-col items-center justify-center">
            {idx !== 0 && (
              <div
                className={twMerge(
                  "absolute bottom-1/2 top-0 w-[2px]",
                  active(schedules[idx - 1]) ? "bg-orange-100" : "bg-gray-50",
                )}
              />
            )}
            <div
              className={twMerge(
                "z-10 aspect-square w-full rounded-full",
                active(schedule) ? "bg-orange-100" : "bg-gray-50",
              )}
            />
            {idx !== schedules.length - 1 && (
              <div
                className={twMerge(
                  "absolute bottom-0 top-1/2 w-[2px]",
                  active(schedule) ? "bg-orange-100" : "bg-gray-50",
                )}
              />
            )}
          </div>
          {/* Schedule Title */}
          <div className="py-1 text-lg font-semibold text-blue-200">
            {schedule.title}
          </div>
          {/* Schedule Date */}
          <div
            className={twMerge(
              "rounded-full px-1 py-[2px] text-center text-white shadow-md",
              active(schedule) ? "bg-blue-200" : "bg-blue-200/70",
            )}
          >
            {format(schedule.start_time, "dd MMM")}
          </div>
          {/* Timeline: Vertical Line */}
          <div className="relative flex h-full flex-col items-center justify-center">
            {idx !== schedules.length - 1 && (
              <div
                className={twMerge(
                  "absolute inset-y-0 h-full w-[2px]",
                  active(schedule) ? "bg-orange-100" : "bg-gray-50",
                )}
              />
            )}
          </div>
          {/* Schedule Group */}
          <div className="pb-3 text-base font-medium text-blue-200/70">
            Group
          </div>
          {/* Schedule Time */}
          <div className="self-start text-center font-medium text-blue-200">
            {format(schedule.start_time, "hh:mm")}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
