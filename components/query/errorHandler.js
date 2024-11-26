import toast from "react-hot-toast";

export const getErrorMessage = (error) => {
  if (error?.response?.status == 500) return "Server error occured";
  else if (
    error?.response?.data?.errors &&
    error?.response?.data?.errors?.length > 0
  )
    return error?.response?.data?.errors[0].msg;
  else if (error?.response?.data?.message)
    return error?.response?.data?.message;
  else if (error?.response?.data?.error) return error.response.data.error;
  else if (error.message) return error.message;
  else return "An error occured";
};

export async function onError(error, toastID = "defaultToast") {
  const toastOptions = {
    id: toastID,
  };
  toast.dismiss();
  if (process.env.NEXT_PUBLIC_ENVIRONMENT == "development") {
    console.log(error);
  }
  toast.error(getErrorMessage(error), toastOptions);
}
