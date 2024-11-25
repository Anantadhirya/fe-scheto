import toast from "react-hot-toast";

export async function onError(error, toastID = "defaultToast") {
  const toastOptions = {
    id: toastID,
  };
  toast.dismiss();
  if (process.env.NEXT_PUBLIC_ENVIRONMENT == "development") {
    console.log(error);
  }
  if (error?.response?.status == 500) {
    toast.error("Server error occured", toastOptions);
  } else if (
    error?.response?.data?.errors &&
    error?.response?.data?.errors?.length > 0
  ) {
    toast.error(error?.response?.data?.errors[0].msg, toastOptions);
  } else if (error?.response?.data?.message) {
    toast.error(error?.response?.data?.message, toastOptions);
  } else if (error?.response?.data?.error) {
    toast.error(error.response.data.error, toastOptions);
  } else if (error.message) {
    toast.error(error.message, toastOptions);
  } else {
    toast.error("An error occured", toastOptions);
  }
}
