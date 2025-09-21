/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { RecommendationWidget } from "../components/RecommendationWidget/RecommendationWidget";
import { Recommendation } from "../interfaces/recommendations";
import { Swiper, SwiperSlide } from "swiper/react";
import { RecommendationWidgetVariant } from "../interfaces/recommendationWidget";
import SwiperCore from "swiper";
import { useState } from "react";

export const NewRecommendations = ({
  recentRecommendations,
  setSelectedRecommendation,
}: {
  recentRecommendations: Recommendation[];
  setSelectedRecommendation: React.Dispatch<
    React.SetStateAction<Recommendation | undefined>
  >;
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        h2 {
          font-size: 14px;
        }
      `}
    >
      <h2>✨ New</h2>
      <Swiper
        spaceBetween={5}
        slidesPerView="auto"
        onSwiper={setSwiperInstance}
      >
        {recentRecommendations.map((recommendation, i) => (
          <SwiperSlide key={recommendation.title + recommendation.dateAdded}>
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
