import { useEffect, useState } from "react";
import { MediaType } from "../../../interfaces/recommendations";
import { CheckboxGroup } from "../CheckboxGroup/CheckboxGroup";

export const FilterByTypeCheckboxGroup = ({
  mediaTypes,
  selectedFilters,
  setSelectedFilters,
}: {
  mediaTypes: MediaType[];
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [order, setOrder] = useState<string[]>();

  useEffect(() => {
    const newOrder = [
      ...selectedFilters,
      ...(order ?? mediaTypes).filter(
        (item) => !selectedFilters.includes(item)
      ),
    ];
    setOrder(newOrder);
  }, [selectedFilters]);

  return (
    <CheckboxGroup
      variant="withAll"
      checkboxLabels={mediaTypes}
      selectedCheckboxes={selectedFilters}
      setSelectedCheckboxes={setSelectedFilters}
      order={order}
    >
      {mediaTypes.map((mediaType) => (
        <CheckboxGroup.Field checkboxName={mediaType}>
          {mediaType}
        </CheckboxGroup.Field>
      ))}
    </CheckboxGroup>
  );
};
