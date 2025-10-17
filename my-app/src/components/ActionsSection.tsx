/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AnimatePresence } from "framer-motion";
import { ListAction } from "../interfaces/actions";
import { ActionCheckboxGroup } from "./ActionCheckboxGroup";
import { ConditionalFieldWrapper } from "./ConditionalFieldWrapper";
import { FilterByTypeCheckboxGroup } from "./FilterByTypeCheckboxGroup";
import { SortByRadioGroup } from "./SortByRadioGroup";
import { useActions } from "../providers/ActionsProvider";
import { Dispatch, SetStateAction, useMemo } from "react";
import { MediaType } from "../interfaces";
import { useUserData } from "../providers/UserDataProvider";

export const ActionSection = () => {
  const {
    userData: { recommendations },
  } = useUserData();
  const {
    mediaTypes,
    selectedActions,
    selectedFilters,
    setSelectedFilters,
    selectedSorting,
    setSelectedSorting,
  } = useActions();

  const showFilters = useMemo(
    () =>
      mediaTypes &&
      mediaTypes.length > 1 &&
      selectedActions.includes(ListAction.Filter),
    [selectedActions, mediaTypes]
  );
  const showSorting = useMemo(
    () => selectedActions.includes(ListAction.Sort),
    [selectedActions]
  );

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
      `}
    >
      <ActionCheckboxGroup />
      <AnimatePresence>
        {showFilters && (
          <ConditionalFieldWrapper>
            <FilterByTypeCheckboxGroup
              mediaTypes={mediaTypes as MediaType[]}
              selectedFilters={selectedFilters}
              setSelectedFilters={
                setSelectedFilters as Dispatch<SetStateAction<string[]>>
              }
            />
          </ConditionalFieldWrapper>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {recommendations && recommendations.length > 0 && showSorting && (
          <ConditionalFieldWrapper>
            <SortByRadioGroup
              selectedSorting={selectedSorting}
              setSelectedSorting={
                setSelectedSorting as Dispatch<
                  SetStateAction<string | undefined>
                >
              }
            />
          </ConditionalFieldWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};
