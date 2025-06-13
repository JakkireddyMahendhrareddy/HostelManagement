import HomeHero from "../components/HomeHero";
// import { FaCheck } from "react-icons/fa6";
// import { Link } from "react-router-dom";
import UserFeedback from "../components/UserFeedback";
import Faq from "../components/Faq";
import { SiGoogleforms } from "react-icons/si";
import { MdVerifiedUser } from "react-icons/md";
import { RiBuildingLine } from "react-icons/ri";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <>
      <main className="relative w-full overflow-x-hidden">
        {/* Hero Section */}
        <section
          className="relative px-4 md:px-32 w-full min-h-screen py-16 bg-fixed bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 z-0"></div>

          <div className="relative z-10 max-w-screen-xl mx-auto">
            <HomeHero />

            {/* How It Works */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-white text-center mb-12 tracking-widest">
                How It Works?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="bg-white/90 border border-gray-300 shadow-xl rounded-xl p-6 flex flex-col items-center text-center gap-y-4 hover:scale-105 transition-all duration-300 ease-in-out">
                  <SiGoogleforms className="text-5xl text-blue-500" />
                  <h3 className="text-xl font-semibold text-blue-600">
                    Register as Owner
                  </h3>
                  <p className="text-sm text-gray-700">
                    Sign up and add your hostel details like number of rooms,
                    floors, vacancy count, and pricing — all in one place.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-white/90 border border-gray-300 shadow-xl rounded-xl p-6 flex flex-col items-center text-center gap-y-4 hover:scale-105 transition-all duration-300 ease-in-out">
                  <MdVerifiedUser className="text-5xl text-blue-500" />
                  <h3 className="text-xl font-semibold text-blue-600">
                    Get Verified
                  </h3>
                  <p className="text-sm text-gray-700">
                    Our admin team reviews your submission and verifies your
                    identity for a secure and trusted listing experience.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-white/90 border border-gray-300 shadow-xl rounded-xl p-6 flex flex-col items-center text-center gap-y-4 hover:scale-105 transition-all duration-300 ease-in-out">
                  <RiBuildingLine className="text-5xl text-blue-500" />
                  <h3 className="text-xl font-semibold text-blue-600">
                    Manage Your Hostel
                  </h3>
                  <p className="text-sm text-gray-700">
                    Once verified, access your personal dashboard to update
                    hostel info and manage room vacancies in real time.
                  </p>
                </div>
              </div>
            </div>

            {/* Feedback */}
            <div className="mt-20">
              <UserFeedback />
            </div>

            {/* FAQ */}
            <div className="mt-16">
              <Faq />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
