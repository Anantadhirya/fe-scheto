import React from "react";
import Button1 from "@/components/elements/button1"; 
import IconInput from "@/components/elements/input"; 

export default function SignIn() {
  return (
    <div className="bg-primary flex h-screen items-stretch justify-center overflow-hidden">
      {/* Left Section */}
      <div className="bg-purple-500 flex flex-1 flex-col items-start justify-center p-10 text-white">
        {/* Pesawat dan Garis */}
        <div className="flex items-left mb-8">
          <img
            src="/images/paper-plane.png"
            alt="Paper Plane"
            className="w-[1000px] h-[175px] object-contain"
          />
        </div>

        {/* Tulisan & Gambar */}
        <div className="flex flex-col items-start space-y-6">
          <p className="text-3xl text-center font-bold leading-relaxed">
            Say Goodbye to Endless Message Threads 
            and Schedule Clashes
          </p>
          <img
            src="/images/working-illustration.png"
            alt="Working Illustration"
            className="w-3/4 max-w-md"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 flex-col items-center justify-center rounded-bl-[30px] rounded-tl-[30px] bg-white p-10 shadow-lg">
        <div className="w-full max-w-sm">
          <h2 className="text-5xl font-bold text-primary mb-4 text-center">
            Welcome Back
          </h2>
          <p className="text-primary mb-8 text-center">
            Sign in to continue using Scheto
          </p>
          <form className="space-y-6">
            {/* Email Input */}
            <IconInput
              iconSrc="/images/email-icon.png"
              altText="Email Icon"
              type="email"
              placeholder="Email"
            />

            {/* Password Input */}
            <IconInput
              iconSrc="/images/password-icon.png"
              altText="Password Icon"
              type="password"
              placeholder="Password"
            />

            {/* Submit Button */}
            <Button1>Log In</Button1>
          </form>
          <p className="mt-6 text-center text-sm text-black">
            Doesn't have an account?{" "}
            <a href="/sign-up" className="text-primary font-bold underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
