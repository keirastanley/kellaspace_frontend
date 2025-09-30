/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentProps, useMemo, useState } from "react";
import { useParams } from "react-router";
import { mockRecommendations } from "../data/mockRecommendations";
import { mockFavouritesList, mockLists } from "../data/mockLists";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { Recommendation } from "../interfaces";
import { Image } from "../components/Image";
import { RecommendationsVertical } from "../sections/RecommendationsVertical";
import { PageWrapper } from "../components/PageWrapper";
import { Icons } from "../components/Icons";
import styled from "@emotion/styled";
import * as motion from "motion/react-client";
import { Transition } from "motion/react";
import { Action } from "../interfaces/actions";
import { EditableWrapper } from "../components/EditableWrapper";

const RadioGroup = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  input[type="radio"] {
    position: absolute;
    opacity: 0;
  }
`;

const MotionLabel = (props: ComponentProps<typeof motion.label>) => (
  <motion.label
    css={css`
      display: flex;
      align-items: center;
      gap: 4px;
      border: none;
      background-color: transparent;
      span {
        font-size: 12px;
      }
      svg {
        font-size: 18px;
      }
      padding: 4px 13px 4px 11px;
      border-radius: 15px;
      border: 1px solid black;
    `}
    layout
    transition={spring}
    {...props}
  >
    {props.children}
  </motion.label>
);

export const ListPage = () => {
  const [actionsToShow, setActionsToShow] = useState<Action[]>(
    Object.values(Action)
  );
  const [selectedAction, setSelectedAction] = useState<Action>();
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

  const handleSelectAction = (action: Action) => {
    if (action === Action.Delete && selectedAction == Action.Delete) {
      setSelectedAction(undefined);
    }
    setSelectedAction(action);
    if (action === Action.Edit) {
      setIsEditing(true);
      setActionsToShow([Action.Edit]);
    }
    setIsEditing(false);
    if (action === Action.Delete) {
      setActionsToShow([Action.Delete]);
    }
    if (action === Action.Filter) {
      setActionsToShow([
        Action.Filter,
        Action.Sort,
        Action.Edit,
        Action.Delete,
      ]);
    }
    setActionsToShow([Action.Sort, Action.Filter, Action.Edit, Action.Delete]);
  };

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
        <RadioGroup>
          {actionsToShow.map((action) => {
            const IconComponent = Icons[action];
            return (
              <MotionLabel
                css={selectedStyle(selectedAction === action)}
                key={action}
              >
                <input
                  type="radio"
                  checked={action === selectedAction}
                  onChange={() => handleSelectAction(action)}
                  onClick={
                    selectedAction && selectedAction === action
                      ? () => {
                          setIsEditing(!isEditing);
                          setSelectedAction(undefined);
                          setActionsToShow(Object.values(Action));
                        }
                      : undefined
                  }
                />
                <IconComponent />
                <span>{action}</span>
              </MotionLabel>
            );
          })}
        </RadioGroup>
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
            showFilters={selectedAction === Action.Filter}
            isEditing={isEditing}
          />
        )}
      </div>
    </PageWrapper>
  );
};

const spring: Transition = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

const selectedStyle = (isSelected: boolean) => css`
  background-color: ${isSelected ? "grey" : "white"};
  color: ${isSelected ? "white" : "black"};
`;
