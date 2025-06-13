import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-900/5">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-2 lg:py-3">
        {/* Logo */}
        <Link to="/" className="group">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative text-2xl sm:text-3xl lg:text-4xl p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg transform group-hover:scale-110 transition-all duration-300">
                🏨
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl lg:text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                HostelHub
              </span>
              <div className="text-xs text-gray-500 font-medium -mt-1">
                Premium Stays
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2  rounded-2xl p-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative px-6 py-3 text-sm xl:text-base font-semibold tracking-wide transition-all duration-300 rounded-xl ${
                isActive
                  ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25"
                  : "text-gray-700 hover:text-blue-600 hover:bg-white/70"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative px-6 py-3 text-sm xl:text-base font-semibold tracking-wide transition-all duration-300 rounded-xl ${
                isActive
                  ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25"
                  : "text-gray-700 hover:text-blue-600 hover:bg-white/70"
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              `relative px-6 py-3 text-sm xl:text-base font-semibold tracking-wide transition-all duration-300 rounded-xl ${
                isActive
                  ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25"
                  : "text-gray-700 hover:text-blue-600 hover:bg-white/70"
              }`
            }
          >
            Services
          </NavLink>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            to="/auth/login"
            className="relative px-5 py-2.5 text-sm xl:text-base font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-xl hover:bg-gray-50"
          >
            Sign In
          </Link>
          <Link
            to="/"
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-3 rounded-2xl text-sm xl:text-base font-bold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 transform"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Let's Talk</span>
              <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden relative p-3 -mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <div className="relative w-6 h-6">
            <span
              className={`absolute block w-6 h-0.5 bg-gray-800 rounded-full transform transition-all duration-300 ${
                mobileOpen ? "rotate-45 top-3" : "top-1"
              }`}
            ></span>
            <span
              className={`absolute block w-6 h-0.5 bg-gray-800 rounded-full top-3 transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
              }`}
            ></span>
            <span
              className={`absolute block w-6 h-0.5 bg-gray-800 rounded-full transform transition-all duration-300 ${
                mobileOpen ? "-rotate-45 top-3" : "top-5"
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200/50 mx-4 mb-4 rounded-2xl shadow-xl shadow-gray-900/10 p-6">
          {/* Mobile Navigation Links */}
          <div className="space-y-2 mb-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-4 py-4 px-5 rounded-xl text-base font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              <span className="text-xl">🏠</span>
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center space-x-4 py-4 px-5 rounded-xl text-base font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              <span className="text-xl">ℹ️</span>
              <span>About</span>
            </NavLink>

            <NavLink
              to="/services"
              className={({ isActive }) =>
                `flex items-center space-x-4 py-4 px-5 rounded-xl text-base font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              <span className="text-xl">⚙️</span>
              <span>Services</span>
            </NavLink>
          </div>

          {/* Mobile CTA Buttons */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <Link
              to="/auth/login"
              className="flex items-center justify-center w-full py-4 px-6 text-center border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
              onClick={() => setMobileOpen(false)}
            >
              <span className="mr-2">👤</span>
              Sign In
            </Link>

            <Link
              to="/"
              className="flex items-center justify-center w-full py-4 px-6 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => setMobileOpen(false)}
            >
              <span className="mr-2">💬</span>
              Let's Talk
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
