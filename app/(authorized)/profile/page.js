"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { InputWithIcon } from "@/components/elements/input";
import { Button2 } from "@/components/elements/button1";
export default function ProfilePage() {
  const pathname = usePathname();

  const isActive = (targetPath) => pathname === targetPath;

  const [profile, setProfile] = useState({
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    gender: "Female",
    phone: "Phone Number",
    address: "Address",
  });

  const handleChange = (name, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
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
        <div className="flex gap-10">
          {/* Profile Picture Section */}
          <div className="relative flex items-center justify-center">
            <div className="w-[350px] h-[350px] rounded-full border-[10px] border-primary overflow-hidden shadow-md">
              <img
                src="/images/default-profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-20 right-3 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-blue-300">
              <img
                src="/images/camera-icon.png" // Ganti dengan path ikon kamera
                alt="Edit"
                className="w-30 h-30"
              />
            </button>
          </div>

           {/* Form Section */}
          <div className="flex-grow grid grid-cols-1 gap-4">
            <InputWithIcon
              type="text"
              placeholder="First Name"
              iconSrc="/images/user-icon.png"
              altText="First Name Icon"
              value={profile.firstName}
              onChageFunc={(e) => handleChange("firstName", e.target.value)}
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
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end mt-10">
          <Button2 className="w-[100px] bg-primary text-white py-4 rounded-lg text-lg font-medium hover:bg-blue-600">
            Save Changes
          </Button2>
        </div>
      </div>
    </div>
  );
}
