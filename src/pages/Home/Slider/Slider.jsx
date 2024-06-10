import paymentImg from "../../../assets/slider/payment.jpg";
import workImg from "../../../assets/slider/work.jpg";
import manageWorkImg from "../../../assets/slider/manage-work.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function Slider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative">
            <img
              src={workImg}
              className="w-full h-[400px]"
              alt="Slider Image 1"
            />

            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center p-8">
                <h2 className="text-3xl font-bold mb-4 text-blue-600">
                  Earn Coins by Completing Tasks
                </h2>
                <p className="text-lg">
                  Join our platform and start earning today!
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              src={manageWorkImg}
              className="w-full h-[400px]"
              alt="Slider Image 1"
            />

            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center p-8">
                <h2 className="text-3xl font-bold mb-4 text-blue-600">
                  Create and Manage Tasks
                </h2>

                <p className="text-lg">
                  Easily create tasks and manage submissions.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              src={paymentImg}
              className="w-full h-[400px]"
              alt="Slider Image 1"
            />

            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center p-8">
                <h2 className="text-3xl font-bold mb-4 text-blue-600">
                  Secure Payments
                </h2>
                <p className="text-lg">
                  Get paid securely through our platform.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
