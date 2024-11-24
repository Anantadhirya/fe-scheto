import React from "react";
import Button1 from "@/components/elements/button1"; 
import InputWithIcon from "@/components/elements/input"; 

export default function SignUp() {
  return (
    <div className="flex h-screen items-stretch justify-center bg-primary overflow-hidden">
      {/* Left Section */}
      <div className="flex-1 bg-purple-500 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl font-bold text-white text-center mb-6 mt-12">
          Your Ultimate Solution for Effortless Group Scheduling!
        </h1>
        <p className="text-lg text-white text-center mb-4">
          Let's make meeting coordination smooth, simple, and stress-free
        </p>
        <img
          src="/images/meeting-illustration.png"
          alt="Group Meeting Illustration"
          className="w-3/4 max-w-md"
        />
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-white rounded-tl-[30px] rounded-bl-[30px] rounded-tr-[0px] shadow-lg flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">
            Create Account
          </h2>
          <form className="space-y-4">
            {/* First Name */}
            <InputWithIcon
              type="text"
              placeholder="First name"
              iconSrc="/images/user-icon.png"
              altText="User Icon"
            />

            {/* Last Name */}
            <InputWithIcon
              type="text"
              placeholder="Last name"
              iconSrc="/images/user-icon.png"
              altText="User Icon"
            />

            {/* Email */}
            <InputWithIcon
              type="email"
              placeholder="Email"
              iconSrc="/images/email-icon.png"
              altText="Email Icon"
            />

            {/* Password */}
            <InputWithIcon
              type="password"
              placeholder="Password"
              iconSrc="/images/password-icon.png"
              altText="Password Icon"
            />

            {/* Confirm Password */}
            <InputWithIcon
              type="password"
              placeholder="Confirm Password"
              iconSrc="/images/password-icon.png"
              altText="Password Icon"
            />

            {/* Submit Button */}
            <Button1>Create</Button1>
          </form>
          <p className="mt-6 text-center text-sm text-black">
            Already have an account?{' '}
            <a href="/sign-in" className="text-primary font-bold underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
