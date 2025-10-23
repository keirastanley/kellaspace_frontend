/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentProps, useState } from "react";
import {
  Dialog,
  RecommendationsVertical,
  Icons,
  MotionButton,
  TextInput,
} from "../../../../components";
import {
  Recommendation,
  RecommendationWidgetVariant,
} from "../../../../interfaces";
import { DialogVariant } from "../../../../interfaces/dialog";

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
              <TextInput
                placeholder={title}
                onChange={(e) => onTitleChange(e.target.value)}
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
