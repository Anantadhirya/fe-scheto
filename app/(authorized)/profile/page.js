"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function ProfilePage() {
  const pathname = usePathname();

  const isActive = (targetPath) => pathname === targetPath;

  const [profile, setProfile] = useState({
    firstName: "Jane",
    lastName: "Kim",
    email: "Janerubyjane@mail.ugm.ac.id",
    gender: "Female",
    phone: "08578689763978",
    address: "Kalasan, Sleman, Daerah Istimewa Yogyakarta",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="flex flex-grow items-start justify-center p-10">
        <div className="mx-auto w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
          <div className="flex space-x-6">
            <div className="h-28 w-28 bg-blue-200">
              <img
                src="/images/user-icon.png" //Profile picture goes here
                alt="Profile"
                className="h-full w-full items-center justify-center rounded-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-gray-700 block text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="mt-1 w-full rounded border p-2"
                    value={profile.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-gray-700 block text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="mt-1 w-full rounded border p-2"
                    value={profile.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-gray-700 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="mt-1 w-full rounded border p-2"
                    value={profile.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-gray-700 block text-sm font-medium">
                    Gender
                  </label>
                  <select
                    name="gender"
                    className="mt-1 w-full rounded border p-2"
                    value={profile.gender}
                    onChange={handleChange}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-700 block text-sm font-medium">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="mt-1 w-full rounded border p-2"
                    value={profile.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="text-gray-700 block text-sm font-medium">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="mt-1 w-full rounded border p-2"
                    value={profile.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
