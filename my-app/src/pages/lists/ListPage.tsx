/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { mockLists } from "../../data";
import { ListForDisplay, ListAction, Recommendation } from "../../interfaces";
import { PageWrapper } from "../../components";
import { ListPageContent } from "./components/ListPageContent/ListPageContent";
import { useUserData } from "../../providers";

export const ListPage = () => {
  const { userData } = useUserData();
  const recommendations = userData?.recommendations;
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
          (recommendations ?? []).find(
            ({ id }) => id === recommendationId
          ) as Recommendation
      ),
    [list, recommendations]
  );

  const mediaTypes = useMemo(
    () => Array.from(new Set(listContents?.map(({ mediaType }) => mediaType))),
    [listContents]
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

  const actions = Object.values(ListAction).filter((action) =>
    mediaTypes && mediaTypes.length <= 1 ? action !== ListAction.Filter : true
  );

  const filteredActions = useMemo(() => {
    return (
      actions?.filter((action) => {
        const isEmptyList =
          list && (!list.contents || list.contents.length < 1);
        if (isEmptyList) {
          return action === ListAction.Delete;
        }
        const hasSingleMediaType = mediaTypes && mediaTypes.length <= 1;
        if (hasSingleMediaType) {
          return action !== ListAction.Filter;
        }
        return true;
      }) ?? undefined
    );
  }, [actions, list, mediaTypes]);

  return (
    <PageWrapper
      initialList={list}
      actions={filteredActions}
      mediaTypes={mediaTypes}
    >
      {listForDisplay && <ListPageContent />}
    </PageWrapper>
  );
};
