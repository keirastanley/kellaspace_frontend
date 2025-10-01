import { MediaType } from "../interfaces/recommendations";
import { CheckboxGroup } from "./CheckboxGroup/CheckboxGroup";

export const FilterByTypeCheckboxGroup = ({
  mediaTypes,
  selectedFilters,
  setSelectedFilters,
}: {
  mediaTypes: MediaType[];
  selectedFilters: MediaType[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <CheckboxGroup
      variant="withAll"
      checkboxLabels={mediaTypes}
      selectedCheckboxes={selectedFilters}
      setSelectedCheckboxes={setSelectedFilters}
    >
      {mediaTypes.map((mediaType) => (
        <CheckboxGroup.Field checkboxName={mediaType}>
          {mediaType}
        </CheckboxGroup.Field>
      ))}
    </CheckboxGroup>
  );
};
