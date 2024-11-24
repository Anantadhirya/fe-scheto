'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

import { onError } from '@/components/query/errorHandler';
import { apiLogin, apiVerify } from '@/lib/apiRoutes';

function SigninForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const toastLogin = 'loginToast'
    const toastVerify = 'verifyToast'

    async function LoginSubmit(e) {
        e.preventDefault()
        try {
            toast.loading("checking account")
            await axios.post(apiLogin, {
                login_detail : email,
                password : password
            }, {
                withCredentials : true
            })
            toast.dismiss()
            toast.success("account is verified", { id : toastLogin})
            router.push('/')
        } catch (error) {
            onError(error, toastLogin)
        }
    }

    async function VerifyUser() {
        try {
            //throw new Error("Telah terjadi error")
            await axios.get(apiVerify, {
                withCredentials : true
            })
            router.push('/')
        } catch (error) {
            //console.log(er)
        }
    }

    useEffect(() => {
        VerifyUser()
    }, [])
    return (
        <form className="space-y-4" onSubmit={LoginSubmit}>
            {/* Email */}
            <div className="border-primary mb-4 flex items-center rounded-2xl border-2 p-3">
                <img
                    src="/images/email-icon.png"
                    alt="Email Icon"
                    className="text-primary mr-3 h-5 w-5"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border-none focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {/* Password */}
            <div className="border-primary mb-4 flex items-center rounded-2xl border-2 p-3">
                <img
                    src="/images/password-icon.png"
                    alt="Password Icon"
                    className="text-primary mr-3 h-5 w-5"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border-none focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {/* Submit */}
            <button className="bg-primary mb-6 w-full rounded-2xl px-6 py-3 font-bold text-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
                Log In
            </button>
        </form>
    )
}

export default SigninForm