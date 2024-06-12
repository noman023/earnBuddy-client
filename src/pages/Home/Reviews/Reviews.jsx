import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import ReviewCard from "./ReviewCard";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import SpinnerComponent from "../../../components/Spinner/Spinner";

export default function Reviews() {
  const axiosInstance = useAxiosInstance();

  const { data = [], isPending } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosInstance.get("reviews");
      return res.data;
    },
  });

  return (
    <div className="my-24">
      <div className="text-3xl md:text-4xl text-black text-center mb-10">
        <h1>
          T<span className="text-blue-500">e</span>stim
          <span className="text-blue-500">o</span>nial
        </h1>
      </div>

      <div className="">
        {isPending ? (
          <SpinnerComponent />
        ) : (
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination]}
          >
            {data.map((data, idx) => (
              <SwiperSlide key={idx}>
                <ReviewCard data={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
