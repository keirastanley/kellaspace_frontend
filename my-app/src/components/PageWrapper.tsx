/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren, useRef, useState } from "react";
import { AddToListMenu } from "./AddToListMenu/AddToListMenu";
import { RecommendationMenu } from "./RecommendationMenu/RecommendationMenu";
import { useClickOutside } from "../hooks/useClickOutside";
import { useDebounce } from "../hooks/useDebounce";
import { List, Recommendation } from "../interfaces";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { ActionsProvider } from "../providers/ActionsProvider";
import { ListsProvider } from "../providers/ListProvider";
import {
  FavouritesAction,
  HomeAction,
  ListAction,
} from "../interfaces/actions";

const MARGIN = 10;

export const PageWrapper = ({
  initialList,
  isFavourites,
  actions,
  children,
}: PropsWithChildren & {
  actions?: (ListAction | FavouritesAction | HomeAction)[];
  initialList?: List;
  isFavourites?: boolean;
}) => {
  const [addToListId, setAddToListId] = useState<Recommendation["id"]>();
  const { selectedRecommendation, setSelectedRecommendation } =
    useRecommendations();
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside<HTMLDivElement>({
    ref: menuRef,
    callback: () => setSelectedRecommendation(undefined),
    active: !!selectedRecommendation,
  });

  const debouncedAddToListId = useDebounce(
    addToListId,
    addToListId === undefined ? 0 : 600
  );

  return (
    <ListsProvider initialList={initialList} isFavourites={isFavourites}>
      <ActionsProvider actions={actions}>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
            height: calc(100% - ${MARGIN}px - 45px);
            width: 100vw;
            box-sizing: border-box;
            padding: ${MARGIN}px 0px 0px ${MARGIN}px;
            grid-row-start: 1;
          `}
        >
          {children}
          <RecommendationMenu
            recommendation={selectedRecommendation}
            onAddToListClick={() => setAddToListId(selectedRecommendation?.id)}
            onDismiss={() => setSelectedRecommendation(undefined)}
            ref={menuRef}
          />
          <AddToListMenu
            recommendationId={debouncedAddToListId}
            onCancel={() => setAddToListId(undefined)}
            addToNewList={() => console.log("add to new list")}
          />
        </div>
      </ActionsProvider>
    </ListsProvider>
  );
};
