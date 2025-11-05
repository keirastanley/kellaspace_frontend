/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaType, RecommendationFormData } from "../../../../interfaces";
import { RadioGroup } from "../../../../components";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";

export const MediaTypeRadioGroup = () => {
  const radioLabels = Object.values(MediaType);
  const [order, setOrder] = useState<string[]>(radioLabels);

  const { watch, register } = useFormContext<RecommendationFormData>();

  const selectedMediaType = watch("mediaType");

  useEffect(() => {
    if (selectedMediaType) {
      setOrder((prevOrder) => [
        selectedMediaType,
        ...prevOrder.filter(
          (prevMediaType) => prevMediaType !== selectedMediaType
        ),
      ]);
    }
  }, [selectedMediaType]);

  return (
    <motion.fieldset
      css={css`
        border: none;
        margin: 0;
        padding: 0;
        padding-block: 0;
        padding-inline: 0;
        margin-inline: 0;
        min-inline-size: 0;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 5px;
        `}
      >
        <RadioGroup.Legend>
          <h2>Media type</h2>
        </RadioGroup.Legend>
        <div>
          <RadioGroup value={selectedMediaType} withSwiper={false}>
            {order.map((mediaType) => (
              <RadioGroup.Field
                radioName={mediaType}
                key={mediaType}
                {...register("mediaType")}
              >
                {mediaType}
              </RadioGroup.Field>
            ))}
          </RadioGroup>
        </div>
      </div>
    </motion.fieldset>
  );
};
