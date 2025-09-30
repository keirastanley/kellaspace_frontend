/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { RecommendationWidget } from "../components/RecommendationWidget/RecommendationWidget";
import { Swiper, SwiperSlide } from "swiper/react";
import { RecommendationWidgetVariant } from "../interfaces/recommendationWidget";
import SwiperCore from "swiper";
import { useState } from "react";
import { Mousewheel } from "swiper/modules";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { sortRecommendationsByDate } from "../utils/utils";

export const NewRecommendations = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const { recommendations, setSelectedRecommendation } = useRecommendations();

  const recentRecommendations = sortRecommendationsByDate(
    recommendations
  ).slice(0, 5);

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
            key={recommendation.title + recommendation.dateAdded}
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
