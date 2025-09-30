/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useRef, useState } from "react";
import { FilterByTypeCheckboxGroup } from "../components/FilterByTypeCheckboxGroup";
import { NewRecommendations } from "../sections/NewRecommendations";
import { MediaType, Recommendation } from "../interfaces/recommendations";
import { RecommendationWidget } from "../components/RecommendationWidget/RecommendationWidget";
import { RecommendationWidgetVariant } from "../interfaces/recommendationWidget";
import styled from "@emotion/styled";
import { RecommendationMenu } from "../components/RecommendationMenu/RecommendationMenu";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { FreeMode, Mousewheel } from "swiper/modules";
import { AddToListMenu } from "../components/AddToListMenu/AddToListMenu";
import { useDebounce } from "../hooks/useDebounce";
import { useClickOutside } from "../hooks/useClickOutside";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { PageWrapper } from "../components/PageWrapper";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Home = () => {
  const [selectedFilters, setSelectedFilters] = useState<MediaType[]>([]);
  const [addToListId, setAddToListId] = useState<Recommendation["id"]>();
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();

  const { recommendations, selectedRecommendation, setSelectedRecommendation } =
    useRecommendations();

  const menuRef = useRef<HTMLDivElement>(null);

  const remainingRecommendations = useMemo(
    () => sortRecommendationsByDate(recommendations).slice(6),
    [recommendations]
  );

  useClickOutside<HTMLDivElement>({
    ref: menuRef,
    callback: () => setSelectedRecommendation(undefined),
    active: !!selectedRecommendation,
  });

  const debouncedAddToListId = useDebounce(
    addToListId,
    addToListId === undefined ? 0 : 600
  );

  return (
    <PageWrapper>
      {selectedRecommendation && <Overlay />}
      <HeaderSection>
        <h1>Welcome to kellaspace</h1>
        <NewRecommendations />
        <FilterByTypeCheckboxGroup
          mediaTypes={Array.from(
            new Set(recommendations.map(({ mediaType }) => mediaType))
          )}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </HeaderSection>
      {/* {screenWidth < breakpointVals.tabletSm ? ( */}
      <Swiper
        direction="vertical"
        id="vertical-slider"
        slidesPerView="auto"
        spaceBetween={5}
        watchOverflow={true}
        onSwiper={setSwiperInstance}
        mousewheel={{ sensitivity: 1 }}
        freeMode={true}
        modules={[Mousewheel, FreeMode]}
      >
        {remainingRecommendations.map((recommendation, i) => (
          <SwiperSlide key={recommendation.title + recommendation.dateAdded}>
            <RecommendationWidget
              recommendation={recommendation}
              variant={RecommendationWidgetVariant.Expand}
              onClick={() => {
                setSelectedRecommendation(recommendation);
                swiperInstance?.slideTo(i);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* ) : (
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 6px;
          `}
        >
          {remainingRecommendations.map((recommendation, i) => (
            <RecommendationWidget
              key={recommendation.title + recommendation.dateAdded}
              recommendation={recommendation}
              variant={RecommendationWidgetVariant.Expand}
              onClick={() => {
                setSelectedRecommendation(recommendation);
                swiperInstance?.slideTo(i);
              }}
            />
          ))}
        </div>
      )} */}
      <RecommendationMenu
        recommendation={selectedRecommendation}
        onAddToListClick={() => setAddToListId(selectedRecommendation?.id)}
        onDismiss={() => setSelectedRecommendation(undefined)}
        ref={menuRef}
      />
      <AddToListMenu
        recommendationId={debouncedAddToListId}
        onCancel={() => setAddToListId(undefined)}
        addToNewList={() => console.log("add to new list")}
      />
    </PageWrapper>
  );
};
