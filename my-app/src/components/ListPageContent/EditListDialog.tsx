/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentProps, useState } from "react";
import { Dialog } from "../Dialog";
import { Recommendation, RecommendationWidgetVariant } from "../../interfaces";
import { RecommendationsVertical } from "../RecommendationsVertical";
import { DialogVariant } from "../../interfaces/dialog";
import { Icons } from "../Icons";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const MotionButton = styled(motion.button)`
  padding: 5px 15px;
  font-size: 12px;
  text-align: center;
  border-radius: 15px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  gap: 4px;
  span {
    font-size: 12px;
  }
  svg {
    font-size: 18px;
  }
`;

export const EditListDialog = ({
  recommendations,
  title,
  onTitleChange,
  onSaveClick,
  ...props
}: ComponentProps<typeof Dialog> & {
  title: string;
  recommendations: Recommendation[];
  onTitleChange: (title?: string) => void;
  onSaveClick: () => void;
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  return (
    <Dialog {...props} variant={DialogVariant.Expand}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 10px;
          height: 100%;
        `}
      >
        <div>
          <div
            css={css`
              display: flex;
              gap: 10px;
              align-items: center;
            `}
          >
            {isEditingTitle ? (
              <input
                placeholder={title}
                onChange={(e) => onTitleChange(e.target.value)}
                css={css`
                  height: 25px;
                `}
              />
            ) : (
              <h1>{title}</h1>
            )}
            <MotionButton
              type="button"
              onClick={() => setIsEditingTitle(!isEditingTitle)}
            >
              {isEditingTitle ? (
                <>
                  <Icons.Checkmark />
                  Done
                </>
              ) : (
                <>
                  <Icons.Edit />
                  Edit
                </>
              )}
            </MotionButton>
          </div>
        </div>
        <RecommendationsVertical
          recommendations={recommendations}
          isEditing={true}
          variant={RecommendationWidgetVariant.Dialog}
        />
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          `}
        >
          <MotionButton type="button" onClick={props.onClose}>
            Cancel
          </MotionButton>
          <MotionButton type="button" onClick={onSaveClick}>
            Save
          </MotionButton>
        </div>
      </div>
    </Dialog>
  );
};
