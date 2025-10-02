/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { mockRecommendations } from "../data/mockRecommendations";
import { mockFavouritesList, mockLists } from "../data/mockLists";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { Recommendation } from "../interfaces";
import { Image } from "../components/Image";
import { RecommendationsVertical } from "../sections/RecommendationsVertical";
import { PageWrapper } from "../components/PageWrapper";
import { Action } from "../interfaces/actions";
import { EditableWrapper } from "../components/EditableWrapper";
import { Dialog } from "../components/Dialog";
import { CheckboxType } from "../components/CheckboxGroup/CheckboxGroupContext";
import { ActionCheckboxGroup } from "../components/ActionCheckboxGroup";

export const ListPage = () => {
  const [selectedActions, setSelectedActions] = useState<CheckboxType[]>([]);
  const { recommendations } = useRecommendations();
  const [isEditing, setIsEditing] = useState(false);
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

  const listContents = useMemo(
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
      <Dialog
        open={selectedActions.includes(Action.Delete)}
        onClose={() => setSelectedActions([])}
      >
        Some stuff
      </Dialog>
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
          style={{ width: "200px", borderRadius: "6px", alignSelf: "center" }}
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            width: 100%;
          `}
        >
          <EditableWrapper isEditing={isEditing}>
            <h1>{list?.title}</h1>
          </EditableWrapper>
          <EditableWrapper isEditing={isEditing}>
            <p>Created by {list?.createdBy}</p>
          </EditableWrapper>
        </div>
        <ActionCheckboxGroup
          actions={Object.values(Action)}
          // Temporary fix
          selectedActions={selectedActions as any}
          setSelectedActions={setSelectedActions}
          setIsEditing={setIsEditing}
        />
      </div>
      <div
        css={css`
          flex: 1 1 auto;
          overflow: hidden;
        `}
      >
        {listContents && (
          <RecommendationsVertical
            recommendations={listContents}
            showFilters={selectedActions.includes(Action.Filter)}
            isEditing={isEditing}
          />
        )}
      </div>
    </PageWrapper>
  );
};
