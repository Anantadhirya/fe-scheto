"use client";
import { Button } from "@/components/elements/button";
import { CalendarDayPicker } from "@/components/elements/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/elements/popover";
import { Select } from "@/components/elements/select";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import {
  BsArrowClockwise,
  BsCalendar2Date,
  BsListNested,
  BsLock,
  BsStopwatch,
} from "react-icons/bs";

export function HomePageAdd() {
  const [selectedDate, setSelectedDate] = useState();
  const [dateOpen, setDateOpen] = useState(false);
  const repeat_options = useMemo(
    () => [
      { label: "Does not repeat", value: "NONE" },
      {
        label: selectedDate
          ? `Repeats daily at ${format(selectedDate, "hh:mm")}`
          : "Repeats daily",
        value: "DAILY",
      },
      {
        label: selectedDate
          ? `Repeats weekly on ${format(selectedDate, "EEEE")}`
          : "Repeats weekly",
        value: "WEEKLY",
      },
      {
        label: selectedDate
          ? `Repeats monthly on the ${format(selectedDate, "do")}`
          : "Repeats monthly",
        value: "MONTHLY",
      },
    ],
    [selectedDate],
  );
  const [selectedRepeat, setSelectedRepeat] = useState(0);
  const [selectedPrivate, setSelectedPrivate] = useState(false);
  const [description, setDescription] = useState("");
  const descriptionMaxLength = 250;
  const displayDescLength = description.length >= descriptionMaxLength - 50;
  return (
    <div className="scroll-container h-0 grow overflow-auto p-10 max-md:h-fit">
      <form className="flex flex-col gap-8 px-16 py-9 shadow-md">
        <input
          placeholder="TITLE"
          className="text-3xl font-semibold text-blue-200 outline-0 placeholder:text-blue-200/70"
        />
        <div className="-mx-5 h-[5px] bg-blue-200" />
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <BsCalendar2Date className="text-[30px] text-blue-200" />
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <div className="w-full cursor-pointer select-none rounded-[10px] px-3 py-2 text-base text-blue-200 outline outline-2 outline-blue-200">
                  {selectedDate
                    ? format(selectedDate, "d MMMM yyyy")
                    : "Select the date"}
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="flex w-fit flex-col items-center gap-3"
              >
                <CalendarDayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(selected) => {
                    setSelectedDate(selected);
                    setDateOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-6">
            <BsStopwatch className="text-[30px] text-blue-200" />
            <div className="w-full cursor-pointer select-none rounded-[10px] px-3 py-2 text-base text-blue-200 outline outline-2 outline-blue-200">
              Select time
            </div>
          </div>
          <div className="flex items-center gap-6">
            <BsArrowClockwise className="text-[30px] text-blue-200" />
            <Select
              className="w-0 grow bg-blue-200/25"
              options={repeat_options}
              value={repeat_options[selectedRepeat]}
              onChange={(selected) =>
                setSelectedRepeat(
                  repeat_options.findIndex(
                    (option) => selected.value === option.value,
                  ),
                )
              }
              isSearchable={false}
            />
          </div>
          <div className="flex items-center gap-6">
            <BsLock className="text-[30px] text-blue-200" />
            <button
              onClick={() => setSelectedPrivate(!selectedPrivate)}
              type="button"
              className="w-full cursor-pointer select-none rounded-[10px] bg-blue-200/25 px-3 py-2 text-left text-base text-blue-200 outline outline-2 outline-blue-200"
            >
              {selectedPrivate ? "Private" : "Public"}
            </button>
          </div>
          <div className="flex gap-6">
            <BsListNested className="text-[30px] text-blue-200" />
            <div className="relative w-full">
              <textarea
                className="scroll-container h-40 w-full select-none resize-none rounded-[10px] px-3 py-2 text-base text-blue-200 outline outline-2 outline-blue-200"
                maxLength={descriptionMaxLength}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {displayDescLength && (
                <div className="absolute bottom-3 right-4 text-blue-200">
                  {description.length}/{descriptionMaxLength}
                </div>
              )}
            </div>
          </div>
        </div>
        <Button type="button" className="w-fit self-center">
          Create
        </Button>
      </form>
    </div>
  );
}
