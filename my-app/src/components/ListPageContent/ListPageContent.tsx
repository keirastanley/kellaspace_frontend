/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router";
import { Image } from "../Image";
import { RecommendationsVertical } from "../../sections/RecommendationsVertical";
import { ListAction } from "../../interfaces/actions";
import { Dialog } from "../Dialog";
import { useActions } from "../../providers/ActionsProvider";
import { useList } from "../../providers/ListProvider";
import { EditListDialog } from "./EditListDialog";

export const ListPageContent = () => {
  const { selectedActions, setSelectedActions } = useActions();
  const navigate = useNavigate();

  const { list, setList, updatedList: newList } = useList();

  return (
    <>
      <Dialog
        open={selectedActions.includes(ListAction.Delete)}
        onClose={() => setSelectedActions([])}
      >
        <div>
          <h1>Are you sure you want to delete {list?.title}?</h1>
          <div>
            <button
              onClick={() => {
                navigate("/lists");
              }}
            >
              Delete
            </button>
            <button onClick={() => setSelectedActions([])}>Cancel</button>
          </div>
        </div>
      </Dialog>
      <EditListDialog
        open={selectedActions.includes(ListAction.Edit)}
        onClose={() => {
          setSelectedActions((prevSelectedActions) =>
            prevSelectedActions.filter(
              (prevSelectedAction) => prevSelectedAction !== ListAction.Edit
            )
          );
        }}
      />
      <div
        css={css`
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: 100%;
        `}
      >
        <Image
          src={list?.image?.src}
          style={{ width: "200px", borderRadius: "6px", alignSelf: "center" }}
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            width: 100%;
          `}
        >
          <p>Created by {list?.createdBy}</p>
        </div>
      </div>
      <div
        css={css`
          flex: 1 1 auto;
          overflow: hidden;
        `}
      >
        <RecommendationsVertical
          recommendations={list?.contents}
          onSave={() => setList(newList)}
        />
      </div>
    </>
  );
};
