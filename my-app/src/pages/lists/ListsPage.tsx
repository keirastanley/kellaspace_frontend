import { useMemo } from "react";
import styled from "@emotion/styled";
import {
  FavouritesListSummary,
  ListSummary,
  PageWrapper,
} from "../../components";
import { Link } from "react-router";
import { useUserData } from "../../providers";
import { PageRoutes } from "../../interfaces";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 5px 15px;
  width: max-content;
  font-size: 12px;
  text-align: center;
  border-radius: 15px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: white;
`;

export const ListsPage = () => {
  const { userData } = useUserData();
  const recommendations = userData?.recommendations;
  const lists = userData?.lists;
  const showFavourites = useMemo(
    () => recommendations && recommendations.some(({ favourite }) => favourite),
    [recommendations]
  );
  const showLists = useMemo(() => lists && lists.length > 0, [recommendations]);
  return (
    <PageWrapper>
      <h1>Your lists</h1>
      <ButtonLink to={`/${PageRoutes.CreateList}`}>Make a new list</ButtonLink>
      {showFavourites ||
        (showLists && (
          <ListsContainer>
            {showFavourites && (
              <StyledLink to={`/${PageRoutes.Favourites}`}>
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
        ))}
    </PageWrapper>
  );
};
