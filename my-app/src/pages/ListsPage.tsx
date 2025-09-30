import { mockLists } from "../data/mockLists";
import { ListSummary } from "../components/ListSummary";
import styled from "@emotion/styled";
import { FavouritesList } from "../components/FavouritesList";
import { Link } from "react-router";
import { PageWrapper } from "../components/PageWrapper";

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
  return (
    <PageWrapper>
      <h1>Your lists</h1>
      <ListsContainer>
        <StyledLink to={"favourites_list"}>
          <FavouritesList />
        </StyledLink>
        {mockLists.map((mockList) => (
          <StyledLink to={mockList.id} key={mockList.id}>
            <ListSummary list={mockList} />
          </StyledLink>
        ))}
      </ListsContainer>
    </PageWrapper>
  );
};
