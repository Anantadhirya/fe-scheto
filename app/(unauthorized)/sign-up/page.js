import React from "react";
import SignUpForm from "@/components/pages/auth/SignUpForm";

export const metadata = {
  title: "Sign up",
};
import Button1 from "@/components/elements/button1";
import { InputWithIcon } from "@/components/elements/input";

export default function SignUp() {
  return (
    <div className="flex h-screen items-stretch justify-center overflow-hidden bg-primary">
      {/* Left Section */}
      <div className="bg-purple-500 flex flex-1 flex-col items-center justify-center p-10 text-white">
        <h1 className="mb-6 mt-12 text-center text-3xl font-bold text-white">
          Your Ultimate Solution for Effortless Group Scheduling!
        </h1>
        <p className="mb-4 text-center text-lg text-white">
          Let&apos;s make meeting coordination smooth, simple, and stress-free
        </p>
        <img
          src="/images/meeting-illustration.png"
          alt="Group Meeting Illustration"
          className="w-3/4 max-w-md"
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-1 flex-col items-center justify-center rounded-bl-[30px] rounded-tl-[30px] rounded-tr-[0px] bg-white p-10 shadow-lg">
        <div className="w-full max-w-sm">
          <h2 className="mb-6 text-center text-3xl font-bold text-primary">
            Create Account
          </h2>
          <SignUpForm />
          <p className="mt-6 text-center text-sm text-black">
            Already have an account?{" "}
            <a href="/sign-in" className="font-bold text-primary underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
