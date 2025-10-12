import { Mousewheel, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Recommendation, RecommendationWidgetVariant } from "../interfaces";
import { RecommendationWidget } from "./RecommendationWidget/RecommendationWidget";
import { useState, useMemo } from "react";
import { SortingType } from "../interfaces/actions";
import { useActions } from "../providers/ActionsProvider";
import { useRecommendations } from "../providers/RecommendationsProvider";
import SwiperCore from "swiper";

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
    if (filteredRecommendations) {
      if (selectedSorting === SortingType.titleAscending) {
        return filteredRecommendations.sort((a, b) =>
          a.title < b.title ? -1 : 1
        );
      }
      if (selectedSorting === SortingType.titleDescending) {
        return filteredRecommendations.sort((a, b) =>
          a.title > b.title ? -1 : 1
        );
      }
      if (selectedSorting === SortingType.dateAddedAscending) {
        return filteredRecommendations.sort((a, b) => {
          return new Date(a.dateAdded).getTime() <
            new Date(b.dateAdded).getTime()
            ? -1
            : 1;
        });
      }
      if (selectedSorting === SortingType.dateAddedDescending) {
        return filteredRecommendations.sort((a, b) =>
          new Date(a.dateAdded).getTime() > new Date(b.dateAdded).getTime()
            ? -1
            : 1
        );
      }
      return filteredRecommendations;
    }
    return recommendations;
  }, [selectedSorting, filteredRecommendations]);

  const { setSelectedRecommendation } = useRecommendations();

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
