"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { onError } from "@/components/query/errorHandler";
import { apiRegister, apiVerify } from "@/lib/apiRoutes";

import { InputWithIcon } from "@/components/elements/input";
import { Button1 } from "@/components/elements/button1";

function SignUpForm() {
  const [registerForm, SetRegisterForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const toastRegister = "registerToast";

  const onChangeForm = (key, value) => {
    SetRegisterForm((old) => {
      return {
        ...old,
        [key]: value,
      };
    });
  };

  async function RegisterSubmit(e) {
    e.preventDefault();
    try {
      if (registerForm.confirmPassword != registerForm.password) {
        throw new Error("Confirm your password again");
      }
      if (
        registerForm.username.trim().length == 0 ||
        registerForm.email.trim().length == 0 ||
        registerForm.firstName.trim().length == 0 ||
        registerForm.password.trim().length == 0
      ) {
        throw new Error("Fill out all of the form");
      }
      toast.loading("Registering account");
      const response = await axios.post(
        apiRegister,
        {
          firstName: registerForm.firstName,
          lastName: registerForm.lastName,
          email: registerForm.email,
          password: registerForm.password,
          username: registerForm.username,
        },
        {
          withCredentials: true,
        },
      );
      toast.dismiss();
      toast.success(response.data.message || "Process is successful");
      router.push("/sign-in");
    } catch (error) {
      onError(error, toastRegister);
    }
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
    <form className="space-y-4" onSubmit={RegisterSubmit}>
      {/* username */}
      <InputWithIcon
        type="text"
        placeholder="Username"
        iconSrc="/images/user-icon.png"
        altText="User Icon"
        value={registerForm.username}
        onChageFunc={(e) => onChangeForm("username", e.target.value)}
      />

      {/* First Name */}
      <InputWithIcon
        type="text"
        placeholder="First name"
        iconSrc="/images/user-icon.png"
        altText="User Icon"
        onChageFunc={(e) => onChangeForm("firstName", e.target.value)}
        className="w-full border-none focus:outline-none"
      />

      {/* Last Name */}
      <InputWithIcon
        type="text"
        placeholder="Last name"
        iconSrc="/images/user-icon.png"
        altText="User Icon"
        value={registerForm.lastName}
        onChageFunc={(e) => onChangeForm("lastName", e.target.value)}
      />

      {/* Email */}
      <InputWithIcon
        type="email"
        placeholder="Email"
        iconSrc="/images/email-icon.png"
        altText="Email Icon"
        value={registerForm.email}
        onChageFunc={(e) => onChangeForm("email", e.target.value)}
      />

      {/* Password */}
      <InputWithIcon
        type="password"
        placeholder="Password"
        iconSrc="/images/password-icon.png"
        altText="Password Icon"
        value={registerForm.password}
        onChageFunc={(e) => onChangeForm("password", e.target.value)}
      />

      {/* Confirm Password */}
      <InputWithIcon
        type="password"
        placeholder="Confirm Password"
        iconSrc="/images/password-icon.png"
        altText="Password Icon"
        value={registerForm.confirmPassword}
        onChageFunc={(e) => onChangeForm("confirmPassword", e.target.value)}
      />

      {/* Submit */}
      <Button1>Create</Button1>
    </form>
  );
}

export default SignUpForm;
