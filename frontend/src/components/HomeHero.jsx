import { Link, useNavigate } from "react-router-dom";

const HomeHero = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 sm:px-10 lg:px-28 w-full py-16 md:py-24 lg:py-32 min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-6 text-center items-center max-w-xl w-full text-gray-700 bg-white/90 border border-gray-300 rounded-xl p-8 shadow-xl backdrop-blur-sm">
        {/* Heading */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-normal leading-snug drop-shadow-md">
          Tired of Hostel Hassles?{" "}
          <span className="block text-2xl sm:text-3xl md:text-4xl font-semibold mt-1 text-blue-600">
            Let Tech Take Over 🧠⚡
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg font-medium italic drop-shadow text-gray-700">
          No more hostel headaches. Just smooth control.
        </p>

        <p className="text-base sm:text-lg text-gray-700">
          Say goodbye to boring{" "}
          <span className="font-semibold line-through text-red-600">
            spreadsheets and messy records
          </span>
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button
            onClick={() => navigate("/auth/login")}
            className="cursor-pointer group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2.5 rounded-full text-sm xl:text-base font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
          >
            Get Started
          </button>

          <Link
            to="/about"
            className="cursor-pointer group relative overflow-hidden bg-gradient-to-l from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-full text-sm xl:text-base font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
