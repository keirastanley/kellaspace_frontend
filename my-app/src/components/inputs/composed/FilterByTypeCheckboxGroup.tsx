import { useEffect, useState } from "react";
import { MediaType } from "../../../interfaces";
import {
  CheckboxGroup,
  CheckboxGroupVariant,
} from "../CheckboxGroup/CheckboxGroup";
import { toggleValuePresentInArr } from "../../../utils";

export const FilterByTypeCheckboxGroup = ({
  mediaTypes,
  selectedFilters,
  setSelectedFilters,
}: {
  mediaTypes: MediaType[];
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >;
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
      variant={CheckboxGroupVariant.WithAll}
      values={selectedFilters}
      setValues={setSelectedFilters}
    >
      {mediaTypes.map((mediaType) => (
        <CheckboxGroup.Field
          checkboxName={mediaType}
          onChange={() => {
            setSelectedFilters((prevSelectedFilters) =>
              toggleValuePresentInArr(mediaType, prevSelectedFilters)
            );
          }}
        >
          {mediaType}
        </CheckboxGroup.Field>
      ))}
    </CheckboxGroup>
  );
};
