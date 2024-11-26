import {
  addMilliseconds,
  areIntervalsOverlapping,
  differenceInMilliseconds,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  getDate,
  getDay,
  getHours,
  getMinutes,
  getSeconds,
  isWithinInterval,
  max,
  min,
  set,
  setDay,
} from "date-fns";

const scheduleIsWithinInterval = (schedule, start_time, end_time) => {
  return areIntervalsOverlapping(
    { start: schedule.start_time, end: schedule.end_time },
    { start: start_time, end: end_time },
  );
};

export const getRepeatedSchedules = (schedules, start_time, end_time) =>
  schedules
    .flatMap((schedule) => {
      if (!schedule.repeat || schedule.repeat === "NONE") return [schedule];
      const repeat_interval = {
        start: max([start_time, schedule.start_time]),
        end: min([
          end_time,
          ...(schedule.repeat_until ? [schedule.repeat_until] : []),
        ]),
      };
      const duration = differenceInMilliseconds(
        schedule.end_time,
        schedule.start_time,
      );
      const repeatedSchedules = (
        schedule.repeat === "MONTHLY"
          ? eachMonthOfInterval(repeat_interval).map((month) =>
              set(month, {
                date: getDate(schedule.start_time),
                hours: getHours(schedule.start_time),
                minutes: getMinutes(schedule.start_time),
                seconds: getSeconds(schedule.start_time),
              }),
            )
          : schedule.repeat === "WEEKLY"
            ? eachWeekOfInterval(repeat_interval).map((week) =>
                setDay(
                  set(week, {
                    hours: getHours(schedule.start_time),
                    minutes: getMinutes(schedule.start_time),
                    seconds: getSeconds(schedule.start_time),
                  }),
                  getDay(schedule.start_time),
                ),
              )
            : schedule.repeat === "DAILY"
              ? eachDayOfInterval(repeat_interval).map((day) =>
                  set(day, {
                    hours: getHours(schedule.start_time),
                    minutes: getMinutes(schedule.start_time),
                    seconds: getSeconds(schedule.start_time),
                  }),
                )
              : []
      ).map((start_time) => ({
        ...schedule,
        start_repeat_time: schedule.start_time,
        start_time,
        end_time: addMilliseconds(start_time, duration),
      }));
      return repeatedSchedules.filter(
        (schedule) =>
          isWithinInterval(schedule.start_time, repeat_interval) &&
          isWithinInterval(schedule.end_time, repeat_interval),
      );
    })
    .filter((schedule) =>
      scheduleIsWithinInterval(schedule, start_time, end_time),
    );
