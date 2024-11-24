import { Calendar } from "@/components/elements/calendar";

export function HomePageCalendar({ schedules, start_date }) {
  return (
    <div className="flex h-full flex-col">
      <Calendar schedules={schedules} start_date={start_date} />
    </div>
  );
}
