/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useState } from "react";
import { Mousewheel, FreeMode } from "swiper/modules";
import { sortRecommendationsByDate } from "../../utils";
import { useUserData } from "../../providers";
import { NoRecommendationsScreen } from "./NoRecommendationsScreen";
import { NewRecommendations } from "./NewRecommendations";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { RecommendationMenu, RecommendationWidget } from "../../components";

export const Home = () => {
  const { userData } = useUserData();
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const recommendations = userData?.recommendations;
  const remainingRecommendations = useMemo(
    () =>
      recommendations && recommendations.length > 0
        ? sortRecommendationsByDate(recommendations).slice(6)
        : [],
    [recommendations],
  );

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        padding: 10px;
      `}
    >
      <RecommendationMenu />
      <h1>Welcome to kellaspace</h1>
      {recommendations && recommendations.length > 0 ? (
        <>
          {recommendations.length > 6 && (
            <NewRecommendations
              recentRecommendations={sortRecommendationsByDate(
                recommendations,
              ).slice(0, 5)}
            />
          )}
          <div
            css={css`
              flex: 1;
              min-height: 0;
            `}
          >
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
              {remainingRecommendations.map((recommendation, i, arr) => (
                <SwiperSlide
                  key={recommendation.id + "-vertical-slide"}
                  style={{
                    height: i === arr.length - 1 ? "110px" : "100px",
                    width: "100%",
                  }}
                >
                  <RecommendationWidget
                    recommendation={recommendation}
                    onClick={() => swiperInstance?.slideTo(i)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ) : (
        <NoRecommendationsScreen />
      )}
    </div>
  );
};
