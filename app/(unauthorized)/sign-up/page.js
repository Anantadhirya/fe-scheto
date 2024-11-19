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
      <div className="flex-1 bg-white rounded-tl-[30px]  rounded-bl-[30px] rounded-tr-[0px] shadow-lg flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">
            Create Account
          </h2>
          <form className="space-y-4">
            {/* First Name */}
            <div className="flex items-center border-2 border-primary rounded-2xl p-3">
              <img
                src="/images/user-icon.png"
                alt="User Icon"
                className="h-5 w-5 mr-3 text-primary"
              />
              <input
                type="text"
                placeholder="First name"
                className="w-full border-none focus:outline-none"
              />
            </div>

            {/* Last Name */}
            <div className="flex items-center border-2 border-primary rounded-2xl p-3">
              <img
                src="/images/user-icon.png"
                alt="User Icon"
                className="h-5 w-5 mr-3 text-primary"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full border-none focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex items-center border-2 border-primary rounded-2xl p-3">
              <img
                src="/images/email-icon.png"
                alt="Email Icon"
                className="h-5 w-5 mr-3 text-primary"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border-none focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex items-center border-2 border-primary rounded-2xl p-3">
              <img
                src="/images/password-icon.png"
                alt="Password Icon"
                className="h-5 w-5 mr-3 text-primary"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border-none focus:outline-none"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center border-2 border-primary rounded-2xl p-3">
              <img
                src="/images/password-icon.png"
                alt="Password Icon"
                className="h-5 w-5 mr-3 text-primary"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border-none focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button className="bg-primary text-white w-full py-3 px-6 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              Create
            </button>
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
