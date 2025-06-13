import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  backendUrl,
  loginSuccessToastNotificationSettings,
  toastNoficationSettings,
} from "../utils/utils";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import validator from "validator";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onHandleFormSubmit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setErrorMessage("Invalid Email");
      return;
    }
    const userCredentials = { email, password };
    loginUser(userCredentials);
    setErrorMessage("");
    setEmail("");
    setPassword("");
  };

  const loginUser = async (userCredentials) => {
    try {
      const apiUrl = `${backendUrl}/api/auth/login`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredentials),
      });
      if (response.ok) {
        const { message, jwtToken } = await response.json();
        console.log(jwtToken);
        Cookies.set("jwtToken", jwtToken, { expires: 0.25 }); // 6 hours
        toast.success(message, loginSuccessToastNotificationSettings);
        navigate("/dashboard");
      } else {
        const { message } = await response.json();
        toast.error(message, toastNoficationSettings);
      }
    } catch (error) {
      toast.warning("Something went wrong", toastNoficationSettings);
    }
  };

  const token = Cookies.get("jwtToken");
  if (token) return <Navigate to="/dashboard" replace />;

  return (
    <main className="relative w-full overflow-x-hidden">
      <section
        className="relative px-4 md:px-8 lg:px-16 xl:px-32 w-full min-h-screen py-16 bg-fixed bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(135deg,rgb(229, 231, 236) 0%,rgb(1, 15, 20) 100%), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80')",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-black/10 z-0"></div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full max-w-md mx-auto bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl overflow-hidden p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl"></div>

          <div className="w-full max-w-sm p-2 relative z-10">
            <div className="mb-4 text-start">
              <Link
                to="/"
                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm"
              >
                ← Back
              </Link>
              <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 mt-4">
                Login
              </h1>
            </div>

            <form onSubmit={onHandleFormSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your Password"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300"
                  />
                  <button
                    type="button"
                    className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {!showPassword ? (
                      <IoEyeOffOutline size={20} />
                    ) : (
                      <IoEyeOutline size={20} />
                    )}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <p className="text-red-600 font-medium text-sm -mt-2">
                  * {errorMessage}
                </p>
              )}

              <button
                type="submit"
                className="w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg shadow-md"
              >
                Login
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Don&apos;t have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-indigo-600 underline hover:text-indigo-800 transition-colors duration-300 font-medium"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
