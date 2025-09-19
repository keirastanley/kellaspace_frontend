/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { RecommendationWidget } from "../components/RecommendationWidget/RecommendationWidget";
import { Recommendation } from "../interfaces/recommendations";
import { Swiper, SwiperSlide } from "swiper/react";
import { RecommendationWidgetVariant } from "../interfaces/recommendationWidget";
import "./slider-styles.css";
import { useState } from "react";

export const NewRecommendations = ({
  recentRecommendations,
}: {
  recentRecommendations: Recommendation[];
}) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      <h2>✨ New</h2>
      <Swiper
        spaceBetween={5}
        slidesPerView="auto"
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        onProgress={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {!isBeginning && <div className="shadow left-shadow" />}
        {recentRecommendations.map((recommendation) => (
          <SwiperSlide key={recommendation.title + recommendation.dateAdded}>
            <RecommendationWidget
              recommendation={recommendation}
              variant={RecommendationWidgetVariant.Compact}
            />
          </SwiperSlide>
        ))}
        {!isEnd && <div className="shadow right-shadow" />}
      </Swiper>
    </div>
  );
};
