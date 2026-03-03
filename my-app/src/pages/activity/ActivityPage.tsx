import { css } from "@emotion/react";
import { MediaTypeTag, Timestamp } from "../../components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Mousewheel, FreeMode } from "swiper/modules";
import { useState } from "react";
import { sortRecommendationsByDate } from "../../utils";
import { useUserData } from "../../providers";
import { NoActivityScreen } from "./NoActivityScreen";

export const ActivityPage = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const { userData, setSelectedRecommendation } = useUserData();
  const recommendations = userData?.recommendations;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        height: 100%;
      `}
    >
      <h1>Activity</h1>
      <div
        css={css`
          flex: 1;
          min-height: 0;
          padding-bottom: 10px;
        `}
      >
        {recommendations && recommendations.length > 0 ? (
          <Swiper
            direction="vertical"
            slidesPerView="auto"
            spaceBetween={10}
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
            {sortRecommendationsByDate(recommendations).map(
              (recommendation, i) => (
                <SwiperSlide
                  key={recommendation.id + "-vertical-slide"}
                  style={{
                    height: i === recommendations.length - 1 ? "60px" : "50px",
                    width: "100%",
                  }}
                >
                  <div
                    css={css`
                      width: 100%;
                      box-sizing: border-box;
                      display: flex;
                      gap: 5px;
                      align-items: center;
                      padding-right: 10px;
                      border-radius: 10px;
                    `}
                    onClick={() => {
                      swiperInstance?.slideTo(i);
                      setSelectedRecommendation(recommendation);
                    }}
                  >
                    <div
                      css={css`
                        background-image: url(${recommendation.image?.src});
                        background-size: cover;
                        background-position: center;
                        height: 50px;
                        width: 50px;
                        border-radius: 4px;
                        flex-shrink: 0;
                        margin: 0px;
                      `}
                    />
                    <div
                      css={css`
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        font-size: 14px;
                        height: 100%;
                      `}
                    >
                      <div
                        css={css`
                          display: flex;
                          flex-direction: column;
                          justify-content: space-between;
                          gap: 4px;
                          height: 100%;
                        `}
                      >
                        <p>
                          <b>{recommendation.addedBy}</b> added{" "}
                          <i>{recommendation.title}</i>
                        </p>
                        <Timestamp dateAdded={recommendation.dateAdded} />
                      </div>
                      <MediaTypeTag mediaType={recommendation.mediaType} />
                    </div>
                  </div>
                </SwiperSlide>
              ),
            )}
          </Swiper>
        ) : (
          <NoActivityScreen />
        )}
      </div>
    </div>
  );
};
