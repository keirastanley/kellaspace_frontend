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
import { ListAction, SortingType } from "../interfaces/actions";
import { AnimatePresence } from "framer-motion";
import { ConditionalFieldWrapper } from "../components/ConditionalFieldWrapper";
import { ActionCheckboxGroup } from "../components/ActionCheckboxGroup";
import { useActions } from "../providers/ActionsProvider";

export const RecommendationsVertical = ({
  recommendations,
  isEditing = false,
  setIsEditing,
}: {
  recommendations?: Recommendation[];
  isEditing?: boolean;
  setIsEditing: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { selectedActions } = useActions();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSorting, setSelectedSorting] = useState<string>();

  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();

  const mediaTypes = recommendations
    ? Array.from(new Set(recommendations.map(({ mediaType }) => mediaType)))
    : undefined;

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
    return undefined;
  }, [selectedSorting, filteredRecommendations]);

  const { setSelectedRecommendation } = useRecommendations();

  const showFilters = useMemo(
    () => selectedActions.includes(ListAction.Filter),
    [selectedActions]
  );
  const showSorting = useMemo(
    () => selectedActions.includes(ListAction.Sort),
    [selectedActions]
  );

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
        margin-right: 10px;
      `}
    >
      <ActionCheckboxGroup setIsEditing={setIsEditing} />
      <AnimatePresence>
        {mediaTypes && mediaTypes.length > 1 && showFilters && (
          <ConditionalFieldWrapper>
            <FilterByTypeCheckboxGroup
              mediaTypes={mediaTypes}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </ConditionalFieldWrapper>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {recommendations && showSorting && (
          <ConditionalFieldWrapper>
            <SortByRadioGroup
              selectedSorting={selectedSorting}
              setSelectedSorting={setSelectedSorting}
            />
          </ConditionalFieldWrapper>
        )}
      </AnimatePresence>
      {recommendationsToShow && (
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
                height:
                  i === recommendationsToShow.length - 1 ? "110px" : "100px",
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
      )}
    </div>
  );
};
