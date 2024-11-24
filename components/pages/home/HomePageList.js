import { Select } from "@/components/elements/select";
import { Timeline } from "@/components/elements/timeline";
import { getUpcomingSchedules } from "@/components/utils/getUpcomingSchedules";
import { useMemo, useState } from "react";

export function HomePageList({ schedules }) {
  const options = useMemo(() => [{ label: "All schedules", value: "*" }], []);
  const [selected, setSelected] = useState(options[0]);
  return (
    <div className="scroll-container flex grow flex-col overflow-auto px-10 pb-7 max-md:h-fit md:h-0">
      <div className="sticky top-0 z-20 bg-gradient-to-b from-white from-80% to-white/0 pb-5 pt-7">
        <Select
          options={options}
          value={selected}
          onChange={setSelected}
          className="w-[200px] rounded-full bg-blue-200/80 text-white outline-0"
        />
      </div>
      <Timeline schedules={getUpcomingSchedules(schedules, 10)} />
    </div>
  );
}
