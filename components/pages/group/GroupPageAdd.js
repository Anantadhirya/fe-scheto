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
import { getAvailableGroupSchedules } from "@/components/utils";
import { addDays, format, isSameDay, startOfDay } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  BsCalendar2Date,
  BsCheckCircle,
  BsClock,
  BsPeopleFill,
  BsStopwatch,
  BsXCircle,
} from "react-icons/bs";
import { twMerge } from "tailwind-merge";

export function GroupPageAdd({ group, schedules }) {
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [selectedDuration, setSelectedDuration] = useState();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState();
  const maxAvailableSchedules = 50;
  const availableSchedules = useMemo(
    () =>
      schedules && selectedDate && selectedDuration && selectedMembers.length
        ? getAvailableGroupSchedules(
            schedules,
            startOfDay(selectedDate.from),
            startOfDay(addDays(selectedDate.to, 1)),
            selectedDuration.value,
            selectedMembers.map((member) => member.value),
          )
            .sort((a, b) =>
              a.unavailable != b.unavailable
                ? a.unavailable - b.unavailable
                : a.start_time - b.start_time,
            )
            .slice(0, maxAvailableSchedules)
        : [],
    [schedules, selectedDate, selectedDuration, selectedMembers],
  );
  useEffect(() => setSelectedSchedule(), [availableSchedules]);
  const handleCreateSchedule = () => {
    if (!title) return toast.error("Please enter a schedule title");
    if (!selectedDate)
      return toast.error("Please select a date for the meeting");
    if (!selectedDuration)
      return toast.error("Please select a duration for the meeting");
    if (selectedMembers.length === 0)
      return toast.error("Please select members for the meeting");
    if (selectedSchedule === undefined)
      return toast.error("Please select a schedule from the list");
    const data = {
      is_user_owned: false,
      group_data: {
        member_joining: selectedMembers.map((member) => member.value),
      },
      title: title,
      start_time: availableSchedules[selectedSchedule].start_time,
      end_time: availableSchedules[selectedSchedule].end_time,
    };

    // TODO: Integrate create group schedule
    console.log(data);
  };
  return (
    <div className="scroll-container h-0 grow overflow-auto max-md:h-fit md:p-10">
      <form className="flex flex-col gap-8 py-9 shadow-md max-md:px-8 md:px-16">
        <input
          placeholder="TITLE"
          className="text-3xl font-semibold text-blue-200 outline-0 placeholder:text-blue-200/70"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
              value={selectedDuration}
              onChange={setSelectedDuration}
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
              value={selectedMembers}
              onChange={setSelectedMembers}
              options={group.members.map((member) => ({
                value: member.id_user,
                label: member.name,
              }))}
            />
          </div>
          <div className="flex gap-6">
            <BsClock className="flex-none text-[30px] text-blue-200" />
            <div className="scroll-container flex h-60 w-full select-none flex-col gap-2 overflow-auto rounded-[10px] px-3 py-2 text-base text-blue-200 outline outline-2 outline-blue-200">
              {availableSchedules.map((schedule, idx) => (
                <button
                  key={schedule.start_time}
                  onClick={() => setSelectedSchedule(idx)}
                  type="button"
                  className={twMerge(
                    "flex flex-col rounded-[15px] px-5 py-3 outline outline-1 outline-blue-200",
                    idx === selectedSchedule ? "bg-[#EEEDFE]" : "",
                  )}
                >
                  <div className="text-left font-semibold">
                    {isSameDay(schedule.start_time, schedule.end_time)
                      ? `${format(schedule.start_time, "EEEE, d MMM yyyy (HH:mm")} - ${format(schedule.end_time, "HH:mm)")}`
                      : `${format(schedule.start_time, "d MMM yyyy (HH:mm)")} - ${format(schedule.end_time, "d MMM yyyy (HH:mm)")}`}
                  </div>
                  <div className="flex items-center gap-1 text-left">
                    <div>
                      {schedule.unavailable === 0 ? (
                        <BsCheckCircle className="text-green-100" />
                      ) : (
                        <BsXCircle className="text-red-100" />
                      )}
                    </div>
                    <div>
                      {schedule.unavailable === 0
                        ? "All members are available"
                        : schedule.unavailable === 1
                          ? "1 member is unavailable"
                          : `${schedule.unavailable} members are unavailable`}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <Button
          type="button"
          className="w-fit self-center"
          onClick={handleCreateSchedule}
        >
          Create
        </Button>
      </form>
    </div>
  );
}
