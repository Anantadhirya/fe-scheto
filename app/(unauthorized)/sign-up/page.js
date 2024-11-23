export default function SignUp() {
  return (
    <div className="bg-primary flex h-screen items-stretch justify-center overflow-hidden">
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
          <h2 className="text-primary mb-6 text-center text-3xl font-bold">
            Create Account
          </h2>
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
          <p className="mt-6 text-center text-sm text-black">
            Already have an account?{" "}
            <a href="/sign-in" className="text-primary font-bold underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
