/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren, useEffect, useState } from "react";
import { AddButton } from "../../pages/add-new-recommendation/components/CreateForm/AddButton";
import { TextAreaDialog } from "./TextAreaDialog";
import { TextInputDialog } from "../../pages/add-new-recommendation/components/CreateForm/TextInputDialog";
import { useFormData } from "../../providers";
import { Icons } from "..";
import { motion, stagger } from "framer-motion";
import { EditableStringFormDataFieldKey } from "../../interfaces";

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
  fieldName: EditableStringFormDataFieldKey;
  onEditClick: () => void;
}) => {
  const { formValues } = useFormData();
  const MAX_DISPLAY_LENGTH = 45;
  return formValues && fieldName in formValues ? (
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
          {(formValues[fieldName] as string).length > MAX_DISPLAY_LENGTH
            ? formValues[fieldName]?.slice(0, MAX_DISPLAY_LENGTH) + "..."
            : formValues[fieldName]}
        </i>
      </div>
    </div>
  ) : (
    children
  );
};

export const AdditionalRecommendationFields = ({
  fieldNames = ["link", "message"],
}: {
  fieldNames?: EditableStringFormDataFieldKey[];
}) => {
  const [itemToAdd, setItemToAdd] = useState<string>();
  const { formValues, setFormValues } = useFormData();
  const [order, setOrder] =
    useState<EditableStringFormDataFieldKey[]>(fieldNames);

  useEffect(() => {
    const formValuesArr = formValues ? Object.keys(formValues) : [];
    setOrder((prevOrder) => [
      ...prevOrder.filter((fieldName) => formValuesArr.includes(fieldName)),
      ...prevOrder.filter((fieldName) => !formValuesArr.includes(fieldName)),
    ]);
  }, [formValues]);

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
      <TextInputDialog
        open={itemToAdd === "link"}
        fieldName="link"
        label="Enter a link"
        type="url"
        onCancelClick={() => setItemToAdd(undefined)}
      />
      <TextAreaDialog
        open={itemToAdd === "message"}
        label="Enter a message"
        defaultValue={formValues?.message}
        onCancelClick={() => setItemToAdd(undefined)}
        onSaveClick={(message) =>
          setFormValues((prevFormValues) => ({ ...prevFormValues, message }))
        }
      />
      <TextAreaDialog
        open={itemToAdd === "description"}
        onSaveClick={(description) =>
          setFormValues((prevFormValues) => ({
            ...prevFormValues,
            description,
          }))
        }
        label="Enter a description"
        defaultValue={formValues?.description}
        onCancelClick={() => setItemToAdd(undefined)}
      />
    </motion.div>
  );
};
