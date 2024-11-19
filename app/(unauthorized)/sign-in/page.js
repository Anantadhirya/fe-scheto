export default function SignIn() {
  return (
    <div className="flex h-screen items-stretch justify-center bg-primary overflow-hidden">
      {/* Left Section */}
      <div className="flex-1 bg-purple-500 text-white flex flex-col justify-center items-start p-10">
        {/* Pesawat dan Garis */}
        <div className="flex items-left ">
          <img
            src="/images/paper-plane.png"
            alt="Paper Plane"
            style={{ width: "3000px", height: "175px" }} 
          />
        </div>

        {/* Tulisan & Gambar */}
        <div className="flex flex-col items-start">
          <p className="text-3xl text-center font-bold text-white leading-relaxed mb-4">
            Say Goodbye to Endless Message Threads and Schedule Clashes
          </p>
          <img
            src="/images/working-illustration.png"
            alt="Working Illustration"
            className="w-3/4 max-w-md mb-18"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-white rounded-tl-[30px] rounded-bl-[30px] shadow-lg flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-sm">
          <h2 className="text-5xl font-bold text-primary mb-2 text-center">
            Welcome Back
          </h2>
          <p className="text-center text-primary mb-8">
            Sign in to continue using Scheto
          </p>
          <form className="space-y-4">
            {/* Email */}
            <div className="flex items-center border-2 border-primary rounded-2xl p-3 mb-4">
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
            <div className="flex items-center border-2 border-primary rounded-2xl p-3 mb-4">
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

            {/* Submit */}
            <button className="bg-primary text-white w-full mb-6 py-3 px-6 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              Log In
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-black">
            Doesn't have an account?{' '}
            <a href="/sign-up" className="text-primary font-bold underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
