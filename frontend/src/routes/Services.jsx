import React from "react";
import {
  Building2,
  Shield,
  Wifi,
  Car,
  Utensils,
  Camera,
  Clock,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Services = () => {
  const services = [
    {
      icon: Building2,
      title: "Furnished Rooms",
      description:
        "Fully furnished private and shared rooms with modern amenities and comfortable bedding for student convenience.",
    },
    {
      icon: Shield,
      title: "24/7 Security",
      description:
        "Round-the-clock security with CCTV monitoring and secure access control for complete peace of mind.",
    },

    {
      icon: Wifi,
      title: "High-Speed WiFi",
      description:
        "Unlimited high-speed internet connectivity throughout the hostel premises for seamless online activities.",
    },
    {
      icon: Car,
      title: "Parking Facility",
      description:
        "Secure parking spaces for bikes and cars with 24/7 surveillance and easy access.",
    },
    {
      icon: Utensils,
      title: "Mess & Kitchen",
      description:
        "Hygienic mess facility with nutritious meals and shared kitchen for self-cooking options.",
    },

    {
      icon: Camera,
      title: "CCTV Monitoring",
      description:
        "Complete CCTV coverage in common areas ensuring safety and security of all residents.",
    },
    {
      icon: Clock,
      title: "Flexible Timings",
      description:
        "Reasonable entry and exit timings with emergency access provisions for urgent situations.",
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description:
        "Round-the-clock maintenance and support services for any issues or emergency situations.",
    },
  ];

  return (
    <>
      <main className="relative w-full overflow-x-hidden">
        <section
          className="relative px-4 md:px-8 lg:px-16 xl:px-32 w-full min-h-screen py-16 bg-fixed bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 z-0"></div>

          <div className="relative z-10 pt-8 mt-10 space-y-16">
            {/* Services Header */}
            <div className="text-center max-w-5xl mx-auto">
              <h1 className="text-3xl font-bold text-white text-center mb-12 tracking-widest">
                Our Services
              </h1>
              <p className="text-md sm:text-lg lg:text-xl inset-0 border-white/40 bg-white/90 rounded-lg border-2 p-4 text-gray-700 leading-relaxed font-light">
                Comprehensive hostel management solutions designed for student
                comfort and administrative efficiency. Experience premium
                facilities and services tailored for modern student living.
              </p>
            </div>

            {/* Services Grid */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start gap-4 p-6 lg:p-8 rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-blue-600 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="max-w-4xl mx-auto">
              <div className="p-8 lg:p-12 rounded-2xl shadow-xl border border-gray-200 bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <div className="text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-6">
                    Ready to Get Started?
                  </h2>
                  <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                    Experience the best hostel management system with all these
                    amazing services included. Join thousands of satisfied
                    students and hostel owners.
                  </p>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 text-lg">
                    <Link to="/contact">Contact Us Today</Link>
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Info Section */}
            <div>
              <h2 className="text-3xl font-bold text-white text-center mb-12 tracking-widest">
                Why Choose Us?
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Quality */}
                <div className="p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-200 bg-white/95 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="flex flex-col items-center text-center gap-6">
                    <div className="text-5xl lg:text-6xl">⭐</div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-blue-600 mb-4">
                        Premium Quality
                      </h3>
                      <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                        We maintain the highest standards in accommodation,
                        facilities, and services to ensure your comfort.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Affordability */}
                <div className="p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-200 bg-white/95 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="flex flex-col items-center text-center gap-6">
                    <div className="text-5xl lg:text-6xl">💰</div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-blue-600 mb-4">
                        Affordable Pricing
                      </h3>
                      <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                        Competitive pricing with flexible payment options and no
                        hidden charges for transparency.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Community */}
                <div className="p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-200 bg-white/95 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="flex flex-col items-center text-center gap-6">
                    <div className="text-5xl lg:text-6xl">🤝</div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-blue-600 mb-4">
                        Strong Community
                      </h3>
                      <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                        Build lasting friendships and connections in our
                        vibrant, diverse student community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Services;
