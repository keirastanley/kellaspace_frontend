/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo, useRef, useState } from "react";
import { NewRecommendations } from "../sections/NewRecommendations";
import { Recommendation } from "../interfaces/recommendations";
import styled from "@emotion/styled";
import { RecommendationMenu } from "../components/RecommendationMenu/RecommendationMenu";
import { AddToListMenu } from "../components/AddToListMenu/AddToListMenu";
import { useDebounce } from "../hooks/useDebounce";
import { useClickOutside } from "../hooks/useClickOutside";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { sortRecommendationsByDate } from "../utils/utils";
import { RecommendationsVertical } from "../sections/RecommendationsVertical";
import { PageWrapper } from "../components/PageWrapper";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Home = () => {
  const [addToListId, setAddToListId] = useState<Recommendation["id"]>();

  const { recommendations, selectedRecommendation, setSelectedRecommendation } =
    useRecommendations();

  const menuRef = useRef<HTMLDivElement>(null);

  const remainingRecommendations = useMemo(
    () => sortRecommendationsByDate(recommendations).slice(6),
    [recommendations]
  );

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
    <PageWrapper>
      {selectedRecommendation && <Overlay />}
      <h1>Welcome to kellaspace</h1>
      <NewRecommendations />
      <div
        id="here"
        css={css`
          height: 75%;
          max-height: 75%;
        `}
      >
        <RecommendationsVertical recommendations={remainingRecommendations} />
      </div>
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
    </PageWrapper>
  );
};
