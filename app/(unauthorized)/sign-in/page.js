import React from "react";
import SigninForm from "@/components/pages/auth/SigninForm";

export const metadata = {
  title: "Sign in",
};

export default function SignIn() {
  return (
    <div className="bg-primary flex h-screen items-stretch justify-center overflow-hidden">
      {/* Left Section */}
      <div className="bg-purple-500 flex flex-1 flex-col items-start justify-center p-10 text-white">
        {/* Pesawat dan Garis */}
        <div className="items-left flex">
          <img
            src="/images/paper-plane.png"
            alt="Paper Plane"
            style={{ width: "3000px", height: "175px" }}
          />
        </div>

        {/* Tulisan & Gambar */}
        <div className="flex flex-col items-start">
          <p className="mb-4 text-center text-3xl font-bold leading-relaxed text-white">
            Say Goodbye to Endless Message Threads and Schedule Clashes
          </p>
          <img
            src="/images/working-illustration.png"
            alt="Working Illustration"
            className="mb-18 w-3/4 max-w-md"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 flex-col items-center justify-center rounded-bl-[30px] rounded-tl-[30px] bg-white p-10 shadow-lg">
        <div className="w-full max-w-sm">
          <h2 className="text-primary mb-2 text-center text-5xl font-bold">
            Welcome Back
          </h2>
          <p className="text-primary mb-8 text-center">
            Sign in to continue using Scheto
          </p>
          <SigninForm />
          <p className="mt-6 text-center text-sm text-black">
            Doesn&apos;t have an account?{" "}
            <a href="/sign-up" className="text-primary font-bold underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
