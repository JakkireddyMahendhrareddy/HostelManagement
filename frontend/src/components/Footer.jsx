import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Logo and Description */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-blue-600 tracking-wide">
              logo
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              One shot Visualization Platform to manage your hostel
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-blue-600">Quick Links</h3>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm inline-block"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm inline-block"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm inline-block"
                >
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-blue-600">Contact Us</h3>
            <div className="space-y-2">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaPhone className="text-blue-500 text-xs flex-shrink-0" />
                  <span className="text-gray-600 text-sm">
                    Call Now: +91 xxxxx xxxxx
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-blue-500 text-xs flex-shrink-0" />
                  <span className="text-gray-600 text-sm break-all">
                    Email: xyz@example.com
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-blue-500 text-xs flex-shrink-0" />
                  <span className="text-gray-600 text-sm">
                    Address: 123 Main Street, Hyderabad, Telangana - 500001
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="text-blue-500 text-xs flex-shrink-0" />
                  <span className="text-gray-600 text-sm">
                    Timings: Mon - Sat, 9:00 AM to 7:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media and Follow Us */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <h3 className="text-sm font-medium text-blue-600">Follow Us:</h3>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300 group"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-white text-xs group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300 group"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-white text-xs group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-white text-xs group-hover:scale-110 transition-transform duration-200" />
                </a>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-center text-gray-500 text-xs">
              © 2025 PGO Hostel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
