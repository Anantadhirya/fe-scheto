"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { getErrorMessage, onError } from "@/components/query/errorHandler";
import { apiLogin, apiVerify } from "@/lib/apiRoutes";

import { InputWithIcon } from "@/components/elements/input";

function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const toastLogin = "loginToast";
  const toastVerify = "verifyToast";

  async function LoginSubmit(e) {
    e.preventDefault();
    toast.promise(
      axios
        .post(
          apiLogin,
          {
            login_detail: email,
            password: password,
          },
          {
            withCredentials: true,
          },
        )
        .then(() => router.push("/")),
      {
        loading: "Signing in...",
        success: "Sign in successful.",
        error: (err) => getErrorMessage(err),
      },
    );
  }

  useEffect(() => {
    async function VerifyUser() {
      try {
        //throw new Error("Telah terjadi error")
        await axios.get(apiVerify, {
          withCredentials: true,
        });
        router.push("/");
      } catch (error) {
        //console.log(er)
      }
    }
    VerifyUser();
  }, [router]);
  return (
    <form className="space-y-4" onSubmit={LoginSubmit}>
      {/* Email */}
      <InputWithIcon
        iconSrc="/images/email-icon.png"
        altText="Email Icon"
        type="email"
        placeholder="Email"
        value={email}
        onChageFunc={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <InputWithIcon
        iconSrc="/images/password-icon.png"
        altText="Password Icon"
        type="password"
        placeholder="Password"
        value={password}
        onChageFunc={(e) => setPassword(e.target.value)}
      />

      {/* Submit */}
      <button className="mb-6 w-full rounded-2xl bg-primary px-6 py-3 font-bold text-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
        Log In
      </button>
    </form>
  );
}

export default SigninForm;
