import { RecommendationWidget } from "../components/RecommendationWidget/RecommendationWidget";
import { Recommendation } from "../interfaces/recommendations";

function sortByDate<Item extends { dateAdded: string }>(items: Item[]) {
  return items.sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );
}

export const NewRecommendations = ({
  recommendations,
}: {
  recommendations: Recommendation[];
}) => {
  const mostRecentRecommendations = sortByDate(recommendations).slice(0, 10);

  return (
    <div>
      <h2>✨ New</h2>
      {mostRecentRecommendations.map((recommendation) => (
        <RecommendationWidget
          recommendation={recommendation}
          key={recommendation.title + recommendation.dateAdded}
        />
      ))}
    </div>
  );
};
