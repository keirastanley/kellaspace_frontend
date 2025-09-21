/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FilterByTypeCheckboxGroup } from "../components/RecommendationWidget/FilterByTypeCheckboxGroup";
import { NewRecommendations } from "../sections/NewRecommendations";
import { mockRecommendations } from "../data/mockRecommendations";
import { MediaType, Recommendation } from "../interfaces/recommendations";
import { RecommendationWidget } from "../components/RecommendationWidget/RecommendationWidget";
import { RecommendationWidgetVariant } from "../interfaces/recommendationWidget";
import styled from "@emotion/styled";
import { RecommendationMenu } from "../components/RecommendationMenu/RecommendationMenu";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { FreeMode, Mousewheel } from "swiper/modules";

const sortRecommendationsByDate = (recommendations: Recommendation[]) =>
  recommendations.sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );

const MARGIN = 10;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${MARGIN}px;
  height: 30%;
`;

export const Home = () => {
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<Recommendation>();
  const [selectedFilters, setSelectedFilters] = useState<MediaType[]>([]);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();

  const menuRef = useRef<HTMLDivElement>(null);

  const recommendationsSortedByDate =
    sortRecommendationsByDate(mockRecommendations);

  const recentRecommendations = recommendationsSortedByDate.slice(0, 5);

  const remainingRecommendations = useMemo(() => {
    if (selectedFilters.length > 0) {
      return recommendationsSortedByDate
        .slice(6)
        .filter(({ mediaType }) => selectedFilters.includes(mediaType));
    }
    return recommendationsSortedByDate.slice(6);
  }, [recommendationsSortedByDate, selectedFilters]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSelectedRecommendation(undefined);
      }
    }

    if (selectedRecommendation) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedRecommendation]);

  return (
    <div
      css={css`
        h1 {
          font-size: 18px;
        }
        margin: ${MARGIN}px;
        height: calc(100vh - ${MARGIN * 2}px);
      `}
    >
      {selectedRecommendation && (
        <div
          css={css`
            background-color: rgba(0, 0, 0, 0.5);
            height: 100vh;
            width: 100vw;
            position: fixed;
            z-index: 2;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          `}
        />
      )}
      <HeaderSection>
        <h1>Welcome to kellaspace</h1>
        <NewRecommendations
          recentRecommendations={recentRecommendations}
          setSelectedRecommendation={setSelectedRecommendation}
        />
        <FilterByTypeCheckboxGroup
          mediaTypes={Array.from(
            new Set(mockRecommendations.map(({ mediaType }) => mediaType))
          )}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </HeaderSection>
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
      <RecommendationMenu
        recommendation={selectedRecommendation}
        onDismiss={() => setSelectedRecommendation(undefined)}
        ref={menuRef}
      />
    </div>
  );
};
