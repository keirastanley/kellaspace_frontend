import { ChangeEvent } from "react";
import { RecommendationFilter } from "../../interfaces/recommendationFilters";
import { MediaType } from "../../interfaces/recommendations";

export const FilterByTypeCheckboxGroup = ({
  selectedFilters,
  onChange,
  mediaTypes,
}: {
  selectedFilters?: RecommendationFilter[];
  mediaTypes: MediaType[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const filters: RecommendationFilter[] = ["All", ...mediaTypes];
  return (
    <div role="checkboxgroup">
      {filters.map((filter) => (
        <label key={filter} style={{ display: "block", marginBottom: 4 }}>
          <input
            type="checkbox"
            name={filter}
            value={filter}
            checked={selectedFilters?.includes(filter)}
            onChange={onChange}
          />
          {filter}
        </label>
      ))}
    </div>
  );
};
