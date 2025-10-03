/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";
import { FilterByTypeCheckboxGroup } from "../components/FilterByTypeCheckboxGroup";
import { Recommendation, RecommendationWidgetVariant } from "../interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode } from "swiper/modules";
import { RecommendationWidget } from "../components/RecommendationWidget/RecommendationWidget";
import SwiperCore from "swiper";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { SortByRadioGroup } from "../components/SortByRadioGroup";
import { SortingType } from "../interfaces/actions";

export const RecommendationsVertical = ({
  recommendations,
  showFilters = false,
  showSorting = false,
  isEditing = false,
}: {
  recommendations: Recommendation[];
  showFilters?: boolean;
  showSorting?: boolean;
  isEditing?: boolean;
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSorting, setSelectedSorting] = useState<string>();

  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();

  const mediaTypes = Array.from(
    new Set(recommendations.map(({ mediaType }) => mediaType))
  );

  const filteredRecommendations = useMemo(
    () =>
      recommendations.filter((recommendation) =>
        selectedFilters.length > 0
          ? selectedFilters.includes(recommendation.mediaType)
          : true
      ),
    [selectedFilters, recommendations]
  );

  const recommendationsToShow = useMemo(() => {
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
        return new Date(a.dateAdded).getTime() < new Date(b.dateAdded).getTime()
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
  }, [selectedSorting, filteredRecommendations]);

  const { setSelectedRecommendation } = useRecommendations();

  useEffect(() => {
    if (!showFilters) {
      setSelectedFilters([]);
    }
    if (!showSorting) {
      setSelectedSorting(undefined);
    }
  }, [showFilters, showSorting]);

  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      {mediaTypes.length > 1 && showFilters && (
        <FilterByTypeCheckboxGroup
          mediaTypes={mediaTypes}
          selectedFilters={selectedFilters}
          // TEMP FIX
          setSelectedFilters={setSelectedFilters}
        />
      )}
      {showSorting && (
        <SortByRadioGroup
          selectedSorting={selectedSorting}
          setSelectedSorting={setSelectedSorting}
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
        {recommendationsToShow.map((recommendation, i) => (
          <SwiperSlide
            key={recommendation.id + "-vertical-slide"}
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
              isEditing={isEditing}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
