import Footer from "../components/Footer";

const About = () => {
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
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8  ">
            <div className="relative z-10 pt-8 mt-10 space-y-20 max-w-7xl w-full text-center">
              {/* What is PGO */}
              <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-white text-center mb-12 tracking-widest">
                  What is PGO?
                </h1>
                <p className="text-md sm:text-lg lg:text-xl inset-0 border-gray-300 bg-white/90 rounded-lg border p-5 text-gray-700 leading-relaxed font-light">
                  We understand how difficult it is to manage records, track
                  vacancies, and maintain up-to-date hostel details using
                  spreadsheets or paperwork. That's why we built PGO — a modern
                  solution to help hostel owners stay in control and make
                  data-driven decisions with ease.
                </p>
              </div>

              {/* What We Offer */}
              <div>
                <h2 className="text-3xl font-bold text-white text-center mb-12 tracking-widest">
                  What We Offer ?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
                  {[
                    {
                      icon: "🏢",
                      title: "Easy Hostel Registration",
                      text: "Add details like the number of rooms, floors, pricing, and availability — all from a single dashboard.",
                    },
                    {
                      icon: "🔐",
                      title: "Secure Verification Process",
                      text: "Your submission is reviewed by our admin team to ensure genuine listings and a trusted platform for everyone.",
                    },
                    {
                      icon: "📊",
                      title: "Smart Dashboard Access",
                      text: "Get real-time control over room vacancies, update hostel details anytime, and keep everything organized effortlessly.",
                    },
                    {
                      icon: "⚡",
                      title: "Smooth User Experience",
                      text: "No more clutter. Just clean visuals, smooth navigation, and powerful tools that make management feel easy.",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col w-70  items-start  gap-3 p-9 lg:p-8 rounded-2xl border border-gray-300 bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                      <div className="text-4xl lg:text-5xl mb-2">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-blue-600 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mission & Vision Section */}
              <div>
                <h2 className="text-3xl font-bold text-white text-center mb-12 tracking-widest">
                  Our Mission & Vision
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                  {/* Mission */}
                  <div className="p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-300 bg-white/95 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <div className="flex flex-col items-start gap-6">
                      <div className="text-5xl lg:text-6xl">🎯</div>
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-blue-600 mb-4">
                          Our Mission
                        </h3>
                        <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                          To empower hostel owners with smart tools that
                          eliminate stress and boost efficiency, creating a new
                          standard in hostel management.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Vision */}
                  <div className="p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-300 bg-white/95 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <div className="flex flex-col items-start gap-6">
                      <div className="text-5xl lg:text-6xl">👁️</div>
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-blue-600 mb-4">
                          Our Vision
                        </h3>
                        <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                          To become the most trusted digital platform for hostel
                          operations by combining innovation, simplicity, and
                          reliability.
                        </p>
                      </div>
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

export default About;
