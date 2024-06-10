import paymentImg from "../../../assets/slider/payment.jpg";
import workImg from "../../../assets/slider/work.jpg";
import manageWorkImg from "../../../assets/slider/manage-work.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import SliderItem from "./SliderItem";

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
          <SliderItem
            img={workImg}
            heading={"Earn Coins by Completing Tasks"}
            description={"Join our platform and start earning today!"}
          />
        </SwiperSlide>

        <SwiperSlide>
          <SliderItem
            img={manageWorkImg}
            heading={"Create and Manage Tasks"}
            description={"Easily create tasks and manage submissions!"}
          />
        </SwiperSlide>

        <SwiperSlide>
          <SliderItem
            img={paymentImg}
            heading={"Secure Payments"}
            description={"Get paid securely through our platform!"}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
