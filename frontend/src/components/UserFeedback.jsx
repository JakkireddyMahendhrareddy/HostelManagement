// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import UserFeedbackCard from "./UserFeedbackCard";
// import { useEffect } from "react";
// import { useState } from "react";

// const UserFeedback = () => {
//   const [customerFeedback, setCustomerFeedback] = useState([]);
//   const customerFeedbackSliderSettings = {
//     dots: false,
//     infinite: true,
//     speed: 900,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     swipeToSlide: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//     pauseOnHover: false,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: true,
//           speed: 1000,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           speed: 800,
//         },
//       },
//     ],
//   };

//   const fetchCustomerFeedback = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/review/view");
//       if (response.ok) {
//         const data = await response.json();
//         const popularFeedback = data.filter((feedback) => feedback.rating >= 4);
//         setCustomerFeedback(popularFeedback);
//       } else {
//         return (
//           <h1 className="text-center font-semibold tetx-gray-600">
//             No Reviews to show
//           </h1>
//         );
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchCustomerFeedback();
//   }, []);

//   return (
//     <section className="px-6 md:px-20 xl:px-32 w-full mb-16 min-h-[60vh] max-w-screen-xl mx-auto">
//       <h2 className="text-2xl font-semibold text-blue-500 text-center mb-12 tracking-widest">
//         Testimonials
//       </h2>

//       <div className="w-full overflow-x-hidden mt-2 md:mt-4 bg-white">
//         <Slider {...customerFeedbackSliderSettings}>
//           {customerFeedback.map((feedback) => (
//             <div key={feedback._id} className="!flex justify-center px-3">
//               <UserFeedbackCard feedbackInfo={feedback} />
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </section>
//   );
// };

// export default UserFeedback;

// <section
//   className="relative px-6 md:px-20 xl:px-32 w-full mb-0 min-h-[60vh] max-w-screen-xl mx-auto py-16 bg-cover bg-center bg-no-repeat rounded-xl shadow-lg"
//   // style={{
//   //   backgroundImage:
//   //     "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')",
//   // }}
// >
//   {/* Overlay for readability */}
//   <div className="absolute inset-0 bg-white/80 dark:bg-black/60 backdrop-blur-sm z-0 rounded-xl"></div>

//   {/* Content */}
//   <div className="relative z-10">
//     <h2 className="text-3xl font-bold text-blue-600 text-center mb-12 tracking-widest">
//       Testimonials
//     </h2>

//     <div className="w-full overflow-x-hidden mt-2 md:mt-4">
//       <Slider {...customerFeedbackSliderSettings}>
//         {customerFeedback.map((feedback) => (
//           <div key={feedback._id} className="!flex justify-center px-3">
//             <UserFeedbackCard feedbackInfo={feedback} />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   </div>
// </section>

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserFeedbackCard from "./UserFeedbackCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserFeedback = () => {
  const [customerFeedback, setCustomerFeedback] = useState([]);

  const customerFeedbackSliderSettings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          speed: 1000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          speed: 800,
        },
      },
    ],
  };

  // Dummy feedback data for testing
  const dummyFeedbackData = [
    {
      _id: "1",
      name: "Aarav Mehta",
      rating: 5,
      comment:
        "Managing hostel records has never been easier. Loved the simplicity and automation!",
      designation: "Warden, Greenview Hostel",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      _id: "2",
      name: "Sneha Patel",
      rating: 4,
      comment:
        "The dashboard is clean and user-friendly. It really helped reduce manual work.",
      designation: "Assistant Admin",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      _id: "3",
      name: "Ravi Kumar",
      rating: 5,
      comment: "Highly recommended! Smooth performance and great support team.",
      designation: "Hostel In-Charge",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      _id: "4",
      name: "Priya Sharma",
      rating: 4,
      comment:
        "Simple yet powerful. Helped streamline our room allotment process significantly.",
      designation: "Admin Officer",
      image: "https://i.pravatar.cc/150?img=47",
    },
    {
      _id: "5",
      name: "Manoj Reddy",
      rating: 5,
      comment:
        "I was surprised how much time we saved with this system. Works like magic!",
      designation: "Superintendent",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
  ];

  useEffect(() => {
    // Set dummy data directly
    setCustomerFeedback(dummyFeedbackData);
  }, []);

  return (
    <section className="px-6 md:px-20 xl:px-32 w-full mb-16 min-h-[60vh] max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-12 tracking-widest drop-shadow-lg">
        Testimonials
      </h2>

      <div className="w-full overflow-x-hidden mt-2 md:mt-4 bg-transparent/80  rounded-2xl p-6 shadow-2xl ">
        <Slider {...customerFeedbackSliderSettings}>
          {customerFeedback.map((feedback) => (
            <div key={feedback._id} className="!flex justify-center px-3">
              <UserFeedbackCard feedbackInfo={feedback} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default UserFeedback;
