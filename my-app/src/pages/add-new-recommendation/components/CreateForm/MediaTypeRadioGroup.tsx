/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaType, RecommendationFormData } from "../../../../interfaces";
import { RadioGroup } from "../../../../components";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFormContext, useWatch } from "react-hook-form";

export const MediaTypeRadioGroup = () => {
  const radioLabels = Object.values(MediaType);
  const [order, setOrder] = useState<MediaType[]>(radioLabels);

  const { register, resetField } = useFormContext<RecommendationFormData>();

  const selectedMediaType = useWatch({ name: "mediaType" });

  useEffect(() => {
    if (!selectedMediaType) return;
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
    <RadioGroup value={selectedMediaType} withSwiper={false}>
      <RadioGroup.Legend>
        <h2>Media type</h2>
      </RadioGroup.Legend>
      {order.map((mediaType) => (
        <RadioGroup.Field
          radioName={mediaType}
          key={mediaType}
          {...register("mediaType")}
          onChange={(e) => {
            register("mediaType").onChange(e);
            resetField("title");
          }}
        >
          {mediaType}
        </RadioGroup.Field>
      ))}
    </RadioGroup>
  );
};
