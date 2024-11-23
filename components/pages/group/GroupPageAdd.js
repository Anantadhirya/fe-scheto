import { Button } from "@/components/elements/button";
import {
  BsCalendar2Date,
  BsClock,
  BsPeopleFill,
  BsStopwatch,
} from "react-icons/bs";

export function GroupPageAdd() {
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
            <div className="w-full select-none rounded-[10px] px-3 py-2 text-base text-blue-200 outline outline-2 outline-blue-200">
              Select the date
            </div>
          </div>
          <div className="flex items-center gap-6">
            <BsStopwatch className="text-[30px] text-blue-200" />
            <div className="w-full select-none rounded-[10px] px-3 py-2 text-base text-blue-200 outline outline-2 outline-blue-200">
              Choose the duration of your meeting
            </div>
          </div>
          <div className="flex items-center gap-6">
            <BsPeopleFill className="text-[30px] text-blue-200" />
            <div className="w-full select-none rounded-[10px] px-3 py-2 text-base text-blue-200 outline outline-2 outline-blue-200">
              <input className="outline-0" />
            </div>
          </div>
          <div className="flex gap-6">
            <BsClock className="text-[30px] text-blue-200" />
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
