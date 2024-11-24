"use client";
import { Button } from "@/components/elements/button";
import { CalendarDayPicker } from "@/components/elements/calendar";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/elements/popover";
import { Select } from "@/components/elements/select";
import { format } from "date-fns";
import { useState } from "react";
import {
  BsCalendar2Date,
  BsClock,
  BsPeopleFill,
  BsStopwatch,
} from "react-icons/bs";

export function GroupPageAdd({ group }) {
  const [selectedDate, setSelectedDate] = useState();
  return (
    <div className="scroll-container h-0 grow overflow-auto max-md:h-fit md:p-10">
      <form className="flex flex-col gap-8 px-16 py-9 shadow-md">
        <input
          placeholder="TITLE"
          className="text-3xl font-semibold text-blue-200 outline-0 placeholder:text-blue-200/70"
        />
        <div className="-mx-5 h-[5px] bg-blue-200" />
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <BsCalendar2Date className="flex-none text-[30px] text-blue-200" />
            <Popover>
              <PopoverTrigger asChild>
                <div className="w-full cursor-pointer select-none rounded-[10px] px-3 py-2 text-base text-blue-200 outline outline-2 outline-blue-200">
                  {selectedDate
                    ? selectedDate.from === selectedDate.to
                      ? format(selectedDate.from, "d MMMM yyyy")
                      : `${format(selectedDate.from, "d MMMM yyyy")} - ${format(selectedDate.to, "d MMMM yyyy")}`
                    : "Select the date"}
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="flex w-fit flex-col items-center gap-3"
              >
                <CalendarDayPicker
                  mode="range"
                  disabled={{ before: new Date() }}
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                />
                <PopoverClose asChild>
                  <Button>Close</Button>
                </PopoverClose>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-6">
            <BsStopwatch className="flex-none text-[30px] text-blue-200" />
            <Select
              placeholder="Choose the duration of the meeting"
              className="w-0 grow"
              options={Array(48)
                .fill()
                .map((_, idx) => ({
                  value: (idx + 1) / 2,
                  label:
                    idx === 0
                      ? "30 minutes"
                      : idx % 2 == 0
                        ? `${idx / 2} hour${idx > 2 ? "s" : ""} 30 minutes`
                        : `${(idx + 1) / 2} hour${idx > 2 ? "s" : ""}`,
                }))}
            />
          </div>
          <div className="flex items-center gap-6">
            <BsPeopleFill className="flex-none text-[30px] text-blue-200" />
            <Select
              placeholder="Choose members for the meeting"
              className="w-0 grow"
              isMulti
              allowSelectAll
              options={group.members.map((member, idx) => ({
                value: idx,
                label: member.name,
              }))}
            />
          </div>
          <div className="flex gap-6">
            <BsClock className="flex-none text-[30px] text-blue-200" />
            <div className="h-40 w-full select-none rounded-[10px] px-3 py-2 text-base text-blue-200 outline outline-2 outline-blue-200"></div>
          </div>
        </div>
        <Button type="button" className="w-fit self-center">
          Create
        </Button>
      </form>
    </div>
  );
}
