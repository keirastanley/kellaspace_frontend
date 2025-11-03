/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren, useEffect, useState } from "react";
import { AddButton } from "../../../add-new-recommendation/components/CreateForm/AddButton";
import { TextAreaDialog } from "../../../../components/shared/TextAreaDialog";
import { Icons } from "../../../../components";
import { motion, stagger } from "framer-motion";
import { EditableStringListKey } from "../../../../interfaces";
import { useListForm } from "../../../../providers/ListFormProvider";

const EditableWrapper = ({
  children,
  onClick,
}: PropsWithChildren & { onClick: () => void }) => (
  <div
    css={css`
      display: flex;
      gap: 5px;
    `}
  >
    {children}
    <Icons.Edit onClick={onClick} />
  </div>
);

const AdditionalField = ({
  children,
  fieldName,
  onEditClick,
}: PropsWithChildren & {
  fieldName: EditableStringListKey;
  onEditClick: () => void;
}) => {
  const { listFormData } = useListForm();
  const MAX_DISPLAY_LENGTH = 45;
  return listFormData && fieldName in listFormData ? (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 5px;
      `}
    >
      <EditableWrapper onClick={onEditClick}>
        <h2>{fieldName.slice(0, 1).toUpperCase() + fieldName.slice(1)}</h2>
      </EditableWrapper>
      <div
        css={css`
          display: flex;
          gap: 10px;
        `}
      >
        <i
          css={css`
            font-size: 14px;
          `}
        >
          {(listFormData[fieldName] as string).length > MAX_DISPLAY_LENGTH
            ? listFormData[fieldName]?.slice(0, MAX_DISPLAY_LENGTH) + "..."
            : listFormData[fieldName]}
        </i>
      </div>
    </div>
  ) : (
    children
  );
};

export const AdditionalListFields = ({
  fieldNames = ["description"],
}: {
  fieldNames?: EditableStringListKey[];
}) => {
  const [itemToAdd, setItemToAdd] = useState<string>();
  const { listFormData, setListFormData } = useListForm();
  const [order, setOrder] = useState<EditableStringListKey[]>(fieldNames);

  useEffect(() => {
    const formValuesArr = listFormData ? Object.keys(listFormData) : [];
    setOrder((prevOrder) => [
      ...prevOrder.filter((fieldName) => formValuesArr.includes(fieldName)),
      ...prevOrder.filter((fieldName) => !formValuesArr.includes(fieldName)),
    ]);
  }, [listFormData]);

  return (
    <motion.div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: stagger(0.3),
          },
        },
      }}
      initial="hidden"
      animate="show"
    >
      {order.map((field) => (
        <motion.div
          key={field}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <AdditionalField
            fieldName={field}
            onEditClick={() => setItemToAdd(field)}
          >
            <AddButton
              buttonText={`Add a ${field}`}
              onClick={() => {
                setItemToAdd(field);
              }}
            />
          </AdditionalField>
        </motion.div>
      ))}
      <TextAreaDialog
        open={itemToAdd === "description"}
        onSaveClick={(description) =>
          setListFormData((prevFormValues) => ({
            ...prevFormValues,
            description,
          }))
        }
        label="Enter a description"
        defaultValue={listFormData?.description}
        onCancelClick={() => setItemToAdd(undefined)}
      />
    </motion.div>
  );
};
