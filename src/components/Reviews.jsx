import { MoveLeft, MoveRight, LucideMessageSquareQuote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import { jobFinderReviews } from "../data/reviews";

import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
const Reviews = () => {
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="relative">
          <h1 className="text-2xl md:text-4xl max-w-xl text-center lg:text-start mx-auto font-bold text-gray-800">
            Review of People Who Have Found Jobs{" "}
          </h1>
          <div className="absolute hidden bottom-15 lg:flex gap-3 z-50">
            <button className="swiper-prev-btn bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-full">
              <MoveLeft />
            </button>

            <button className="swiper-next-btn bg-yellow-200 text-purple-800 flex justify-center items-center rounded-full w-10 h-10">
              <MoveRight />
            </button>
          </div>
        </div>
        <div className="col-span-2 relative px-5 pb-16">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            // pagination = {true}
            loop={true}
            navigation={{
              nextEl: ".swiper-next-btn",
              prevEl: ".swiper-prev-btn",
            }}
            // autoplay={{ delay: 4000 }}
            // speed={800}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
          >
            {jobFinderReviews.map((reviewer, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white border border-yellow-300 px-4 py-8 rounded-2xl h-70 space-y-5">
                  <div>
                    <LucideMessageSquareQuote
                      className="text-purple-800"
                      size={35}
                    />
                  </div>

                  <p className="font-medium">{reviewer.review}</p>

                  <div className="flex items-center gap-3">
                    <img
                      src={reviewer.img}
                      alt=""
                      className="w-15 h-15 object-cover rounded-full"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-medium">{reviewer.name}</h1>
                      <span className="text-sm font-medium text-purple-800">
                        {reviewer.role}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}{" "}
          </Swiper>
          <div className="absolute lg:hidden bottom-2 right-5 flex gap-3 z-50">
            <button className="swiper-prev-btn bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-full">
              <MoveLeft />
            </button>

            <button className="swiper-next-btn bg-purple-200 text-purple-800 flex justify-center items-center rounded-full w-10 h-10">
              <MoveRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;
