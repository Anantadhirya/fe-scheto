import axios from "axios";
import { apiProfileDetail } from "@/lib/apiRoutes";
import { onError } from "./errorHandler";

export async function EditProfile(
  props,
  propsChanged,
  callback = (data) => {},
) {
  try {
    console.log("MASUK")
    const response = await axios.patch(
      apiProfileDetail,
      {
        firstName: propsChanged.firstName ? props.firstName : undefined,
        lastName: propsChanged.lastName ? props.lastName : undefined,
        email: propsChanged.email ? props.email : undefined,
        phone: propsChanged.phone ? props.phone : undefined,
        address: propsChanged.address ? props.address : undefined,
        profile_image_url : propsChanged.profile_image_url ? props.profile_image_url : und
      },
      {
        withCredentials: true,
      },
    );
    callback(response.data);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function FetchProfile(callback = (data) => {}) {
  try {
    const response = await axios.get(apiProfileDetail, {
      withCredentials: true,
    });
    callback(response.data);
    return response.data;
  } catch (error) {
    onError(error, "inbox");
    throw error;
  }
}
