import { useState } from "react";
import { FilterByTypeCheckboxGroup } from "./components/RecommendationWidget/FilterByTypeCheckboxGroup";
import { NewRecommendations } from "./sections/NewRecommendations";
import { RecommendationFilter } from "./interfaces/recommendationFilters";
import { mockRecommendations } from "./data/mockRecommendations";
import { Recommendation } from "./interfaces/recommendations";
import { RecommendationWidget } from "./components/RecommendationWidget/RecommendationWidget";

const sortRecommendationsByDate = (recommendations: Recommendation[]) =>
  recommendations.sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );

function App() {
  const [selectedFilters, setSelectedFilters] = useState<
    RecommendationFilter[]
  >([]);

  const recommendaitonsSortedByDate =
    sortRecommendationsByDate(mockRecommendations);
  const recentRecommendations = recommendaitonsSortedByDate.slice(0, 5);
  const remainingRecommendations = recommendaitonsSortedByDate.slice(6);

  return (
    <>
      <h1>Welcome to kellaspace</h1>
      <NewRecommendations recentRecommendations={recentRecommendations} />
      <FilterByTypeCheckboxGroup
        mediaTypes={Array.from(
          new Set(mockRecommendations.map(({ mediaType }) => mediaType))
        )}
        selectedFilters={selectedFilters}
        onChange={(e) => {
          const filter = e.target.value as RecommendationFilter;
          setSelectedFilters((prevFilters) => {
            if (filter === "All") {
              return ["All"];
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
      {remainingRecommendations.map((recommendation) => (
        <RecommendationWidget
          recommendation={recommendation}
          key={recommendation.title + recommendation.dateAdded}
          width="100%"
        />
      ))}
    </>
  );
}

export default App;
