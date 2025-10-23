/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { ListAction, MediaType } from "../interfaces";
import {
  ActionCheckboxGroup,
  ConditionalFieldWrapper,
  FilterByTypeCheckboxGroup,
  SortByRadioGroup,
} from "../components";
import { useActions, useUserData } from "../providers";

export const ActionsSection = () => {
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
