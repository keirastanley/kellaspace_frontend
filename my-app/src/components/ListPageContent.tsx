/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Dispatch, useState } from "react";
import { useNavigate } from "react-router";
import { ListForDisplay } from "../interfaces";
import { Image } from "./Image";
import { RecommendationsVertical } from "../sections/RecommendationsVertical";
import { ListAction } from "../interfaces/actions";
import { EditableWrapper } from "./EditableWrapper";
import { Dialog } from "./Dialog";

export const ListPageContent = ({
  isFavourites = false,
  list,
  setList,
}: {
  isFavourites?: boolean;
  list: ListForDisplay;
  setList?: Dispatch<React.SetStateAction<ListForDisplay | undefined>>;
}) => {
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [titleInput, setTitleInput] = useState<string>();
  const [editingFields, setEditingFields] = useState<string[]>([]);
  const navigate = useNavigate();

  if (!isFavourites && !setList) {
    throw new Error("Must pass in setList when not favourites page");
  }

  return (
    <>
      <Dialog
        open={selectedActions.includes(ListAction.Delete)}
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
            <button>Cancel</button>
          </div>
        </div>
      </Dialog>
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
          {isFavourites && setList ? (
            <EditableWrapper
              isEditing={{
                list: isEditing,
                field: editingFields.includes("title"),
              }}
              onDoneClick={() => {
                setEditingFields((prevEditingFields) =>
                  prevEditingFields.filter(
                    (prevEditingField) => prevEditingField !== "title"
                  )
                );
                setList((prevList) => {
                  if (prevList && titleInput) {
                    return { ...prevList, title: titleInput };
                  }
                  return prevList;
                });
              }}
              onEditFieldClick={() =>
                setEditingFields((prevEditingFields) =>
                  Array.from(new Set([...prevEditingFields, "title"]))
                )
              }
            >
              {editingFields.includes("title") ? (
                <input
                  placeholder={list.title}
                  onChange={(e) => setTitleInput(e.target.value)}
                />
              ) : (
                <h1>{list.title}</h1>
              )}
            </EditableWrapper>
          ) : (
            <h1>{list.title}</h1>
          )}
          <p>Created by {list.createdBy}</p>
        </div>
      </div>
      <div
        css={css`
          flex: 1 1 auto;
          overflow: hidden;
        `}
      >
        {list.contents && (
          <RecommendationsVertical
            actions={Object.values(ListAction)}
            recommendations={list.contents}
            showFilters={selectedActions.includes(ListAction.Filter)}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            selectedActions={selectedActions}
            setSelectedActions={setSelectedActions}
          />
        )}
      </div>
    </>
  );
};
