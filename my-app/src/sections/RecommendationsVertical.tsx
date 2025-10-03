/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Dispatch, useEffect, useMemo, useState } from "react";
import { FilterByTypeCheckboxGroup } from "../components/FilterByTypeCheckboxGroup";
import { Recommendation, RecommendationWidgetVariant } from "../interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode } from "swiper/modules";
import { RecommendationWidget } from "../components/RecommendationWidget/RecommendationWidget";
import SwiperCore from "swiper";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { SortByRadioGroup } from "../components/SortByRadioGroup";
import { SortingType } from "../interfaces/actions";
import { AnimatePresence } from "framer-motion";
import { ConditionalFieldWrapper } from "../components/ConditionalFieldWrapper";
import { ActionCheckboxGroup } from "../components/ActionCheckboxGroup";

export const RecommendationsVertical = ({
  recommendations,
  actions,
  selectedActions,
  setSelectedActions,
  showFilters = false,
  showSorting = false,
  isEditing = false,
  setIsEditing,
}: {
  recommendations: Recommendation[];
  actions: string[];
  selectedActions: string[];
  setSelectedActions: Dispatch<React.SetStateAction<string[]>>;
  showFilters?: boolean;
  showSorting?: boolean;
  isEditing?: boolean;
  setIsEditing: Dispatch<React.SetStateAction<boolean>>;
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
      <ActionCheckboxGroup
        actions={actions}
        selectedActions={selectedActions}
        setSelectedActions={setSelectedActions}
        setIsEditing={setIsEditing}
      />
      <AnimatePresence>
        {mediaTypes.length > 1 && showFilters && (
          <ConditionalFieldWrapper>
            <FilterByTypeCheckboxGroup
              mediaTypes={mediaTypes}
              selectedFilters={selectedFilters}
              // TEMP FIX
              setSelectedFilters={setSelectedFilters}
            />
          </ConditionalFieldWrapper>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showSorting && (
          <ConditionalFieldWrapper>
            <SortByRadioGroup
              selectedSorting={selectedSorting}
              setSelectedSorting={setSelectedSorting}
            />
          </ConditionalFieldWrapper>
        )}
      </AnimatePresence>
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
