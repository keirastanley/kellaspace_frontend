/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Recommendation } from "../../interfaces/recommendations";
import { Image } from "../Image";
import * as motion from "motion/react-client";
import { forwardRef, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import styled from "@emotion/styled";
import "../../index.css";
import { mockLists } from "../../data/mockLists";
import { List } from "../../interfaces/lists";
import { IoCheckmarkOutline } from "react-icons/io5";

const MotionMenu = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const TopContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0px 10px 10px 10px;
`;

export const AddToListMenu = forwardRef<
  HTMLDivElement,
  {
    recommendationId?: Recommendation["id"];
    onCancel: () => void;
    addToNewList: (id: Recommendation["id"]) => void;
  }
>(({ recommendationId, onCancel, addToNewList }, ref) => {
  const [selectedLists, setSelectedLists] = useState<List["id"][]>([]);

  useEffect(() => {
    for (const list of mockLists) {
      if (recommendationId && list.contents?.includes(recommendationId)) {
        setSelectedLists((prevLists) => [...prevLists, list.id]);
      }
    }
  }, [recommendationId]);

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
            <p
              css={css`
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
              `}
            >
              Add to list
            </p>
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
          </Header>
          <TopContent>
            <button
              css={css`
                border-radius: 15px;
                border: 1px solid black;
                background-color: white;
                padding: 5px 15px;
              `}
              onClick={() => addToNewList(recommendationId)}
            >
              New list
            </button>
          </TopContent>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 10px;
            `}
          >
            {mockLists.map((list) => {
              const checked = selectedLists.includes(list.id);

              return (
                <motion.label
                  key={list.title + list.dateCreated}
                  whileTap={{ backgroundColor: "rgba(128, 128, 128, 0.5)" }}
                  css={css`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 6px;
                    margin: 0px 10px 0px 10px;
                    input[type="checkbox"] {
                      position: absolute;
                      opacity: 0;
                    }
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      gap: 6px;
                    `}
                  >
                    <Image
                      imageSrc={list.image?.src}
                      width="50px"
                      borderRadius="4px"
                    />
                    <div
                      css={css`
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        gap: 5px;
                      `}
                    >
                      <p>{list.title}</p>
                      <p
                        css={css`
                          font-size: 12px;
                        `}
                      >
                        <i>
                          {list.contents && list.contents.length > 0
                            ? `${list.contents.length} items`
                            : "Empty"}
                        </i>
                      </p>
                    </div>
                  </div>
                  <div
                    css={css`
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      border: 1px solid black;
                      border-radius: 50%;
                      height: 20px;
                      width: 20px;
                      background-color: ${checked ? "black" : "white"};
                    `}
                  >
                    <input
                      type="checkbox"
                      onChange={() =>
                        setSelectedLists((prevValues) =>
                          prevValues.includes(list.id)
                            ? [
                                ...prevValues.slice(
                                  0,
                                  prevValues.indexOf(list.id)
                                ),
                                ...prevValues.slice(
                                  prevValues.indexOf(list.id) + 1
                                ),
                              ]
                            : [...prevValues, list.id]
                        )
                      }
                      checked={checked}
                    />
                    <IoCheckmarkOutline
                      css={css`
                        color: white;
                        font-size: 14px;
                      `}
                    />
                  </div>
                </motion.label>
              );
            })}
          </div>
        </MotionMenu>
      )}
    </AnimatePresence>
  );
});
