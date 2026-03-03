import { Link } from "react-router";
import { PageRoutes } from "../../interfaces";

export const NoActivityScreen = () => (
  <div>
    This is where you'll see everything that you add and everything that's
    shared with you.{" "}
    <Link to={`/${PageRoutes.CreateRecommendation}`}>Add something new</Link> to
    get started.
  </div>
);
