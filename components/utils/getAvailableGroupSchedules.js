import {
  addHours,
  areIntervalsOverlapping,
  eachHourOfInterval,
  isAfter,
  isBefore,
  isWithinInterval,
} from "date-fns";

export const getAvailableGroupSchedules = (
  schedules,
  start_time,
  end_time,
  duration_hour,
  members,
) => {
  const query_interval = { start: start_time, end: end_time };

  // Group schedules for each member
  const member_schedules = {};
  schedules.forEach((schedule) => {
    if (
      schedule.is_user_owned &&
      areIntervalsOverlapping(
        { start: schedule.start_time, end: schedule.end_time },
        query_interval,
      )
    ) {
      if (!member_schedules[schedule.id_creator])
        member_schedules[schedule.id_creator] = [];
      member_schedules[schedule.id_creator].push(schedule);
    }
  });

  // Handle individual member overlapping schedules
  const add = [];
  const minus = [];
  const counter = {};
  members.forEach((member) => {
    const ret = [];
    if (!member_schedules[member]) member_schedules[member] = [];
    member_schedules[member].sort((a, b) => a.start_time - b.start_time);
    member_schedules[member].forEach((schedule) => {
      if (
        ret.length !== 0 &&
        isAfter(ret[ret.length - 1].end_time, schedule.start_time)
      ) {
        ret[ret.length - 1].end_time = schedule.end_time;
      } else
        ret.push({
          start_time: schedule.start_time,
          end_time: schedule.end_time,
        });
    });
    ret.forEach(({ start_time, end_time }) => {
      add.push({ start_time, member });
      minus.push({ end_time, member });
    });
    counter[member] = 0;
  });

  // Calculate unavailable for each intervals
  add.sort((a, b) => a.start_time - b.start_time);
  minus.sort((a, b) => a.end_time - b.end_time);
  let padd = 0;
  let pminus = 0;
  let unavailable = 0;
  const ret = [];
  const linesweep = (start_time) => {
    const end_time = addHours(start_time, duration_hour);
    if (
      !isWithinInterval(start_time, query_interval) ||
      !isWithinInterval(end_time, query_interval)
    )
      return;
    while (padd < add.length && isBefore(add[padd].start_time, end_time)) {
      counter[add[padd].member]++;
      if (counter[add[padd].member] === 1) unavailable++;
      padd++;
    }
    while (
      pminus < minus.length &&
      isBefore(minus[pminus].end_time, start_time)
    ) {
      counter[minus[pminus].member]--;
      if (counter[minus[pminus].member] === 0) unavailable--;
      pminus++;
    }
    ret.push({ start_time, end_time, unavailable });
  };
  eachHourOfInterval(query_interval).forEach((time) => {
    linesweep(time);
    linesweep(addHours(time, 0.5));
  });
  return ret;
};
