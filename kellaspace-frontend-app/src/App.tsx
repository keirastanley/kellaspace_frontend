import { useState } from "react";
import { FilterByTypeCheckboxGroup } from "./components/RecommendationWidget/FilterByTypeCheckboxGroup";
import { NewRecommendations } from "./sections/NewRecommendations";
import { RecommendationFilter } from "./interfaces/recommendationFilters";
import { mockRecommendations } from "./data/mockRecommendations";
import { Recommendation } from "./interfaces/recommendations";
import { RecommendationWidget } from "./components/RecommendationWidget/RecommendationWidget";
import { RecommendationWidgetVariant } from "./interfaces/recommendationWidget";

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
        setSelectedFilters={setSelectedFilters}
      />
      {remainingRecommendations.map((recommendation) => (
        <RecommendationWidget
          recommendation={recommendation}
          key={recommendation.title + recommendation.dateAdded}
          variant={RecommendationWidgetVariant.Expand}
        />
      ))}
    </>
  );
}

export default App;
