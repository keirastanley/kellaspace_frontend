/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { RecommendationWidget } from "../components/RecommendationWidget/RecommendationWidget";
import { Recommendation } from "../interfaces/recommendations";
import { Swiper, SwiperSlide } from "swiper/react";
import { RecommendationWidgetVariant } from "../interfaces/recommendationWidget";
import "./slider-styles.css";

export const NewRecommendations = ({
  recentRecommendations,
}: {
  recentRecommendations: Recommendation[];
}) => {
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
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {recentRecommendations.map((recommendation) => (
          <SwiperSlide key={recommendation.title + recommendation.dateAdded}>
            <RecommendationWidget
              recommendation={recommendation}
              variant={RecommendationWidgetVariant.Compact}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
