import {
  addDays,
  addMilliseconds,
  addMonths,
  addWeeks,
  differenceInMilliseconds,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  getDate,
  getDay,
  getHours,
  getMinutes,
  getSeconds,
  isAfter,
  isWithinInterval,
  max,
  min,
  set,
  setDay,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

export const getUpcomingSchedules = (schedules, count = 5) => {
  const schedulesNoRepeat = schedules.filter(
    (schedule) => !schedule.repeat || schedule.repeat === "NONE",
  );
  const schedulesRepeat = schedules
    .filter((schedule) => schedule.repeat && schedule.repeat !== "NONE")
    .flatMap((schedule) => {
      const repeat_interval = {
        start: max([
          schedule.start_time,
          schedule.repeat === "MONTHLY"
            ? startOfMonth(new Date())
            : schedule.repeat === "WEEKLY"
              ? startOfWeek(new Date())
              : startOfDay(new Date()),
        ]),
        end: min([
          ...(schedule.repeat_until ? [schedule.repeat_until] : []),
          schedule.repeat === "MONTHLY"
            ? addMonths(new Date(), count + 3)
            : schedule.repeat === "WEEKLY"
              ? addWeeks(new Date(), count + 3)
              : addDays(new Date(), count + 3),
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
        start_time,
        end_time: addMilliseconds(start_time, duration),
      }));
      return repeatedSchedules.filter(
        (schedule) =>
          isWithinInterval(schedule.start_time, repeat_interval) &&
          isWithinInterval(schedule.end_time, repeat_interval),
      );
    });
  return [...schedulesNoRepeat, ...schedulesRepeat]
    .filter((schedule) => isAfter(schedule.start_time, new Date()))
    .sort((a, b) => a.start_time - b.start_time)
    .slice(0, count);
};
