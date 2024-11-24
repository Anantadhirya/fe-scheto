'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

import { onError } from '@/components/query/errorHandler';
import { apiLogin, apiRegister, apiVerify } from '@/lib/apiRoutes';

function SignUpForm() {
    const [registerForm, SetRegisterForm] = useState({
        username : "",
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        confirmPassword : ""
    })
    const router = useRouter();
    const toastRegister = 'registerToast'

    const onChangeForm = (key, value) => {
        SetRegisterForm((old) => {
            return {
                ...old,
                [key] : value
            }
        })
    }

    async function RegisterSubmit(e) {
        e.preventDefault();
        try {
            if(registerForm.confirmPassword != registerForm.password) {
                throw new Error("Confirm your password again")
            }
            if(registerForm.username.trim().length == 0 || registerForm.email.trim().length == 0 || registerForm.firstName.trim().length == 0 || registerForm.password.trim().length == 0) {
                throw new Error("Fill out all of the form")
            }
            toast.loading("Registering account")
            const response = await axios.post(apiRegister, {
                firstName : registerForm.firstName,
                lastName : registerForm.lastName,
                email : registerForm.email,
                password : registerForm.password,
                username : registerForm.username
            }, {
                withCredentials : true
            })
            toast.dismiss()
            toast.success(response.data.message || "Process is successful")
            router.push("/sign-in")
        } catch (error) {
            onError(error, toastRegister)
        }
    }

    return (
        <form className="space-y-4" onSubmit={RegisterSubmit}>
            {/* First Name */}
            <div className="border-primary flex items-center rounded-2xl border-2 p-3">
                <img
                    src="/images/user-icon.png"
                    alt="User Icon"
                    className="text-primary mr-3 h-5 w-5"
                />
                <input
                    type="text"
                    placeholder="Username"
                    
                    value={registerForm.username}
                    onChange={(e) => onChangeForm('username', e.target.value)}
                    className="w-full border-none focus:outline-none"
                />
            </div>

            {/* First Name */}
            <div className="border-primary flex items-center rounded-2xl border-2 p-3">
                <img
                    src="/images/user-icon.png"
                    alt="User Icon"
                    className="text-primary mr-3 h-5 w-5"
                />
                <input
                    type="text"
                    placeholder="First name"
                    
                    value={registerForm.firstName}
                    onChange={(e) => onChangeForm('firstName', e.target.value)}
                    className="w-full border-none focus:outline-none"
                />
            </div>

            {/* Last Name */}
            <div className="border-primary flex items-center rounded-2xl border-2 p-3">
                <img
                    src="/images/user-icon.png"
                    alt="User Icon"
                    className="text-primary mr-3 h-5 w-5"
                />
                <input
                    type="text"
                    placeholder="Last name"
                    value={registerForm.lastName}
                    onChange={(e) => onChangeForm('lastName', e.target.value)}
                    className="w-full border-none focus:outline-none"
                />
            </div>

            {/* Email */}
            <div className="border-primary flex items-center rounded-2xl border-2 p-3">
                <img
                    src="/images/email-icon.png"
                    alt="Email Icon"
                    className="text-primary mr-3 h-5 w-5"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={registerForm.email}
                    onChange={(e) => onChangeForm('email', e.target.value)}
                    className="w-full border-none focus:outline-none"
                />
            </div>

            {/* Password */}
            <div className="border-primary flex items-center rounded-2xl border-2 p-3">
                <img
                    src="/images/password-icon.png"
                    alt="Password Icon"
                    className="text-primary mr-3 h-5 w-5"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={registerForm.password}
                    onChange={(e) => onChangeForm('password', e.target.value)}
                    className="w-full border-none focus:outline-none"
                />
            </div>

            {/* Confirm Password */}
            <div className="border-primary flex items-center rounded-2xl border-2 p-3">
                <img
                    src="/images/password-icon.png"
                    alt="Password Icon"
                    className="text-primary mr-3 h-5 w-5"
                />
                <input
                    type="password"
                    value={registerForm.confirmPassword}
                    onChange={(e) => onChangeForm('confirmPassword', e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full border-none focus:outline-none"
                />
            </div>

            {/* Submit */}
            <button className="bg-primary w-full rounded-2xl px-6 py-3 font-bold text-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
                Create
            </button>
        </form>
    )
}

export default SignUpForm