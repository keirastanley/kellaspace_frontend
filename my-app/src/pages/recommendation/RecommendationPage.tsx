/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Icons, Image, MotionButton, PageWrapper } from "../../components";
// import { AddButton } from "../components/CreateForm/AddButton";
// import { Dialog } from "../components/Dialog";
// import { EditListDialog } from "../components/ListPageContent/EditListDialog";
// import { Checkmark } from "../components/AddToListMenu/Checkmark";
import { MainDetails } from "./components/MainDetails";
import { useRecommendationData } from "./useRecommendationData";
import { BackButton } from "./components/BackButton";
import { CompletedButton } from "./components/CompletedButton";
import { FavouriteButton } from "./components/FavouriteButton";
import { Description } from "./components/Description";
import { ListsSection } from "./components/ListsSection";
// import { MessageSection } from "./components/MessageSection";
import { FormDataProvider } from "../../providers";
import { RecommendationFormData } from "../../interfaces";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import SwiperCore from "swiper";
import { AdditionalFields } from "../../components/shared/AdditionalFields";

export const RecommendationPage = () => {
  const [formData, setFormData] = useState<RecommendationFormData>();
  const { recommendation } = useRecommendationData();
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();

  useEffect(() => {
    swiperInstance?.slideTo(0);
  }, []);

  return recommendation ? (
    <PageWrapper>
      <FormDataProvider formData={formData} setFormData={setFormData}>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            width: 100%;
          `}
        >
          <BackButton />
          {/* <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 10px;
            `}
          > */}
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 10px;
              width: 100%;
            `}
          >
            <MainDetails recommendation={recommendation} />
            <Image
              src={recommendation.image?.src}
              style={{ width: "200px", borderRadius: "6px" }}
            />
            <Swiper
              spaceBetween={10}
              slidesPerView="auto"
              onSwiper={setSwiperInstance}
              mousewheel={{ sensitivity: 1 }}
              modules={[Mousewheel]}
              style={{
                width: "100%",
                maxWidth: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <SwiperSlide style={swiperSlideStyles}>
                <CompletedButton />
              </SwiperSlide>
              <SwiperSlide style={swiperSlideStyles}>
                <FavouriteButton />
              </SwiperSlide>
              <SwiperSlide style={swiperSlideStyles}>
                <MotionButton onClick={() => {}}>
                  <Icons.Add /> Add to list
                </MotionButton>
              </SwiperSlide>
            </Swiper>
            {recommendation?.description && <Description />}
          </div>
          <ListsSection />
          <AdditionalFields />
        </div>
      </FormDataProvider>
    </PageWrapper>
  ) : null;
};

const swiperSlideStyles = {
  width: "max-content",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
