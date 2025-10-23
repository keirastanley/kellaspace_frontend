/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Image, PageWrapper } from "../../components";
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
import { MessageSection } from "./components/MessageSection";
import { FormDataProvider } from "../../providers";
import { RecommendationFormData } from "../../interfaces";
import { useState } from "react";

export const RecommendationPage = () => {
  const [formData, setFormData] = useState<RecommendationFormData>();
  const { recommendation } = useRecommendationData();

  return recommendation ? (
    <PageWrapper paddingRight={10}>
      <FormDataProvider formData={formData} setFormData={setFormData}>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 30px;
            width: 100%;
          `}
        >
          <BackButton />
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 10px;
            `}
          >
            <MainDetails recommendation={recommendation} />
            <Image
              src={recommendation.image?.src}
              style={{ width: "200px", borderRadius: "6px" }}
            />
            <div
              css={css`
                display: flex;
                gap: 10px;
              `}
            >
              <CompletedButton />
              <FavouriteButton />
            </div>
            {recommendation?.description && <Description />}
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 10px;
              width: 100%;
            `}
          >
            <ListsSection />
            <MessageSection />
          </div>
        </div>
      </FormDataProvider>
    </PageWrapper>
  ) : null;
};
