/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { RecommendationWidget } from "../components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Recommendation, RecommendationWidgetVariant } from "../interfaces";
import SwiperCore from "swiper";
import { Mousewheel } from "swiper/modules";
import { useUserData } from "../providers";

export const NewRecommendations = ({
  recentRecommendations,
}: {
  recentRecommendations: Recommendation[];
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const { setSelectedRecommendation } = useUserData();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        h2 {
          font-size: 14px;
        }
        width: 100%;
      `}
    >
      <h2>✨ New</h2>
      <Swiper
        spaceBetween={5}
        slidesPerView="auto"
        onSwiper={setSwiperInstance}
        mousewheel={{ sensitivity: 1 }}
        modules={[Mousewheel]}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {recentRecommendations.map((recommendation, i) => (
          <SwiperSlide
            key={recommendation.id + "-recent"}
            style={{ width: "225px" }}
          >
            <RecommendationWidget
              recommendation={recommendation}
              variant={RecommendationWidgetVariant.Compact}
              onClick={(recommendation) => {
                setSelectedRecommendation(recommendation);
                swiperInstance?.slideTo(i);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
