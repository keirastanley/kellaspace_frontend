/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { RadioGroupLegend } from "./RadioGroupLegend";
import { RadioGroupField } from "./RadioGroupField";
import {
  Children,
  isValidElement,
  JSXElementConstructor,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { RadioGroupFieldProps } from "../RadioGroup/RadioGroupField";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Mousewheel } from "swiper/modules";
import { RadioGroupContext } from "./RadioGroupContext";

export const RadioGroup = ({
  value,
  children,
  withSwiper = true,
}: PropsWithChildren & { value?: string; withSwiper?: boolean }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();

  useEffect(() => {
    swiperInstance?.slideTo(0);
  }, [value]);
  const childArray = Children.toArray(children).filter(
    (child): child is React.ReactElement<RadioGroupFieldProps> =>
      isValidElement<RadioGroupFieldProps>(child)
  );

  const legend = childArray.find((child) => {
    if (child.type === RadioGroupLegend) {
      return child;
    }
  });
  const radioGroupFields = childArray.filter(
    (child) =>
      (child.type as JSXElementConstructor<RadioGroupFieldProps>).name ===
      "RadioGroupField"
  );

  return (
    <RadioGroupContext.Provider
      value={{
        selectedRadio: value,
      }}
    >
      <motion.fieldset
        css={css`
          width: 100%;
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
          {legend}
          <div
            css={css`
              display: flex;
              ${!withSwiper &&
              css`
                flex-wrap: wrap;
              `}
              width: 100%;
              gap: 10px;
              input[type="radio"] {
                position: absolute;
                opacity: 0;
              }
            `}
          >
            {withSwiper ? (
              <Swiper
                spaceBetween={10}
                slidesPerView="auto"
                onSwiper={setSwiperInstance}
                mousewheel={{ sensitivity: 1 }}
                modules={[Mousewheel]}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                {radioGroupFields.map((radioGroupField) => (
                  <SwiperSlide
                    key={radioGroupField.props.radioName}
                    style={{
                      width: "max-content",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {radioGroupField}
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              radioGroupFields
            )}
          </div>
        </div>
      </motion.fieldset>
    </RadioGroupContext.Provider>
  );
};

RadioGroup.Legend = RadioGroupLegend;
RadioGroup.Field = RadioGroupField;
