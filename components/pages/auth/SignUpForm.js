'use client'
import React from 'react'

function SignUpForm() {
    return (
        <form className="space-y-4">
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