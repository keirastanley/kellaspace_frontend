import { RecommendationWidget } from "../components/RecommendationWidget/RecommendationWidget";
import { Recommendation } from "../interfaces/recommendations";

export const NewRecommendations = ({
  recentRecommendations,
}: {
  recentRecommendations: Recommendation[];
}) => {
  return (
    <div>
      <h2>✨ New</h2>
      {recentRecommendations.map((recommendation) => (
        <RecommendationWidget
          recommendation={recommendation}
          key={recommendation.title + recommendation.dateAdded}
        />
      ))}
    </div>
  );
};
