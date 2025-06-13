import { useState } from "react";
import { faqList } from "../utils/utils";
import FaqCard from "./FaqCard";

const Faq = () => {
  const [activeFaqId, setActiveFaqId] = useState("");

  return (
    <section className="px-6 sm:px-10 md:px-32 text-center w-full flex flex-col items-center min-h-[50vh] sm:min-h-[50vh] md:min-h-[70vh] mb-6 sm:mb-12 sm:py-0">
      <h1 className="mb-6 text-3xl font-bold tracking-widest text-white drop-shadow-lg">
        FAQs
      </h1>
      <p className="text-base sm:text-lg mb-6 text-white/90 drop-shadow font-medium">
        Everything You Need to Know to Manage Your Hostel
      </p>

      <div className="w-full   rounded-2xl p-6 sm:p-8 shadow-2xl">
        <ul className="w-full flex flex-col items-center gap-y-4">
          {faqList.map((eachFaq) => (
            <FaqCard
              key={eachFaq.id}
              faqInfo={eachFaq}
              activeFaqId={activeFaqId}
              setActiveFaqId={setActiveFaqId}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Faq;
