/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router";
import { Dialog, Image } from "../../../../components";
import { RecommendationsVerticalSection } from "../../../../sections";
import { ListAction } from "../../../../interfaces";
import { useActions, useList } from "../../../../providers";
import { EditListDialog } from "./EditListDialog";
import { useState } from "react";

export const ListPageContent = () => {
  const [updatedTitle, setUpdatedTitle] = useState<string>();
  const { selectedActions, setSelectedActions } = useActions();
  const navigate = useNavigate();

  const { list, setList, updatedList } = useList();

  return (
    <>
      <Dialog
        open={selectedActions?.includes(ListAction.Delete)}
        onClose={() => setSelectedActions([])}
      >
        <div>
          <h1>Are you sure you want to delete {list.title}?</h1>
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
      {list.contents && (
        <EditListDialog
          recommendations={list.contents}
          open={selectedActions?.includes(ListAction.Edit)}
          onClose={() => {
            setSelectedActions((prevSelectedActions) =>
              (prevSelectedActions || []).filter(
                (prevSelectedAction) => prevSelectedAction !== ListAction.Edit,
              ),
            );
          }}
          onSaveClick={() => {
            if (updatedList) {
              setList(updatedList);
            }
            if (updatedTitle) {
              setList((prevList) => ({ ...prevList, title: updatedTitle }));
            }
            setSelectedActions((prevSelectedActions) =>
              (prevSelectedActions || []).filter(
                (prevSelectedAction) => prevSelectedAction !== ListAction.Edit,
              ),
            );
          }}
          title={updatedTitle ?? list.title}
          onTitleChange={(title) => setUpdatedTitle(title)}
        />
      )}
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
          src={list.image?.src}
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
          <h1>{list.title}</h1>
          <p>Created by {list.createdBy}</p>
        </div>
      </div>
      <div
        css={css`
          flex: 1 1 auto;
          overflow: hidden;
          width: 100%;
        `}
      >
        <RecommendationsVerticalSection recommendations={list.contents} />
      </div>
    </>
  );
};
