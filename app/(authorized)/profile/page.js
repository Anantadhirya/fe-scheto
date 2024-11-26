"use client";

import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { InputWithIcon } from "@/components/elements/input";
import { Button2 } from "@/components/elements/button1";
import Image from "next/image";

import { FetchProfile, EditProfile } from "@/components/query/profileUser";
import { apiProfileDetail } from "@/lib/apiRoutes";
import { useQuery, useMutation } from "@tanstack/react-query";
import { onError } from "@/components/query/errorHandler";
import axios from "axios";
import toast from "react-hot-toast";
import { BsCameraFill } from "react-icons/bs";

export default function ProfilePage() {
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    gender: "Female",
    phone: "Phone Number",
    address: "Address",
    profile_image_url: undefined,
  });

  const [profileChanged, SetProfileChanged] = useState({
    firstName: false,
    lastName: false,
    email: false,
    gender: false,
    phone: false,
    address: false,
    profile_image_url: false,
  });

  const GetProfileQuery = useQuery({
    queryKey: ["profile_data"],
    queryFn: (props) => {
      return FetchProfile((data) => {
        setProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          gender: data.gender,
          phone: data.phoneNumber,
          address: data.address,
          _id: data._id,
          profile_image_url: data.profile_image_url,
        });
      });
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const ChangeProfileQuery = useMutation({
    mutationFn: (props) => {
      toast.loading("Updating profile");
      return EditProfile(profile, profileChanged);
    },
    retry: 2,
    onError: (error) => {
      toast.dismiss();
      onError(error, "profile");
    },
    onSuccess: (data) => {
      GetProfileQuery.refetch();
    },
  });

  const handleChange = (name, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    SetProfileChanged((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleButtonClick = () => fileInputRef.current?.click();

  // Handle file selection
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formPost = new FormData();
      formPost.append("file", file);
      formPost.append("user_id", profile._id);
      try {
        toast.loading("Updating image");
        const response = await axios.post("/api/upload", formPost);
        await axios.patch(
          apiProfileDetail,
          {
            profile_image_url: response.data.url,
          },
          {
            withCredentials: true,
          },
        );
        toast.dismiss();
        toast.success("image berhasil diupload");
        handleChange("profile_image_url", response.data.url);
        fileInputRef.value = "";
      } catch (error) {
        onError(error, "profile_upload");
      }
    }
  };

  const handleButtonSave = async (e) => {
    try {
      toast.loading("update profile");
      const response = await axios.patch(
        apiProfileDetail,
        {
          firstName: profileChanged.firstName ? profile.firstName : undefined,
          lastName: profileChanged.lastName ? profile.lastName : undefined,
          email: profileChanged.email ? profile.email : undefined,
          phoneNumber: profileChanged.phone ? profile.phone : undefined,
          address: profileChanged.address ? profile.address : undefined,
          profile_image_url: profileChanged.profile_image_url
            ? profile.profile_image_url
            : undefined,
        },
        {
          withCredentials: true,
        },
      );
      toast.dismiss();
      toast.success(response.data.message);
      GetProfileQuery.refetch();
    } catch (error) {
      console.log(error);
      onError(error);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white p-4 shadow-md">
        <h1 className="mr-4 flex-shrink-0 pl-4 text-2xl font-bold text-primary">
          Edit Profile
        </h1>
      </div>

      {/* Content */}
      <div className="flex-grow p-10">
        <div className="flex gap-10 max-md:flex-col">
          {/* Profile Picture Section */}
          <div className="relative flex h-fit w-fit items-center justify-center max-md:self-center">
            <button
              className="aspect-square w-[350px] max-w-[90vw] overflow-hidden rounded-full border-[10px] border-primary shadow-md outline-0"
              onClick={handleButtonClick}
            >
              <Image
                src={profile.profile_image_url ?? "/default_profile.webp"}
                alt="Profile"
                className="h-full w-full object-cover"
                width={2000}
                height={2000}
              />
            </button>
            <button
              type="button"
              onClick={handleButtonClick}
              className="absolute bottom-[12%] right-[5%] flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xl text-white shadow-md outline-0 hover:bg-blue-300"
            >
              <BsCameraFill />
            </button>
          </div>

          {/* Form Section */}
          <div className="grid flex-grow grid-cols-1 gap-4">
            <InputWithIcon
              type="text"
              placeholder="First Name"
              iconSrc="/images/user-icon.png"
              altText="First Name Icon"
              value={profile.firstName}
              onChageFunc={(e) => handleChange("firstName", e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
              ref={fileInputRef}
            />

            <InputWithIcon
              type="text"
              placeholder="Last Name"
              iconSrc="/images/user-icon.png"
              altText="Last Name Icon"
              value={profile.lastName}
              onChageFunc={(e) => handleChange("lastName", e.target.value)}
            />

            <InputWithIcon
              type="email"
              placeholder="Email"
              iconSrc="/images/email-icon.png"
              altText="Email Icon"
              value={profile.email}
              onChageFunc={(e) => handleChange("email", e.target.value)}
            />

            <InputWithIcon
              type="text"
              placeholder="Phone Number"
              iconSrc="/images/phone.png"
              altText="Phone Icon"
              value={profile.phone}
              onChageFunc={(e) => handleChange("phone", e.target.value)}
            />

            <InputWithIcon
              type="text"
              placeholder="Address"
              iconSrc="/images/address.png"
              altText="Address Icon"
              value={profile.address}
              onChageFunc={(e) => handleChange("address", e.target.value)}
            />

            {/* Save Changes Button */}
            <div className="mt-10 flex w-full">
              <button
                type="button"
                onClick={handleButtonSave}
                className="hover:shadow-x2 h-[45px] w-full rounded-2xl bg-primary font-bold text-white shadow-lg transition-shadow duration-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
