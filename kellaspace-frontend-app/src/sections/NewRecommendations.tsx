import { RecommendationWidget } from "../components/RecommendationWidget/RecommendationWidget";
import { MediaType } from "../interfaces/recommendations";

const recommendations = [
  {
    title: "Mulholland Drive",
    addedBy: "keira",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet erat et.",
    mediaType: MediaType.Movie,
    image: {
      src: "https://upload.wikimedia.org/wikipedia/en/0/0f/Mulholland.png",
      alt: "Mulholland Drive film poster",
    },
    dateAdded: new Date().toISOString(),
  },
  {
    title: "Live It Out - Metric",
    addedBy: "keira",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet erat et.",
    mediaType: MediaType.Music,
    image: {
      src: "https://upload.wikimedia.org/wikipedia/en/3/3e/Live_it_Out_-_Cover.jpg",
      alt: "Live It Out album cover",
    },
    dateAdded: "2025-09-14T16:42:17.389Z",
  },
];

function sortByDate<Item extends { dateAdded: string }>(items: Item[]) {
  return items.sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );
}

export const NewRecommendations = () => {
  const mostRecentRecommendations = sortByDate(recommendations).slice(0, 10);

  return (
    <div>
      <h2>✨ New</h2>
      {mostRecentRecommendations.map((recommendation) => (
        <RecommendationWidget recommendation={recommendation} />
      ))}
    </div>
  );
};
