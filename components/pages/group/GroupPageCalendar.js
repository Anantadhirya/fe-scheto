import { BsFiles, BsInfoCircle } from "react-icons/bs";

export function GroupPageCalendar({ group, setPage }) {
  return (
    <div className="flex flex-col">
      {/* Group Name and Invite Code */}
      <div className="relative z-20 flex items-center justify-between bg-blue-100 py-2 pl-12 pr-8 text-2xl font-extrabold text-blue-200 shadow-md">
        {/* Group Name */}
        <button
          className="flex items-center gap-2 p-2"
          onClick={() => setPage("details")}
        >
          <span>{group.name}</span>
          <span className="text-lg">
            <BsInfoCircle />
          </span>
        </button>
        {/* Invite Code */}
        <button className="flex items-center gap-2 p-2">
          <span>#{group.id}</span>
          <span className="text-xl">
            <BsFiles />
          </span>
        </button>
      </div>
      {/* Calendar */}
    </div>
  );
}
