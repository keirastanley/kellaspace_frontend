import { RecommendationFilter } from "../../interfaces/recommendationFilters";
import { MediaType } from "../../interfaces/recommendations";

export const FilterByTypeCheckboxGroup = ({
  selectedFilters,
  setSelectedFilters,
  mediaTypes,
}: {
  selectedFilters: RecommendationFilter[];
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<RecommendationFilter[]>
  >;
  mediaTypes: MediaType[];
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
            onChange={(e) => {
              const filter = e.target.value as RecommendationFilter;
              setSelectedFilters((prevFilters) => {
                if (filter === "All") {
                  return filters;
                }

                const filteredByAll = prevFilters.includes("All");

                if (prevFilters.includes(filter)) {
                  const indexOfFilterToRemove = prevFilters.indexOf(filter);
                  return [
                    ...prevFilters.slice(
                      filteredByAll ? 1 : 0,
                      indexOfFilterToRemove
                    ),
                    ...prevFilters.slice(indexOfFilterToRemove + 1),
                  ];
                }

                return [
                  ...(filteredByAll ? prevFilters.slice(1) : prevFilters),
                  filter,
                ];
              });
            }}
          />
          {filter}
        </label>
      ))}
    </div>
  );
};
