import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { backendUrl, toastNoficationSettings } from "../utils/utils.js";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const checkFormValidations = () => {
    const errors = [];
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!]).{8,}$/;
    const mobileRegex = /^\d{10}$/;

    if (!passwordRegex.test(password)) {
      errors.push(
        "Password must include at least one uppercase, one lowercase, one number, and one special character (@, #, $, !)."
      );
    }
    if (!mobileRegex.test(mobileNumber)) {
      errors.push("Mobile number must be exactly 10 digits.");
    }

    return errors;
  };

  const onHandleLoginBtn = () => {
    navigate("/auth/login");
  };

  const onHandleFormSubmit = (e) => {
    e.preventDefault();
    const errors = checkFormValidations();

    if (errors.length > 0) {
      setErrorMessage(errors.join("\n"));
      return;
    }

    const newUserCredentials = {
      name: fullName,
      email,
      password,
      mobileNumber,
    };

    registerUser(newUserCredentials);
    setErrorMessage("");
    setFullName("");
    setEmail("");
    setPassword("");
    setMobileNumber("");
  };

  const registerUser = async (userCredentials) => {
    try {
      const apiUrl = `${backendUrl}/api/auth/register`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredentials),
      });

      const data = await response.json();
      if (response.ok) {
        const { message, jwtToken } = data;
        toast.success(message, toastNoficationSettings);
        Cookies.set("jwtToken", jwtToken, { expires: 0.25 });
        navigate("/dashboard");
      } else {
        toast.error(data.message, toastNoficationSettings);
      }
    } catch (error) {
      toast.warning("Something went wrong", toastNoficationSettings);
    }
  };

  const token = Cookies.get("jwtToken");
  if (token !== undefined) return <Navigate to="/dashboard" replace />;

  return (
    <main className="relative w-full overflow-x-hidden">
      <section
        className="relative px-4 md:px-8 lg:px-16 xl:px-32 w-full min-h-screen py-16 bg-fixed bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(135deg,rgb(235, 237, 246) 0%, rgb(1, 15, 20) 100%), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80')",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-black/10 z-0"></div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl overflow-hidden p-8 relative z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl"></div>

          <div className="w-full max-w-2xl p-2 relative z-10">
            <div className="mb-4 text-start">
              <Link
                to="/"
                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm"
              >
                ← Back
              </Link>
              <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 mt-4">
                Create Account
              </h1>
            </div>

            <form onSubmit={onHandleFormSubmit} className="space-y-6">
              {/* Row 1: Full Name + Email */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="full-name"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="Enter your name"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Row 2: Mobile + Password */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="mobile"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      setErrorMessage("");
                    }}
                    maxLength="10"
                    placeholder="Enter 10-digit mobile number"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  />
                </div>

                <div className="flex-1 relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="Enter your password"
                    required
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  />
                  <button
                    type="button"
                    className="absolute cursor-pointer right-5 mt-3 text-gray-500 hover:text-indigo-600 transition-all duration-300 transform hover:scale-110"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <IoEyeOutline size={20} />
                    ) : (
                      <IoEyeOffOutline size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <p className="text-red-600 font-medium text-sm -mt-2">
                  * {errorMessage}
                </p>
              )}

              {/* Register Button */}
              <button
                type="submit"
                className="w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg shadow-md"
              >
                Register
              </button>

              {/* Continue with Divider */}
              <div className="flex items-center my-6">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500 text-sm font-medium">
                  or continue with
                </span>
                <hr className="flex-grow border-t border-gray-300" />
              </div>

              {/* Login Redirect */}
              <button
                type="button"
                onClick={onHandleLoginBtn}
                className="w-full cursor-pointer border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Registration;
