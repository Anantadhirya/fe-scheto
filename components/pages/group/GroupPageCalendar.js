import { GroupHeader } from "./components";

export function GroupPageCalendar({ group, setPage }) {
  return (
    <div className="flex flex-col">
      {/* Group Name and Invite Code */}
      <GroupHeader group={group} setPage={setPage} showIcon />
      {/* Calendar */}
    </div>
  );
}
