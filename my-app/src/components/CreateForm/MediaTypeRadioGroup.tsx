/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaType } from "../../interfaces";
import { RadioGroup } from "../RadioGroup/RadioGroup";
import { useEffect, useState } from "react";
import { useFormData } from "../../providers/FormDataProvider";
import { motion } from "framer-motion";

export const MediaTypeRadioGroup = () => {
  const radioLabels = Object.values(MediaType);
  const [selectedMediaType, setSelectedMediaType] = useState<string>();
  const [order, setOrder] = useState<string[]>(radioLabels);

  const { setFormValues } = useFormData();

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
        <legend
          css={css`
            display: flex;
            align-items: center;
            order: 0;
            padding: 0 0.25rem;
            margin: 0;
            position: relative;
          `}
        >
          <h2>Media type</h2>
        </legend>
        <div>
          <RadioGroup
            order={order}
            selectedRadio={selectedMediaType}
            setSelectedRadio={setSelectedMediaType}
            withSwiper={false}
          >
            {Object.values(MediaType).map((mediaType) => (
              <RadioGroup.Field
                radioName={mediaType}
                key={mediaType}
                onChange={() => {
                  setSelectedMediaType(mediaType);
                  setFormValues((prevFormVals) => ({
                    ...prevFormVals,
                    mediaType,
                  }));
                }}
              >
                {mediaType}
              </RadioGroup.Field>
            ))}
          </RadioGroup>
        </div>
      </div>
      {/* {submitted && !formData.mediaType && (
        <p role="alert">Media type is required.</p>
      )} */}
    </motion.fieldset>
  );
};
