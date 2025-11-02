/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useMemo } from "react";
import {
  NewRecommendations,
  RecommendationsVerticalSection,
} from "../sections";
import { sortRecommendationsByDate } from "../utils";
import { PageWrapper, UserHeader } from "../components";
import { HomeAction } from "../interfaces";
import { useUserData } from "../providers";
import { Link } from "react-router";
import { useLoader } from "../providers";
import { PageRoutes } from "../routes";

export const Home = () => {
  const { userData } = useUserData();
  const recommendations = userData?.recommendations;
  const remainingRecommendations = useMemo(
    () =>
      recommendations && recommendations.length > 0
        ? sortRecommendationsByDate(recommendations).slice(6)
        : [],
    [recommendations]
  );
  const { isLoading, setIsLoading } = useLoader();

  useEffect(() => {
    if (isLoading) {
      searchForMovie("test", () => setIsLoading(false));
    }
  }, []);

  return (
    <div>
      <UserHeader />

      <PageWrapper
        actions={Object.values(HomeAction)}
        mediaTypes={Array.from(
          new Set(remainingRecommendations.map(({ mediaType }) => mediaType))
        )}
      >
        <h1>Welcome to kellaspace</h1>
        {recommendations ? (
          <>
            <NewRecommendations
              recentRecommendations={sortRecommendationsByDate(
                recommendations
              ).slice(0, 5)}
            />
            {recommendations.length > 6 ? (
              <div
                css={css`
                  flex: 1 1 auto;
                  overflow: hidden;
                  width: 100%;
                `}
              >
                <RecommendationsVerticalSection
                  recommendations={remainingRecommendations}
                />
              </div>
            ) : (
              <div>
                This is place to save and share all the things you love.{" "}
                <Link to={`/${PageRoutes.CreateRecommendation}`}>
                  Add something new
                </Link>
                .
              </div>
            )}
          </>
        ) : (
          <div>
            This is place to save and share all the things you love.{" "}
            <Link to="/add-new">Add something new</Link> to get started.
          </div>
        )}
      </PageWrapper>
    </div>
  );
};
