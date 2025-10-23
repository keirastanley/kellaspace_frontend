import * as motion from "motion/react-client";
import styled from "@emotion/styled";
import "../../../index.css";
import { List } from "../../../interfaces";
import { ListSummary } from "../../summaries";
import { Checkmark } from "../../shared";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MotionLabel = styled(motion.label)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin: 0px 10px 0px 10px;
`;

export const Lists = ({
  lists,
  selectedListIds,
  onChange,
}: {
  lists: List[];
  selectedListIds: List["id"][];
  onChange: (listId: List["id"]) => void;
}) => (
  <ListsContainer>
    {lists.map((list) => {
      const checked = selectedListIds.includes(list.id);

      return (
        <MotionLabel
          key={list.id + "-lists"}
          whileTap={{ backgroundColor: "rgba(128, 128, 128, 0.5)" }}
        >
          <ListSummary list={list} />
          <Checkmark checked={checked} onChange={() => onChange(list.id)} />
        </MotionLabel>
      );
    })}
  </ListsContainer>
);
