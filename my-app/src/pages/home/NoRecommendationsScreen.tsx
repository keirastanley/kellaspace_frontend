import { Link } from "react-router";
import { PageRoutes } from "../../interfaces";

export const NoRecommendationsScreen = () => {
  return (
    <div>
      This is place to save and share all the things you love.{" "}
      <Link to={`/${PageRoutes.CreateRecommendation}`}>Add something new</Link>{" "}
      to get started.
    </div>
  );
};
