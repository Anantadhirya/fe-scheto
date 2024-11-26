import axios from "axios";
import { apiGroupList, apiGroupJoin, apiGroupCreate } from "@/lib/apiRoutes";
import { onError } from "./errorHandler";
import { getMonthStartAndEndByName } from "@/lib/apiUtils";

export async function GetScheduleMonth({queryKey, callback = (data) => {}}) {

    try {
        const rangeData = getMonthStartAndEndByName(queryKey[0])
        const querySchedule = new URLSearchParams({
            startDate : rangeData.startDate,
            endDate : rangeData.endDate,
            is_all : true
        });

        // fetch 
        const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_BE}` + `/group/id/${queryKey[1]}/schedule` + "?" + querySchedule.toString(), {
            withCredentials : true
        })
        return callback(response.data)
    } catch (error) {
        throw error
    }
}

export async function AddGroupSchedule({props, callback = (data) => {}}) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_BE}` + `/group/id/${props._id}/schedule`, {
            title : props.title,
            description : props.description,
            startDate : props.startDate,
            endDate : props.endDate,
            member_ids : props.member_ids
        }, {
            withCredentials :true
        })
        return callback(response.data)
    } catch (error) {
        throw error
    }
}

export async function DeleteGroupSchedule({props, callback = (data) => {}}) {
    try {
        console.log("JALAN G SIH")
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_DOMAIN_BE}` + `/group/id/${props.group_id}/schedule/${props.schedule_id}`,
            {
                withCredentials :true
            }
        )
        return callback(response.data)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function RejectGroupSchedule({props, callback = (data) => {}}) {
    try {
        console.log("JALAN G SIH")
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_DOMAIN_BE}` + `/group/id/${props.group_id}/schedule/reject/${props.schedule_id}`,
            {
                empty :true
            },
            {
                withCredentials :true
            }
        )
        return callback(response.data)
    } catch (error) {
        console.log(error)
        throw error
    }
}