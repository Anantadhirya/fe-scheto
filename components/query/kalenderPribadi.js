import axios from "axios";
import { apiGetSchedule, apiPostSchedule, apiScheduleRoute } from "@/lib/apiRoutes";
import { onError } from "./errorHandler";
import { getMonthStartAndEndByName } from "@/lib/apiUtils";

export async function GetScheduleMonth({ queryKey, callback = (data) => {} }) {
  try {
    const rangeData = getMonthStartAndEndByName(queryKey[0]);
    const querySchedule = new URLSearchParams({
      startDate: rangeData.startDate,
      endDate: rangeData.endDate,
    });

    // fetch
    const response = await axios.get(
      apiGetSchedule + "?" + querySchedule.toString(),
      {
        withCredentials: true,
      },
    );
    return callback(response.data);
  } catch (error) {
    onError(error, "schedule");
  }
}

export async function AddSchedule({ props, callback = (data) => {} }) {
  try {
    const response = await axios.post(
      apiPostSchedule,
      {
        title: props.title,
        description: props.description,
        startDate: props.startDate,
        endDate: props.endDate,
        recurrence: props.recurrence,
        isPrivate: props.is_private,
      },
      {
        withCredentials: true,
      },
    );
    return callback(response.data);
  } catch (error) {
    onError(error, "schedule");
  }
}

export async function DeleteSchedule({ props, callback = (data) => {} }) {
  try {
    const params = new URLSearchParams({
      is_repeat_until : props.is_repeat_until,
      repeat_until : props.repeat_until
    })
    let stringURL
    if(props.repeat_until) {
      stringURL = apiScheduleRoute + props._id + "?" + params.toString();
    } else {
      stringURL = apiScheduleRoute + props._id
    }
    //console.log("INI JALAN")
    const response = await axios.delete(
      stringURL,
      {
        withCredentials: true,
      },
    );
    return callback(response.data);
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function EditSchedule({ props, callback = (data) => {} }) {
  try {
    const bodySend = {
      title: props.title,
      description: props.description,
      startDate: props.start_date,
      endDate: props.end_date,
      recurrence: props.recurrence,
      isPrivate: props.is_private
    }
    // console.log("INI JALAN")
    const response = await axios.patch(
      apiScheduleRoute + props._id,
      bodySend,
      {
        withCredentials: true,
      },
    );
    return callback(response.data);
  } catch (error) {
    console.log(error)
    throw error
  }
}
