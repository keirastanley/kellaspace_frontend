import { actionsPast } from "../../../interfaces";
import { Icons, MediaIcon } from "../../shared";
import * as motion from "motion/react-client";
import { forwardRef } from "react";
import { AnimatePresence } from "motion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router";
import { useUserData } from "../../../providers";
import { css } from "@emotion/react";

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

const ActionButton = styled.button`
  display: flex;
  gap: 5px;
  align-items: center;
  border: none;
  border-top: 1px solid grey;
  padding: 15px;
  font-size: 16px;
  width: 100%;
  background-color: white;
  text-align: left;
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

export const RecommendationMenu = forwardRef<HTMLDivElement>((_, ref) => {
  const { setUserData, selectedRecommendation, setSelectedRecommendation } =
    useUserData();
  const navigate = useNavigate();

  const onToggleClick = (key: "completed" | "favourite") => {
    if (!selectedRecommendation) return;

    setUserData((prevUserData) => {
      if (!prevUserData?.recommendations) return prevUserData;

      const updatedRec = {
        ...selectedRecommendation,
        [key]: !selectedRecommendation[key],
      };

      setSelectedRecommendation(updatedRec);

      return {
        ...prevUserData,
        recommendations: prevUserData.recommendations.map((prevRec) =>
          prevRec.id === updatedRec.id ? updatedRec : prevRec,
        ),
      };
    });
  };

  return (
    <AnimatePresence>
      {selectedRecommendation && (
        <MotionMenu
          ref={ref}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <Header>
            <button
              css={css`
                padding: 0;
                background-color: transparent;
                border: 0;
                text-align: center;
                margin: 10px 10px 0px 0px;
                width: 100%;
              `}
              onClick={() => setSelectedRecommendation(undefined)}
            >
              <Icons.ChevronDown
                css={css`
                  font-size: 20px;
                `}
              />
            </button>
          </Header>
          <TopContent>
            <div
              css={css`
                background-image: url(${selectedRecommendation.image?.src});
                background-size: cover;
                background-position: center;
                height: 50px;
                width: 50px;
                border-radius: 8px;
                flex-shrink: 0;
                margin: 0px;
              `}
            />
            <p>{selectedRecommendation.title}</p>
          </TopContent>
          {selectedRecommendation.description && (
            <p
              css={css`
                margin: 0px 10px 10px 10px;
                font-size: 15px;
                max-height: 300px;
                overflow: hidden;
              `}
            >
              {selectedRecommendation.description}
            </p>
          )}
          <ActionButton
            onClick={() => {
              setSelectedRecommendation(undefined);
              navigate(`/${selectedRecommendation.id}`);
            }}
          >
            <Icons.Open />
            Open
          </ActionButton>
          <ActionButton onClick={() => onToggleClick("completed")}>
            <MediaIcon
              mediaType={selectedRecommendation.mediaType}
              completed={selectedRecommendation.completed}
            />
            {selectedRecommendation.completed
              ? `${actionsPast[selectedRecommendation.mediaType].slice(0, 1).toUpperCase()}${actionsPast[
                  selectedRecommendation.mediaType
                ].slice(1)}`
              : `Mark as ${actionsPast[selectedRecommendation.mediaType]}`}
          </ActionButton>
          <ActionButton onClick={() => onToggleClick("favourite")}>
            {selectedRecommendation.favourite ? (
              <Icons.HeartFill />
            ) : (
              <Icons.Heart />
            )}
            {selectedRecommendation.favourite
              ? "Remove from favourites"
              : "Add to favourites"}
          </ActionButton>
          {/* <ActionButton onClick={() => {}}>
            <Icons.Add />
            Add to list
          </ActionButton> */}
        </MotionMenu>
      )}
    </AnimatePresence>
  );
});
