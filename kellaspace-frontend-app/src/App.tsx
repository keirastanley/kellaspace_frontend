import { RecommendationWidget } from "./components/RecommendationWidget/RecommendationWidget";
import { MediaType } from "./interfaces/recommendations";

function App() {
  return (
    <>
      <h1>Welcome to kellaspace</h1>
      <h2>✨ New</h2>
      <RecommendationWidget
        recommendation={{
          title: "Mulholland Drive",
          addedBy: "keira",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sit amet erat et.",
          mediaType: MediaType.Movie,
          image: {
            src: "https://upload.wikimedia.org/wikipedia/en/0/0f/Mulholland.png",
            alt: "Mulholland Drive film poster",
          },
        }}
      />
    </>
  );
}

export default App;
