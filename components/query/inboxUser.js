import axios from "axios";
import { apiInbox } from "@/lib/apiRoutes";
import { onError } from "./errorHandler";

function timeAgo(inputDate) {
  const now = new Date();
  const input = new Date(inputDate);
  const diff = now - input; // Difference in milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Approximation
  const years = Math.floor(days / 365); // Approximation

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (days < 30) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}

function isPastOneDay(date) {
  const now = new Date();
  const input = new Date(date);
  const oneDayAgo = now - 24 * 60 * 60 * 1000; // Subtract 24 hours in milliseconds
  return input < oneDayAgo;
}

function ReformatData(data) {
  data.forEach((element) => {
    element.time = timeAgo(element.createdAt);
    element.isNew = isPastOneDay(element.createdAt);
    element.isHighlighted = false;
  });
}

export async function GetUserInbox() {
  try {
    const response = await axios.get(apiInbox, {
      withCredentials: true,
    });
    ReformatData(response.data.inbox);
    //console.log(response.data.inbox[0])
    return response.data;
  } catch (error) {
    onError(error, "inbox");
    return [];
  }
}
