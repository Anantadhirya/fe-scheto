import axios from "axios";
import { apiGroupList, apiGroupJoin, apiGroupCreate } from "@/lib/apiRoutes";
import { onError } from "./errorHandler";

function ReformatGroupList(data) {
    data.forEach(value => {
        value.name = value.group_name
        value.members = value.member_id.map((member) => {
            member.name = member.username;
            return member
        })
        value.members.push({
            _id : value.id_leader._id,
            name : value.id_leader.username,
        })
    })
}

function ReformatGroupDetail(data) {
    data.name = data.group_name
    data.id_leader.name = data.id_leader.username
    data.members = data.member_id.map((value) => {
        value.name = value.id_user.username
        value.id_user = value.id_user._id
        return value
    })
    data.members.push({
        name : data.id_leader.name,
        id_user : data.id_leader._id
    })
}

export async function FetchGroupList(callback = (data) => {}) {
    try {
        const response = await axios.get(apiGroupList, {
            withCredentials : true
        })
        ReformatGroupList(response.data.list)
        return [...response.data.list]
    } catch (error) {
        onError(error, "inbox")
        throw error
    }
}

export async function JoinGroup(props) {
    try {
        console.log("CObAK JALAN")
        console.log(props)
        const paramsCode = new URLSearchParams({
            code : props.code
        })
        console.log(paramsCode.get('code'))
        const response = await axios.patch(apiGroupJoin + paramsCode.get('code'), {
            group_code : props.code
        },{
            withCredentials : true
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export async function CreatingGroup(props) {
    try {
        
        const response = await axios.post(apiGroupCreate, 
        {
            group_name : props.name
        },
        {
            withCredentials : true
        })
        //console.log("RESPONSE",response)
        return {...response.data}
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function GetGroupDetail(props) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_BE}` + `/group/id/${props._id}/detail`, 
        {
            withCredentials : true
        })
        ReformatGroupDetail(response.data.group)
        return {...response.data.group}
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function LeaveGroup(props) {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_DOMAIN_BE}` + `/group/leave/${props._id}`, 
        {
            withCredentials : true
        })
        return {...response.data}
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function UpdateDescription(props) {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_DOMAIN_BE}` + `/group/id/${props._id}/description`, 
        {
            description : props.description
        },
        {
            withCredentials : true
        })
        return {...response.data}
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function RegenerateCode(props) {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_DOMAIN_BE}` + `/group/id/${props._id}/generate-code`,
        {
            empty : "EMPTY"
        },
        {
            withCredentials : true
        })
        return {...response.data}
    } catch (error) {
        console.log(error)
        throw error
    }
}