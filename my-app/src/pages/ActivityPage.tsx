/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PageWrapper } from "../components/PageWrapper";
import { MediaTypeTag } from "../components/RecommendationWidget/MediaTypeTag";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Mousewheel, FreeMode } from "swiper/modules";
import { useState } from "react";
import { Image } from "../components/Image";
import { Timestamp } from "../components/RecommendationWidget/Timestamp";
import { sortRecommendationsByDate } from "../utils/utils";
import { useUserData } from "../providers/UserDataProvider";
import { Link } from "react-router";

export const ActivityPage = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const {
    userData: { recommendations },
    setSelectedRecommendation,
  } = useUserData();
  return (
    <PageWrapper>
      <h1>Activity</h1>
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
                  <Image
                    src={recommendation.image?.src}
                    style={{ width: "50px", borderRadius: "4px" }}
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
            )
          )}
        </Swiper>
      ) : (
        <div>
          This is where you'll see everything that you add and everything that's
          shared with you. <Link to="add-new">Add something new</Link> to get
          started.
        </div>
      )}
    </PageWrapper>
  );
};
