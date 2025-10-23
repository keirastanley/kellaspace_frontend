/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Recommendation, List } from "../../../interfaces";
import * as motion from "motion/react-client";
import { forwardRef, PropsWithChildren, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import styled from "@emotion/styled";
import "../../../index.css";
import { mockLists } from "../../../data";
import { Lists } from "./Lists";

const MotionPopup = forwardRef<HTMLDivElement, PropsWithChildren>(
  ({ children }, ref) => (
    <motion.div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 15px;
        position: fixed;
        border: 1px solid black;
        border-radius: 10px 10px 0px 0px;
        bottom: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        background-color: white;
        z-index: 3;
        font-size: 14px;
      `}
      ref={ref}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      {children}
    </motion.div>
  )
);

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

const RoundedButton = styled.button`
  border-radius: 20px;
  border: 1px solid black;
  background-color: white;
  padding: 10px 20px;
`;

const CenteredText = styled.p`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const AddToListPopup = forwardRef<
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
        <MotionPopup ref={ref}>
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
            <RoundedButton onClick={() => addToNewList(recommendationId)}>
              New list
            </RoundedButton>
          </div>
          <Lists
            lists={mockLists}
            selectedListIds={selectedListIds}
            onChange={onChange}
          />
          <RoundedButton
            css={css`
              position: fixed;
              left: 50%;
              transform: translateX(-50%);
              bottom: 0;
              margin-bottom: 40px;
            `}
            onClick={onCancel}
          >
            Done
          </RoundedButton>
        </MotionPopup>
      )}
    </AnimatePresence>
  );
});
