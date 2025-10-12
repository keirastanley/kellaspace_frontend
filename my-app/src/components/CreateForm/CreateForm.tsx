/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FormEvent } from "react";
import { TextInput } from "./TextInput";
import { MediaTypeRadioGroup } from "./MediaTypeRadioGroup";
import { useFormData } from "../../providers/FormDataProvider";
import { RecommendationFormData } from "../../interfaces";
import { AdditionalFields } from "./AdditionalFields";
import { AnimatePresence, motion } from "framer-motion";
import { ConditionalFieldWrapper } from "../ConditionalFieldWrapper";
import { useDebounce } from "../../hooks/useDebounce";

export const CreateForm = ({
  onSubmit,
}: {
  onSubmit: (formData: RecommendationFormData) => void;
}) => {
  const { isValid, formValues, setFormValues } = useFormData();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(formValues as RecommendationFormData);
    }
  };

  const debouncedTitle = useDebounce(formValues.title, 500);
  const debouncedMediaType = useDebounce(formValues.mediaType, 500);
  const showAddButton = useDebounce(
    !!(formValues.title && debouncedMediaType && isValid),
    800
  );

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="form-title"
      css={css`
        display: flex;
        flex-direction: column;
        gap: 30px;
        width: calc(100% - 10px);
      `}
    >
      <h2 id="form-title">Add something new</h2>
      <TextInput
        fieldName="title"
        label="Title"
        setTextInput={(textInput) =>
          setFormValues((prevFormVals) => ({
            ...prevFormVals,
            title: textInput,
          }))
        }
      />
      <AnimatePresence>
        {!!debouncedTitle && (
          <ConditionalFieldWrapper>
            <MediaTypeRadioGroup />
          </ConditionalFieldWrapper>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!!formValues.title && debouncedMediaType && (
          <ConditionalFieldWrapper>
            <AdditionalFields />
          </ConditionalFieldWrapper>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAddButton && (
          <motion.button
            type="submit"
            whileTap={{ scale: 0.8, backgroundColor: "white" }}
            css={css`
              border-radius: 15px;
              width: 100px;
              border: 1px solid black;
              padding: 5px 10px;
            `}
            initial="hidden"
            animate="show"
            variants={{
              hidden: { scale: 0.7, y: 20 },
              show: { scale: 1, y: 0 },
            }}
          >
            Add
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
};
