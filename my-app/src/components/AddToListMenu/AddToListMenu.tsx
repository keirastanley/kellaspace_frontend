/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Recommendation } from "../../interfaces/recommendations";
import * as motion from "motion/react-client";
import { forwardRef, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import styled from "@emotion/styled";
import "../../index.css";
import { mockLists } from "../../data/mockLists";
import { List } from "../../interfaces/lists";
import { Lists } from "./Lists";

const MotionMenu = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: fixed;
  border: 1px solid black;
  height: 100px;
  border-radius: 10px 10px 0px 0px;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  background-color: white;
  z-index: 3;
  font-size: 14px;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 20px);
  box-sizing: border-box;
  margin: 10px;
`;

const CancelButton = styled.button`
  background-color: white;
  border: 0;
`;

const AddToListButton = styled.button`
  border-radius: 15px;
  border: 1px solid black;
  background-color: white;
  padding: 5px 15px;
`;

const CenteredText = styled.p`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const AddToListMenu = forwardRef<
  HTMLDivElement,
  {
    recommendationId?: Recommendation["id"];
    onCancel: () => void;
    addToNewList: (id: Recommendation["id"]) => void;
  }
>(({ recommendationId, onCancel, addToNewList }, ref) => {
  const [selectedListIds, setSelectedListIds] = useState<List["id"][]>([]);

  useEffect(() => {
    for (const list of mockLists) {
      if (recommendationId && list.contents?.includes(recommendationId)) {
        setSelectedListIds((prevLists) => [...prevLists, list.id]);
      }
    }
  }, [recommendationId]);

  const onChange = (listId: string) =>
    setSelectedListIds((prevValues) =>
      prevValues.includes(listId)
        ? [
            ...prevValues.slice(0, prevValues.indexOf(listId)),
            ...prevValues.slice(prevValues.indexOf(listId) + 1),
          ]
        : [...prevValues, listId]
    );

  return (
    <AnimatePresence>
      {recommendationId && (
        <MotionMenu
          ref={ref}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <Header>
            <CenteredText>Add to list</CenteredText>
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
          </Header>
          <div
            css={css`
              display: flex;
              justify-content: center;
              width: 100%;
            `}
          >
            <AddToListButton onClick={() => addToNewList(recommendationId)}>
              New list
            </AddToListButton>
          </div>
          <Lists
            lists={mockLists}
            selectedListIds={selectedListIds}
            onChange={onChange}
          />
        </MotionMenu>
      )}
    </AnimatePresence>
  );
});
