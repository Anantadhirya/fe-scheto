import { Calendar } from "@/components/elements/calendar";
import { GroupHeader } from "./components";

export function GroupPageCalendar({
  group,
  setPage,
  schedules,
  start_date,
  onDelete,
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Group Name and Invite Code */}
      <GroupHeader group={group} setPage={setPage} showIcon />
      {/* Calendar */}
      <Calendar
        schedules={schedules}
        start_date={start_date}
        isGroup
        group={group}
        onDelete={onDelete}
      />
    </div>
  );
}
