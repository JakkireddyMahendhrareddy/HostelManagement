const UserFeedbackCard = ({ feedbackInfo }) => {
  console.log(feedbackInfo);
  return (
    <li className="list-none w-full md:w-[360px] h-[240px] flex flex-col bg-white/80 items-center p-6 mx-auto rounded-xl border-2 border-gray-100 shadow-lg my-4">
      {/* Quote Icon */}
      <div className="flex-shrink-0 h-14 w-14 rounded-full overflow-hidden mb-4">
        <img
          src={feedbackInfo?.image} // default fallback
          alt={feedbackInfo?.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Testimonial Text */}
      <p className="text-[16px] md:text-[18px] font-medium text-gray-600 text-center leading-relaxed mb-3">
        “ {feedbackInfo?.comment} ”
      </p>

      {/* Name & Designation */}
      <div className="text-right w-full mt-auto">
        <h3 className="text-sm font-semibold text-gray-700">
          - {feedbackInfo?.name}
        </h3>
        <p className="text-xs text-gray-500">{feedbackInfo?.designation}</p>
      </div>
    </li>
  );
};

export default UserFeedbackCard;
