import { AnimatePresence } from "framer-motion";
import { ListAction } from "../interfaces/actions";
import { ActionCheckboxGroup } from "./ActionCheckboxGroup";
import { ConditionalFieldWrapper } from "./ConditionalFieldWrapper";
import { FilterByTypeCheckboxGroup } from "./FilterByTypeCheckboxGroup";
import { SortByRadioGroup } from "./SortByRadioGroup";
import { useActions } from "../providers/ActionsProvider";
import { useMemo, useState } from "react";
import { useRecommendations } from "../providers/RecommendationsProvider";

export const ActionSection = () => {
  const { recommendations } = useRecommendations();
  const { mediaTypes, selectedActions } = useActions();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSorting, setSelectedSorting] = useState<string>();

  const showFilters = useMemo(
    () => selectedActions.includes(ListAction.Filter),
    [selectedActions]
  );
  const showSorting = useMemo(
    () => selectedActions.includes(ListAction.Sort),
    [selectedActions]
  );

  return (
    <>
      <ActionCheckboxGroup />
      <AnimatePresence>
        {mediaTypes && mediaTypes.length > 1 && showFilters && (
          <ConditionalFieldWrapper>
            <FilterByTypeCheckboxGroup
              mediaTypes={mediaTypes}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </ConditionalFieldWrapper>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {recommendations && showSorting && (
          <ConditionalFieldWrapper>
            <SortByRadioGroup
              selectedSorting={selectedSorting}
              setSelectedSorting={setSelectedSorting}
            />
          </ConditionalFieldWrapper>
        )}
      </AnimatePresence>
    </>
  );
};
