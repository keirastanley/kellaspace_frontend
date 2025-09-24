import { Recommendation } from "../../interfaces/recommendations";
import { Image } from "../Image";
import * as motion from "motion/react-client";
import { forwardRef } from "react";
import { AnimatePresence } from "motion/react";
import { DismissButton } from "./DismissButton";
import { MenuActions } from "./MenuActions";
import styled from "@emotion/styled";
import { MenuDescription } from "./MenuDescription";
import { useRecommendations } from "../../providers/RecommendationsProvider";

const MotionMenu = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  border: 1px solid black;
  height: 100px;
  border-radius: 10px 10px 0px 0px;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  height: max-content;
  background-color: white;
  z-index: 3;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
`;

const TopContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin: 0px 10px 10px 10px;
`;

export const RecommendationMenu = forwardRef<
  HTMLDivElement,
  {
    recommendation?: Recommendation;
    onDismiss: () => void;
    onAddToListClick: () => void;
  }
>(({ recommendation, onDismiss, onAddToListClick }, ref) => {
  const { recommendations, setRecommendations, setSelectedRecommendation } =
    useRecommendations();

  const onToggleClick = (
    recommendationId: Recommendation["id"],
    boolObj: Record<string, boolean>
  ) =>
    setRecommendations((prevRecs) => {
      const recommendation = recommendations.find(
        ({ id }) => id === recommendationId
      );
      if (!recommendation) {
        return prevRecs;
      }
      const updatedRecommendation = { ...recommendation, ...boolObj };
      setSelectedRecommendation(updatedRecommendation);

      const indexOfRecommendation = prevRecs.indexOf(recommendation);
      return [
        ...prevRecs.slice(0, indexOfRecommendation),
        updatedRecommendation,
        ...prevRecs.slice(indexOfRecommendation + 1),
      ];
    });

  return (
    <AnimatePresence>
      {recommendation && (
        <MotionMenu
          ref={ref}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <Header>
            <DismissButton onDismiss={onDismiss} />
          </Header>
          <TopContent>
            <Image
              imageSrc={recommendation.image?.src}
              width="50px"
              borderRadius="8px"
            />
            <p>{recommendation.title}</p>
          </TopContent>
          <MenuDescription description={recommendation.description} />
          <MenuActions
            mediaType={recommendation.mediaType}
            onAddToListClick={onAddToListClick}
            completed={recommendation.completed}
            favourite={recommendation.favourite}
            onMarkAsCompletedClick={(completed) =>
              onToggleClick(recommendation.id, { completed })
            }
            onFavouriteClick={(favourite) =>
              onToggleClick(recommendation.id, { favourite })
            }
          />
        </MotionMenu>
      )}
    </AnimatePresence>
  );
});
