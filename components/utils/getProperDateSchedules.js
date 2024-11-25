export const getProperDateSchedules = (schedules) =>
  schedules.map((schedule) => ({
    ...schedule,
    start_time: new Date(schedule.start_time),
    end_time: new Date(schedule.end_time),
  }));
