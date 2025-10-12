/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useState } from "react";
import { Recommendation, RecommendationWidgetVariant } from "../interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode } from "swiper/modules";
import { RecommendationWidget } from "../components/RecommendationWidget/RecommendationWidget";
import SwiperCore from "swiper";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { ListAction, SortingType } from "../interfaces/actions";
import { useActions } from "../providers/ActionsProvider";
import { ActionSection } from "../components/ActionsSection";

export const RecommendationsVertical = ({
  recommendations,
}: {
  recommendations?: Recommendation[];
  onSave?: () => void;
}) => {
  const { selectedFilters, selectedSorting, selectedActions } = useActions();

  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();

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
      <ActionSection />
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
                isEditing={selectedActions.includes(ListAction.Edit)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
