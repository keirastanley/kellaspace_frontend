import { Mousewheel, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Recommendation, RecommendationWidgetVariant } from "../../interfaces";
import { RecommendationWidget } from "../widgets";
import { useState, useMemo } from "react";
import { SortingType } from "../../interfaces";
import { useActions, useUserData } from "../../providers";

export const RecommendationsVertical = ({
  recommendations,
  isEditing = false,
  variant = RecommendationWidgetVariant.Expand,
}: {
  recommendations: Recommendation[];
  isEditing?: boolean;
  variant?: RecommendationWidgetVariant;
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const { selectedFilters, selectedSorting } = useActions();

  const filteredRecommendations = useMemo(
    () =>
      recommendations
        ? recommendations.filter((recommendation) =>
            selectedFilters.length > 0
              ? selectedFilters.includes(recommendation.mediaType)
              : true
          )
        : undefined,
    [selectedFilters, recommendations]
  );

  const recommendationsToShow = useMemo(() => {
    const initialRecommendations = filteredRecommendations ?? recommendations;
    if (selectedSorting) {
      if (selectedSorting === SortingType.titleAscending) {
        return initialRecommendations.sort((a, b) =>
          a.title < b.title ? -1 : 1
        );
      }
      if (selectedSorting === SortingType.titleDescending) {
        return initialRecommendations.sort((a, b) =>
          a.title > b.title ? -1 : 1
        );
      }
      if (selectedSorting === SortingType.dateAddedAscending) {
        return initialRecommendations.sort((a, b) => {
          return new Date(a.dateAdded).getTime() <
            new Date(b.dateAdded).getTime()
            ? -1
            : 1;
        });
      }
      if (selectedSorting === SortingType.dateAddedDescending) {
        return initialRecommendations.sort((a, b) =>
          new Date(a.dateAdded).getTime() > new Date(b.dateAdded).getTime()
            ? -1
            : 1
        );
      }
    }
    return initialRecommendations;
  }, [selectedSorting, filteredRecommendations]);

  const { setSelectedRecommendation } = useUserData();

  return (
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
      {recommendationsToShow.map((recommendation, i) => (
        <SwiperSlide
          key={recommendation.id + "-vertical-slide"}
          style={{
            height: i === recommendationsToShow.length - 1 ? "110px" : "100px",
            width: "100%",
          }}
        >
          <RecommendationWidget
            recommendation={recommendation}
            variant={variant}
            onClick={() => {
              swiperInstance?.slideTo(i);
              setSelectedRecommendation(recommendation);
            }}
            isEditing={isEditing}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
