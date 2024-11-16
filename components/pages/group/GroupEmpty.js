import { Button } from "@/components/elements/button";
import { Input } from "@/components/elements/input";
import { BsPersonFill } from "react-icons/bs";

export function GroupEmpty({ type }) {
  return (
    <div className="flex grow flex-col items-center justify-center gap-5 p-5 pb-16">
      {/* Text */}
      <div className="text-nowrap text-center text-lg font-semibold text-red-100">
        {type === "not-joined"
          ? "You have not joined any groups."
          : "You don't have any group discoverable."}
        <br />
        Try Join with a code or create one.
      </div>
      {/* Modal */}
      <div className="flex flex-col items-center gap-7 rounded-[20px] bg-blue-100 px-5 py-10 text-center outline outline-1 outline-blue-200/70">
        <div className="text-[78px] text-blue-200">
          <BsPersonFill />
        </div>
        <div className="text-base font-semibold text-blue-200">
          Join a group with a code
        </div>
        <Input
          placeholder="Enter join code"
          size="sm"
          className="w-[293px] max-w-[80vw]"
        />
        <Button className="w-[186px]">Join Group</Button>
      </div>
    </div>
  );
}
