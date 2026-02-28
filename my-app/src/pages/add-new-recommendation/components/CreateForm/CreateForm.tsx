/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useMemo } from "react";
import { RecommendationFormData } from "../../../../interfaces";
import { AnimatePresence, motion } from "framer-motion";
import {
  Form,
  ConditionalFieldWrapper,
  AdditionalRecommendationFields,
} from "../../../../components";
import { MediaTypeRadioGroup } from "./MediaTypeRadioGroup";
import { parseHtmlToReact } from "../../../../utils";
import { useFormContext } from "react-hook-form";
import { TitleSection } from "../TitleSection/TitleSection";
import { ProgressiveDisclosure } from "./ProgressiveDisclosure";

export const CreateForm = ({
  onSubmit,
}: {
  onSubmit: (formData: RecommendationFormData) => void;
}) => {
  const {
    watch,
    handleSubmit,
    formState: { isValid },
  } = useFormContext<RecommendationFormData>();

  const formValues = watch();

  const MAX_DESCRIPTION_DISPLAY_LENGTH = 250;

  const descriptionValue = formValues.description;

  const descriptionDisplayValue = useMemo(() => {
    return descriptionValue &&
      descriptionValue.length > MAX_DESCRIPTION_DISPLAY_LENGTH
      ? `${descriptionValue.slice(0, MAX_DESCRIPTION_DISPLAY_LENGTH)}...`
      : "";
  }, [descriptionValue]);

  return (
    <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Form.Title>Add something new</Form.Title>
      <AnimatePresence>
        <ConditionalFieldWrapper>
          <MediaTypeRadioGroup />
        </ConditionalFieldWrapper>
      </AnimatePresence>
      <TitleSection />
      <AnimatePresence>
        <ProgressiveDisclosure prevField="title">
          <motion.div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 5px;
              font-size: 14px;
            `}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
          >
            <h2>Description</h2>
            <p>{parseHtmlToReact(descriptionDisplayValue)}</p>
          </motion.div>
        </ProgressiveDisclosure>
      </AnimatePresence>
      <AnimatePresence>
        <ProgressiveDisclosure prevField="description">
          <ConditionalFieldWrapper>
            <AdditionalRecommendationFields />
          </ConditionalFieldWrapper>
        </ProgressiveDisclosure>
      </AnimatePresence>
      <AnimatePresence>
        <ProgressiveDisclosure condition={isValid}>
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
        </ProgressiveDisclosure>
      </AnimatePresence>
    </Form>
  );
};
