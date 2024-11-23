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
          <form className="space-y-4">
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
              />
            </div>

            {/* Submit */}
            <button className="bg-primary mb-6 w-full rounded-2xl px-6 py-3 font-bold text-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
              Log In
            </button>
          </form>
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
