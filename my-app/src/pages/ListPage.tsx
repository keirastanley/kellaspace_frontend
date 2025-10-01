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

const CheckboxGroup = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
  }
`;

const MotionLabel = (
  props: ComponentProps<typeof motion.label> & { isSelected: boolean }
) => (
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
      background-color: ${props.isSelected ? "grey" : "white"};
      color: ${props.isSelected ? "white" : "black"};
    `}
    layout="position"
    transition={spring}
    {...props}
  >
    {props.children}
  </motion.label>
);

export const ListPage = () => {
  const [selectedActions, setSelectedActions] = useState<Action[]>([]);
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
        <CheckboxGroup>
          <AnimatePresence>
            {[
              ...selectedActions,
              ...Object.values(Action).filter(
                (actionValue) => !selectedActions.includes(actionValue)
              ),
            ].map((action) => {
              const IconComponent = Icons[action];
              return (
                <MotionLabel
                  isSelected={selectedActions.includes(action)}
                  key={action}
                >
                  <input
                    type="checkbox"
                    checked={selectedActions.includes(action)}
                    onChange={() => {
                      if (action === Action.Edit) {
                        setIsEditing(!isEditing);
                      }

                      setSelectedActions((prevActions) => {
                        if (action === Action.Delete) {
                          return [Action.Delete];
                        } else {
                          const otherActions = prevActions.filter(
                            (prevAction) =>
                              prevAction !== action &&
                              prevAction !== Action.Delete
                          );
                          if (selectedActions.includes(action)) {
                            return otherActions;
                          }
                          return [action, ...otherActions];
                        }
                      });
                    }}
                  />
                  <IconComponent />
                  <span>{action}</span>
                </MotionLabel>
              );
            })}
          </AnimatePresence>
        </CheckboxGroup>
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

const spring: Transition = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

const selectedStyle = (isSelected: boolean) => css`
  background-color: ${isSelected ? "grey" : "white"};
  color: ${isSelected ? "white" : "black"};
`;
