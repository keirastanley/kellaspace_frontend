/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";
import { useParams } from "react-router";
import { mockRecommendations } from "../data/mockRecommendations";
import { mockFavouritesList, mockLists } from "../data/mockLists";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { Recommendation } from "../interfaces";
import { Image } from "../components/Image";
import { RecommendationsVertical } from "../sections/RecommendationsVertical";
import { PageWrapper } from "../components/PageWrapper";

export const ListPage = () => {
  const { recommendations } = useRecommendations();
  const { list_id } = useParams();

  const favouritesIds = mockRecommendations
    .filter((recommendation) => recommendation.favourite)
    .map(({ id }) => id);
  const list = useMemo(
    () =>
      [{ ...mockFavouritesList, contents: favouritesIds }, ...mockLists].find(
        ({ id }) => id === list_id
      ),
    [list_id]
  );

  const contents = useMemo(
    () =>
      list?.contents?.map(
        (recommendationId) =>
          recommendations.find(
            ({ id }) => id === recommendationId
          ) as Recommendation
      ),
    [list, recommendations]
  );

  return (
    <PageWrapper>
      <div
        css={css`
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: 100%;
        `}
      >
        <Image
          src={list?.image?.src}
          style={{ width: "200px", borderRadius: "10px", alignSelf: "center" }}
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            width: 100%;
          `}
        >
          <h1>{list?.title}</h1>
          <p>Created by {list?.createdBy}</p>
        </div>
      </div>
      <div
        css={css`
          flex: 1 1 auto;
          overflow: hidden;
        `}
      >
        {contents && <RecommendationsVertical recommendations={contents} />}
      </div>
    </PageWrapper>
  );
};
