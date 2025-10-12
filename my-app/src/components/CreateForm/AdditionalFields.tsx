/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren, useEffect, useState } from "react";
import { AddButton } from "./AddButton";
import { TextAreaDialog } from "./TextAreaDialog";
import { TextInputDialog } from "./TextInputDialog";
import { useFormData } from "../../providers/FormDataProvider";
import { Icons } from "../Icons";
import { RecommendationFormData } from "../../interfaces";
import { motion, stagger } from "framer-motion";

const EditableWrapper = ({
  children,
  onClick,
}: PropsWithChildren & { onClick: () => void }) => (
  <div
    css={css`
      display: flex;
      gap: 10px;
    `}
  >
    {children}
    <Icons.EditSimple onClick={onClick} />
  </div>
);

const AdditionalField = ({
  children,
  fieldName,
  onEditClick,
}: PropsWithChildren & {
  fieldName: keyof RecommendationFormData;
  onEditClick: () => void;
}) => {
  const { formValues } = useFormData();
  return fieldName in formValues ? (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      <p>{fieldName.slice(0, 1).toUpperCase() + fieldName.slice(1)}</p>
      <EditableWrapper onClick={onEditClick}>
        <i>{formValues[fieldName] as string}</i>
      </EditableWrapper>
    </div>
  ) : (
    children
  );
};

export const AdditionalFields = () => {
  const [itemToAdd, setItemToAdd] = useState<string>();
  const { formValues } = useFormData();
  const [order, setOrder] = useState<(keyof RecommendationFormData)[]>([]);

  useEffect(() => {
    const formValuesArr = Object.values(formValues);
    if (
      formValuesArr.includes("link") ||
      formValuesArr.includes("description") ||
      formValuesArr.includes("message")
    ) {
      setOrder((prevOrder) => [
        ...prevOrder.filter((fieldName) => formValuesArr.includes(fieldName)),
        ...prevOrder.filter((fieldName) => !formValuesArr.includes(fieldName)),
      ]);
    }
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
      {(order.length > 0 ? order : ["link", "description", "message"]).map(
        (field) => (
          <motion.div
            key={field}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <AdditionalField
              fieldName={field as keyof RecommendationFormData}
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
        )
      )}

      <TextInputDialog
        open={itemToAdd === "link"}
        fieldName="link"
        label="Enter a link"
        type="url"
        onCancelClick={() => setItemToAdd(undefined)}
      />
      <TextAreaDialog
        open={itemToAdd === "description"}
        fieldName="description"
        label="Enter a description"
        onCancelClick={() => setItemToAdd(undefined)}
      />
      <TextAreaDialog
        open={itemToAdd === "message"}
        fieldName="message"
        label="Enter a message"
        onCancelClick={() => setItemToAdd(undefined)}
      />
    </motion.div>
  );
};
