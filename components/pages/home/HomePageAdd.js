"use client";
import { Button } from "@/components/elements/button";
import { CalendarDayPicker } from "@/components/elements/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/elements/popover";
import { Select, SelectTime } from "@/components/elements/select";
import { format, getHours, getMinutes, isAfter, set } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  BsArrowClockwise,
  BsCalendar2Date,
  BsListNested,
  BsLock,
  BsStopwatch,
} from "react-icons/bs";

export function HomePageAdd({
  type = "add",
  editingSchedule,
  AddSchedule,
  EditSchedule,
  setPage,
}) {
  // Title
  const [title, setTitle] = useState("");

  // Date Selector
  const [selectedDate, setSelectedDate] = useState();
  const [dateOpen, setDateOpen] = useState(false);

  // Time Selector
  const [selectedStart, setSelectedStart] = useState();
  const [selectedEnd, setSelectedEnd] = useState();
  const selectedTime = useMemo(
    () => ({
      from: selectedStart?.value
        ? set(selectedDate ?? new Date(), {
            hours: getHours(selectedStart?.value),
            minutes: getMinutes(selectedStart?.value),
          })
        : undefined,
      to: selectedEnd?.value
        ? set(selectedDate ?? new Date(), {
            hours: getHours(selectedEnd?.value),
            minutes: getMinutes(selectedEnd?.value),
          })
        : undefined,
    }),
    [selectedDate, selectedEnd?.value, selectedStart?.value],
  );
  const endTimeSelector = useRef();
  useEffect(() => {
    if (
      selectedTime.from &&
      selectedTime.to &&
      !isAfter(selectedTime.to, selectedTime.from)
    )
      endTimeSelector.current.clearValue();
  }, [selectedTime]);

  // Repeat Selector
  const getRepeatLabel = (repeat, start_time) => {
    switch (repeat) {
      case "DAILY":
        return start_time
          ? `Repeats daily at ${format(start_time, "HH:mm")}`
          : "Repeats daily";
      case "WEEKLY":
        return start_time
          ? `Repeats weekly on ${format(start_time, "EEEE")}`
          : "Repeats weekly";
      case "MONTHLY":
        return start_time
          ? `Repeats monthly on the ${format(start_time, "do")}`
          : "Repeats monthly";
      default:
        return "Does not repeat";
    }
  };
  const repeat_options = useMemo(
    () => [
      { label: getRepeatLabel("NONE"), value: "NONE" },
      {
        label: getRepeatLabel("DAILY", selectedTime?.from),
        value: "DAILY",
      },
      {
        label: getRepeatLabel("WEEKLY", selectedDate),
        value: "WEEKLY",
      },
      {
        label: getRepeatLabel("MONTHLY", selectedDate),
        value: "MONTHLY",
      },
    ],
    [selectedDate, selectedTime.from],
  );
  const [selectedRepeat, setSelectedRepeat] = useState(0);

  // Privacy Selector
  const [selectedPrivate, setSelectedPrivate] = useState(false);

  // Description
  const [description, setDescription] = useState("");
  const descriptionMaxLength = 250;
  const displayDescLength = description.length >= descriptionMaxLength - 50;

  // Set initial value for editing
  useEffect(() => {
    if (type != "edit") return;
    setTitle(editingSchedule.title);
    setSelectedDate(
      editingSchedule.start_repeat_time ?? editingSchedule.actual_start_time,
    );
    setSelectedStart({
      value: editingSchedule.actual_start_time,
      label: format(editingSchedule.actual_start_time, "HH:mm"),
    });
    setSelectedEnd({
      value: editingSchedule.actual_end_time,
      label: format(editingSchedule.actual_end_time, "HH:mm"),
    });
    setSelectedRepeat(
      editingSchedule.repeat
        ? repeat_options.findIndex(
            (option) => option.value === editingSchedule.repeat,
          )
        : 0,
    );
    setSelectedPrivate(editingSchedule.is_private);
    setDescription(editingSchedule.description || "");
  }, []);

  const handleSubmit = () => {
    if (!title) return toast.error("Please enter a schedule title");
    if (!selectedDate) return toast.error("Please select the date");
    if (!selectedTime?.from) return toast.error("Please select the start time");
    if (!selectedTime?.to) return toast.error("Please select the end time");

    if (type === "edit") {
      EditSchedule.mutate({
        description: description,
        title: title,
        start_date: selectedTime.from,
        end_date: selectedTime.to,
        recurrence: repeat_options[selectedRepeat].value,
        is_private: selectedPrivate,
        _id: editingSchedule._id,
      });
    } else if (type === "add") {
      AddSchedule.mutate({
        description: description,
        title: title,
        startDate: selectedTime.from,
        endDate: selectedTime.to,
        recurrence: repeat_options[selectedRepeat].value,
        is_private: selectedPrivate,
      });
    }
    setPage("calendar");
  };

  return (
    <div className="scroll-container h-0 grow overflow-auto max-md:h-fit md:p-10">
      <form className="flex flex-col gap-8 px-16 py-9 shadow-md">
        <input
          placeholder="TITLE"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl font-semibold text-blue-200 outline-0 placeholder:text-blue-200/70"
        />
        <div className="-mx-5 h-[5px] bg-blue-200" />
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <BsCalendar2Date className="flex-none text-[30px] text-blue-200" />
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <div className="w-full cursor-pointer select-none rounded-[10px] px-3 py-2 text-base text-blue-200 outline outline-2 outline-blue-200">
                  {selectedDate
                    ? format(selectedDate, "EEEE, d MMMM yyyy")
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
            <BsStopwatch className="flex-none text-[30px] text-blue-200" />
            <div className="flex w-full items-center gap-3 max-sm:flex-col">
              <SelectTime
                date={selectedDate}
                placeholder="Start time"
                value={selectedStart}
                onChange={setSelectedStart}
              />
              <div className="h-[3px] w-[5%] bg-blue-200 max-sm:hidden" />
              <SelectTime
                date={selectedDate}
                placeholder="End time"
                minimum={selectedTime.from}
                ref={endTimeSelector}
                value={selectedEnd}
                onChange={setSelectedEnd}
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <BsArrowClockwise className="flex-none text-[30px] text-blue-200" />
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
            <BsLock className="flex-none text-[30px] text-blue-200" />
            <button
              onClick={() => setSelectedPrivate(!selectedPrivate)}
              type="button"
              className="w-full cursor-pointer select-none rounded-[10px] bg-blue-200/25 px-3 py-2 text-left text-base text-blue-200 outline outline-2 outline-blue-200"
            >
              {selectedPrivate ? "Private" : "Public"}
            </button>
          </div>
          <div className="flex gap-6">
            <BsListNested className="flex-none text-[30px] text-blue-200" />
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
        <Button
          type="button"
          className="w-fit self-center"
          onClick={handleSubmit}
        >
          {type === "edit" ? "Save Changes" : "Create"}
        </Button>
      </form>
    </div>
  );
}
