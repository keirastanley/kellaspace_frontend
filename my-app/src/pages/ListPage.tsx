/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { mockLists } from "../data/mockLists";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { ListForDisplay, Recommendation } from "../interfaces";
import { PageWrapper } from "../components/PageWrapper";
import { ListPageContent } from "../components/ListPageContent";

export const ListPage = () => {
  const { recommendations } = useRecommendations();
  const { list_id } = useParams();
  const [listForDisplay, setListForDisplay] = useState<ListForDisplay>();

  const list = useMemo(
    () => mockLists.find(({ id }) => id === list_id),
    [list_id]
  );

  const listContents = useMemo(
    () =>
      list?.contents?.map(
        (recommendationId) =>
          recommendations.find(
            ({ id }) => id === recommendationId
          ) as Recommendation
      ),
    [list, recommendations]
  );

  useEffect(() => {
    if (list) {
      const { contents, ...listWithoutContents } = list;
      setListForDisplay({
        ...listWithoutContents,
        ...(listContents && { contents: listContents }),
      });
    }
  }, [list]);

  return (
    <PageWrapper>
      {listForDisplay && (
        <ListPageContent list={listForDisplay} setList={setListForDisplay} />
      )}
    </PageWrapper>
  );
};
