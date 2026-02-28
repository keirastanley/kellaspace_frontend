import { useFormContext } from "react-hook-form";
import { RecommendationFormData } from "../../../../interfaces";
import { PropsWithChildren } from "react";
import { useDebounce } from "../../../../hooks";
import { AnimatePresence } from "framer-motion";

export const ProgressiveDisclosure = ({
  prevField,
  condition,
  delay = 500,
  children,
}: PropsWithChildren & {
  condition?: boolean;
  prevField?: keyof RecommendationFormData;
  delay?: number;
}) => {
  const { watch } = useFormContext<RecommendationFormData>();
  const prevFieldIsAnswered = prevField
    ? useDebounce(watch(prevField), delay)
    : undefined;

  return (
    <AnimatePresence>
      {prevFieldIsAnswered ?? condition ? children : null}
    </AnimatePresence>
  );
};
