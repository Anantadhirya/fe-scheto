
import axios from "axios";
import { apiGetSchedule, apiPostSchedule } from "@/lib/apiRoutes";
import { onError } from "./errorHandler";
import { getMonthStartAndEndByName } from "@/lib/apiUtils";

export async function GetScheduleMonth({queryKey, callback = (data) => {}}) {

    try {
        const rangeData = getMonthStartAndEndByName(queryKey[0])
        const querySchedule = new URLSearchParams({
            startDate : rangeData.startDate,
            endDate : rangeData.endDate
        });

        // fetch 
        const response = await axios.get(apiGetSchedule + "?" + querySchedule.toString(), {
            withCredentials : true
        })
        return callback(response.data)
        
    } catch (error) {
        onError(error, "schedule")
    }
}

export async function AddSchedule({props, callback = (data) => {}}) {
    try {
        const response = await axios.post(apiPostSchedule, {
            title : props.title,
            description : props.description,
            startDate : props.startDate,
            endDate : props.endDate,
            recurrence : props.recurrence,
            isPrivate : props.is_private
        }, {
            withCredentials :true
        })
        return callback(response.data)
    } catch (error) {
        onError(error, "schedule")
    }
}