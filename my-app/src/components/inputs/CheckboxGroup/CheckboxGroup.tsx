/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { CheckboxGroupLegend } from "./CheckboxGroupLegend";
import { CheckboxGroupField } from "./CheckboxGroupField";
import {
  Children,
  Dispatch,
  isValidElement,
  JSXElementConstructor,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CheckboxGroupFieldProps } from "./CheckboxGroupField";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Mousewheel } from "swiper/modules";
import { CheckboxGroupContext } from "./CheckboxGroupContext";
import { AllCheckbox } from "./AllCheckbox";

export enum CheckboxGroupVariant {
  WithAll = "withAll",
  WithoutAll = "withoutAll",
}

interface CheckboxGroupProps extends PropsWithChildren {
  variant?: CheckboxGroupVariant;
  values?: string[];
  setValues?: Dispatch<SetStateAction<string[] | undefined>>;
  withSwiper?: boolean;
}

export const CheckboxGroup = ({
  values,
  setValues,
  variant = CheckboxGroupVariant.WithoutAll,
  children,
  withSwiper = true,
}: CheckboxGroupProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();

  if (variant === CheckboxGroupVariant.WithAll && !setValues) {
    throw new Error(
      `Must pass setValues when CheckboxGroupVariant is "${CheckboxGroupVariant.WithAll}"`
    );
  }

  useEffect(() => {
    swiperInstance?.slideTo(0);
  }, [values]);

  const childArray = Children.toArray(children).filter(
    (child): child is React.ReactElement<CheckboxGroupFieldProps> =>
      isValidElement<CheckboxGroupFieldProps>(child)
  );

  const legend = childArray.find((child) => {
    if (child.type === CheckboxGroupLegend) {
      return child;
    }
  });
  const checkboxGroupFields = childArray.filter(
    (child) =>
      (child.type as JSXElementConstructor<CheckboxGroupFieldProps>).name ===
      "CheckboxGroupField"
  );

  const labels = checkboxGroupFields.map(
    (field) => field.props.children as string
  );

  return (
    <CheckboxGroupContext.Provider
      value={{
        selectedCheckboxes: values,
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
              input[type="checkbox"] {
                position: absolute;
                opacity: 0;
                width: 100%;
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
                {variant === "withAll" && setValues && (
                  <SwiperSlide style={swiperSlideStyles}>
                    <AllCheckbox
                      setSelectedCheckboxes={setValues}
                      checkboxLabels={labels}
                    />
                  </SwiperSlide>
                )}
                {checkboxGroupFields.map((radioGroupField) => (
                  <SwiperSlide
                    key={radioGroupField.props.checkboxName}
                    style={swiperSlideStyles}
                  >
                    {radioGroupField}
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              checkboxGroupFields
            )}
          </div>
        </div>
      </motion.fieldset>
    </CheckboxGroupContext.Provider>
  );
};

const swiperSlideStyles = {
  width: "max-content",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

CheckboxGroup.Legend = CheckboxGroupLegend;
CheckboxGroup.Field = CheckboxGroupField;
