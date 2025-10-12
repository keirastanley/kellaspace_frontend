/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Checkmark } from "../AddToListMenu/Checkmark";
import { useList } from "../../providers/ListProvider";
import { Recommendation } from "../../interfaces";

export const EditingSection = ({
  recommendation,
}: {
  recommendation: Recommendation;
}) => {
  const { list, updatedList, setUpdatedList } = useList();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        margin-right: 10px;
      `}
    >
      <Checkmark
        checked={!!(updatedList ?? list)?.contents?.includes(recommendation)}
        onChange={() =>
          setUpdatedList(() => {
            if (list && list?.contents) {
              const indexOfList = list.contents.indexOf(recommendation);

              return {
                ...list,
                contents: [
                  ...list.contents.slice(0, indexOfList),
                  ...list.contents.slice(indexOfList + 1),
                ],
              };
            }
          })
        }
      />
    </div>
  );
};
