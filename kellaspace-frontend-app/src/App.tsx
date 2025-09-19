import { useState } from "react";
import { FilterByTypeCheckboxGroup } from "./components/RecommendationWidget/FilterByTypeCheckboxGroup";
import { MediaType } from "./interfaces/recommendations";
import { NewRecommendations } from "./sections/NewRecommendations";
import { RecommendationFilter } from "./interfaces/recommendationFilters";

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

function App() {
  const [selectedFilters, setSelectedFilters] = useState<
    RecommendationFilter[]
  >([]);

  return (
    <>
      <h1>Welcome to kellaspace</h1>
      <NewRecommendations recommendations={recommendations} />
      <FilterByTypeCheckboxGroup
        mediaTypes={recommendations.map(({ mediaType }) => mediaType)}
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
    </>
  );
}

export default App;
