import { startOfMonth, endOfMonth } from "date-fns";

export function getMonthStartAndEndByName(monthIndex) {
  try {
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Create a Date object for the first day of the given month
    const date = new Date(currentYear, monthIndex, 1); // monthIndex - 1 because months are 0-based in JavaScript

    // Get the start and end of the month
    const start = startOfMonth(date);
    console.log("START", start);
    const end = endOfMonth(date);
    console.log("END", end);
    // Format the results for better readability
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    };
  } catch (error) {
    console.error(
      "Invalid month name. Use full month names like 'February' or 'August'.",
      error,
    );
    throw error;
  }
}

/**
 *
 * @param {Object} data data dari api /schedule/list
 * Untuk sesuaikan sama punya nanta
 */
export function ReformatData(data) {
  data.forEach((element) => {
    element.repeat = element.schedule_type;
  });
}
