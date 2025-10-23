import { useMemo } from "react";
import styled from "@emotion/styled";
import {
  FavouritesListSummary,
  ListSummary,
  PageWrapper,
} from "../../components";
import { Link } from "react-router";
import { useUserData } from "../../providers";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export const ListsPage = () => {
  const {
    userData: { recommendations, lists },
  } = useUserData();
  const showFavourites = useMemo(
    () => recommendations && recommendations.some(({ favourite }) => favourite),
    [recommendations]
  );
  const showLists = useMemo(() => lists && lists.length > 0, [recommendations]);
  return (
    <PageWrapper>
      <h1>Your lists</h1>
      {showFavourites || showLists ? (
        <ListsContainer>
          {showFavourites && (
            <StyledLink to={"favourites"}>
              <FavouritesListSummary />
            </StyledLink>
          )}
          {lists &&
            lists.map((list) => (
              <StyledLink to={list.id} key={list.id + "-list"}>
                <ListSummary list={list} />
              </StyledLink>
            ))}
        </ListsContainer>
      ) : recommendations && recommendations.length > 0 ? (
        <div>Add something to a list</div>
      ) : (
        <div>
          <Link to="/add-new">Add something new</Link> to start making lists.
        </div>
      )}
    </PageWrapper>
  );
};
