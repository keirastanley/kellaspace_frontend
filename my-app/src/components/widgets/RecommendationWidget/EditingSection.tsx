/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Checkmark } from "../../shared";
import { useList } from "../../../providers";
import { Recommendation } from "../../../interfaces";
import { useMemo } from "react";

export const EditingSection = ({
  recommendation,
}: {
  recommendation: Recommendation;
}) => {
  const { list, updatedList, setUpdatedList } = useList();

  const isChecked = useMemo(() => {
    if (updatedList) {
      return !!updatedList.contents?.includes(recommendation);
    }
    return !!list.contents?.includes(recommendation);
  }, [updatedList]);

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
        checked={isChecked}
        onChange={() =>
          setUpdatedList((prevUpdatedList) => {
            const baseList = prevUpdatedList ?? list;
            if (baseList && baseList.contents) {
              const indexOfList = baseList.contents.indexOf(recommendation);

              return {
                ...baseList,
                contents: [
                  ...baseList.contents.slice(0, indexOfList),
                  ...baseList.contents.slice(indexOfList + 1),
                ],
              };
            }
          })
        }
      />
    </div>
  );
};
