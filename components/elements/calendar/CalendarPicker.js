"use client";

import { DayPicker, rangeIncludesDate } from "react-day-picker";
import { twMerge } from "tailwind-merge";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { endOfWeek, startOfWeek } from "date-fns";
import { useEffect, useState } from "react";

export function CalendarDayPicker({
  className = "",
  classNames = [],
  showOutsideDays = true,
  mode = "single",
  selected,
  onSelect,
  ...props
}) {
  const [month, setMonth] = useState(new Date());
  useEffect(() => setMonth(selected?.from ?? selected), [selected]);
  return (
    <DayPicker
      mode={mode != "week" ? mode : undefined}
      showOutsideDays={showOutsideDays}
      selected={selected}
      onSelect={onSelect}
      month={month}
      onMonthChange={setMonth}
      modifiers={
        mode != "week"
          ? undefined
          : {
              selected: selected,
              range_start: selected?.from,
              range_end: selected?.to,
              range_middle: (date) =>
                selected
                  ? rangeIncludesDate(selected, date, { excludeEnds: true })
                  : false,
            }
      }
      onDayClick={
        mode != "week"
          ? undefined
          : (day) => {
              onSelect({
                from: startOfWeek(day),
                to: endOfWeek(day),
              });
            }
      }
      className={twMerge("w-60 rounded-[20px] bg-blue-100", className)}
      classNames={{
        months: "relative",
        nav: "h-9 px-2 absolute z-10 inset-x-0 flex justify-between items-center",
        chevron: "",
        button_previous:
          "text-base flex justify-center items-center h-full aspect-square text-blue-200 hover:text-blue-200/90 outline-0 disabled:invisible",
        button_next:
          "text-base flex justify-center items-center h-full aspect-square text-blue-200 hover:text-blue-200/90 outline-0 disabled:invisible",
        month: "flex flex-col items-center gap-2 pb-3",
        month_caption:
          "h-9 w-full flex items-center justify-center rounded-[20px] bg-blue-100 shadow-md select-none",
        caption_label: "text-base font-bold text-blue-200",
        month_grid: "w-full border-collapse p-2",
        weekdays: "flex px-2",
        weekday: twMerge(
          "w-full m-[1px] aspect-square text-center text-sm p-0 rounded-[4px] font-normal flex items-center justify-center select-none",
          "first:text-blue-200 last:text-blue-200",
        ),
        week: "flex px-2",
        day: twMerge(
          "w-full m-[1px] aspect-square text-center text-sm p-0 rounded-[4px] select-none",
          "hover:bg-purple-100/90 hover:text-white",
          "first:text-blue-200 last:text-blue-200",
        ),
        day_button: "w-full h-full outline-0 relative",
        outside: "opacity-70 aria-selected:opacity-100",
        selected: "bg-purple-100 !text-white font-semibold",
        disabled: "!opacity-50 pointer-events-none",
        range_start:
          "relative before:block before:absolute before:inset-y-[1.5px] before:inset-x-[-1px] before:bg-purple-100/70 before:left-[2px]",
        range_end:
          "relative before:block before:absolute before:inset-y-[1.5px] before:inset-x-[-1px] before:bg-purple-100/70 before:right-[2px]",
        range_middle:
          "bg-transparent relative before:block before:absolute before:inset-y-[1.5px] before:inset-x-[-1px] before:bg-purple-100/70",
        today:
          "text-purple-100 first:text-purple-100 last:text-purple-100 !font-bold",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...props }) =>
          orientation === "left" ? (
            <BsCaretLeftFill {...props} />
          ) : (
            <BsCaretRightFill {...props} />
          ),
      }}
      {...props}
    />
  );
}
