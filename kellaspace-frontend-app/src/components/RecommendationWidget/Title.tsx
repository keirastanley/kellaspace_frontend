import { Recommendation } from "../../interfaces/recommendations";

export const Title = ({
  title,
  addedBy,
}: Pick<Recommendation, "title" | "addedBy">) => {
  return (
    <p>
      <b>
        <i>{title}</i> added by {addedBy}
      </b>
    </p>
  );
};
