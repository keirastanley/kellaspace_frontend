import { MediaType } from "../interfaces/recommendations";
import { CheckboxGroup } from "./CheckboxGroup/CheckboxGroup";

export const FilterByTypeCheckboxGroup = ({
  mediaTypes,
  selectedFilters,
  setSelectedFilters,
}: {
  mediaTypes: MediaType[];
  selectedFilters: MediaType[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<MediaType[]>>;
}) => {
  return (
    <CheckboxGroup
      variant="withAll"
      checkboxLabels={mediaTypes}
      selectedCheckboxes={selectedFilters}
      setSelectedCheckboxes={setSelectedFilters}
    />
  );
};
