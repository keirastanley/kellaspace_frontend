/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { FilterByTypeCheckboxGroup } from "../components/FilterByTypeCheckboxGroup";
import {
  MediaType,
  Recommendation,
  RecommendationWidgetVariant,
} from "../interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode } from "swiper/modules";
import { RecommendationWidget } from "../components/RecommendationWidget/RecommendationWidget";
import SwiperCore from "swiper";
import { useRecommendations } from "../providers/RecommendationsProvider";

export const RecommendationsVertical = ({
  recommendations,
}: {
  recommendations: Recommendation[];
}) => {
  const [selectedFilters, setSelectedFilters] = useState<MediaType[]>([]);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();

  const mediaTypes = Array.from(
    new Set(recommendations.map(({ mediaType }) => mediaType))
  );

  const { setSelectedRecommendation } = useRecommendations();

  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      {mediaTypes.length > 1 && (
        <FilterByTypeCheckboxGroup
          mediaTypes={mediaTypes}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      )}
      <Swiper
        direction="vertical"
        slidesPerView="auto"
        spaceBetween={5}
        watchOverflow={true}
        onSwiper={setSwiperInstance}
        mousewheel={{ sensitivity: 1 }}
        freeMode={true}
        modules={[Mousewheel, FreeMode]}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {recommendations.map((recommendation, i) => (
          <SwiperSlide
            key={recommendation.title + recommendation.dateAdded}
            style={{
              height: i === recommendations.length - 1 ? "110px" : "100px",
              width: "100%",
            }}
          >
            <RecommendationWidget
              recommendation={recommendation}
              variant={RecommendationWidgetVariant.Expand}
              onClick={() => {
                swiperInstance?.slideTo(i);
                setSelectedRecommendation(recommendation);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
