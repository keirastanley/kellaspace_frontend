import { useState } from "react";
import { RadioGroup } from "./RadioGroup/RadioGroup";
import { SortingType } from "../interfaces/actions";

export const SortByRadioGroup = ({
  selectedSorting,
  setSelectedSorting,
}: {
  selectedSorting?: string;
  setSelectedSorting: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const radioLabels = Object.values(SortingType);
  const [order, setOrder] = useState<SortingType[]>(radioLabels);

  return (
    <RadioGroup
      selectedRadio={selectedSorting}
      setSelectedRadio={setSelectedSorting}
      order={order}
    >
      {radioLabels.map((sortingType) => (
        <RadioGroup.Field
          radioName={sortingType}
          onChange={() => {
            setSelectedSorting(sortingType);
            if (sortingType === SortingType.dateAddedAscending) {
              setOrder([
                SortingType.dateAddedAscending,
                SortingType.dateAddedDescending,
                SortingType.titleAscending,
                SortingType.titleDescending,
              ]);
            }
            if (sortingType === SortingType.dateAddedDescending) {
              setOrder([
                SortingType.dateAddedDescending,
                SortingType.dateAddedAscending,
                SortingType.titleAscending,
                SortingType.titleDescending,
              ]);
            }
            if (sortingType === SortingType.titleAscending) {
              setOrder([
                SortingType.titleAscending,
                SortingType.titleDescending,
                SortingType.dateAddedAscending,
                SortingType.dateAddedDescending,
              ]);
            }
            if (sortingType === SortingType.titleDescending) {
              setOrder([
                SortingType.titleDescending,
                SortingType.titleAscending,
                SortingType.dateAddedAscending,
                SortingType.dateAddedDescending,
              ]);
            }
          }}
        >
          {sortingType}
        </RadioGroup.Field>
      ))}
    </RadioGroup>
  );
};
