/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  AdditionalRecommendationFields,
  Icons,
  Image,
  MotionButton,
  PageWrapper,
} from "../../components";
// import { AddButton } from "../components/CreateForm/AddButton";
// import { Dialog } from "../components/Dialog";
// import { EditListDialog } from "../components/ListPageContent/EditListDialog";
// import { Checkmark } from "../components/AddToListMenu/Checkmark";
import { MainDetails } from "./components/MainDetails";
import { useRecommendationPageData } from "./useRecommendationData";
import { BackButton } from "./components/BackButton";
import { CompletedButton } from "./components/CompletedButton";
import { FavouriteButton } from "./components/FavouriteButton";
import { Description } from "./components/Description";
import { ListsSection } from "./components/ListsSection";
// import { MessageSection } from "./components/MessageSection";
import { FormDataProvider, useUserData } from "../../providers";
import { RecommendationFormData } from "../../interfaces";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import SwiperCore from "swiper";
import { addNewRecommendationToUserData } from "../../utils";
import { ListEditorDialog } from "./components/ListEditorDialog";

export const RecommendationPage = () => {
  const [formData, setFormData] = useState<RecommendationFormData>();
  const [showListEditor, setShowListEditor] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const { setUserData } = useUserData();
  const {
    updatedRecommendation,
    setUpdatedRecommendation,
    recommendation,
    setUpdatedLists,
  } = useRecommendationPageData();

  useEffect(() => {
    swiperInstance?.slideTo(0);
  }, []);

  return recommendation ? (
    <PageWrapper>
      <FormDataProvider formData={formData} setFormData={setFormData}>
        <ListEditorDialog
          open={showListEditor}
          onClose={() => setShowListEditor(false)}
          recommendation={recommendation!}
          isFavourite={(updatedRecommendation ?? recommendation!).favourite}
          onFavouritesChange={() =>
            setUpdatedRecommendation((prevUpdatedRecommendation) => {
              const baseRecommendation =
                prevUpdatedRecommendation ?? recommendation!;
              return {
                ...baseRecommendation,
                favourite: !baseRecommendation.favourite,
              };
            })
          }
          onListChange={(id: string, checked: boolean) =>
            setUpdatedLists((prevLists) => {
              if (!prevLists) {
                return prevLists;
              }
              const list = prevLists.find((list) => list.id === id);
              if (!list) {
                return prevLists;
              }
              const indexOfList = prevLists.indexOf(list);
              return [
                ...prevLists.slice(0, indexOfList),
                {
                  ...list,
                  contents: list.contents
                    ? [...list.contents, recommendation]
                    : [recommendation],
                },
                ...prevLists.slice(indexOfList + 1),
              ];
            })
          }
          onSaveClick={() => {
            setUserData((prevUserData) =>
              addNewRecommendationToUserData(
                prevUserData,
                recommendation!,
                updatedRecommendation
              )
            );
            setShowListEditor(false);
          }}
        />
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
                <MotionButton onClick={() => setShowListEditor(true)}>
                  <Icons.Add /> Add to list
                </MotionButton>
              </SwiperSlide>
            </Swiper>
            {recommendation?.description && <Description />}
          </div>
          <ListsSection setShowListEditor={setShowListEditor} />
          <AdditionalRecommendationFields />
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
