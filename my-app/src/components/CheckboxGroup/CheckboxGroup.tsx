import {
  Children,
  isValidElement,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Mousewheel } from "swiper/modules";
import { AllCheckbox } from "./AllCheckbox";
import {
  CheckboxGroupVariant,
  CheckboxType,
  OrderVariant,
} from "./CheckboxGroupContext";
import {
  CheckboxGroupField,
  CheckboxGroupFieldProps,
} from "./CheckboxGroupField";
import { CheckboxGroupContext } from "./CheckboxGroupContext";

const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
  }
`;

export function CheckboxGroup({
  checkboxLabels,
  selectedCheckboxes,
  setSelectedCheckboxes,
  variant = "withoutAll",
  orderVariant = "addToStart",
  children,
}: PropsWithChildren & {
  checkboxLabels: CheckboxType[];
  selectedCheckboxes: CheckboxType[];
  setSelectedCheckboxes: React.Dispatch<React.SetStateAction<CheckboxType[]>>;
  variant?: CheckboxGroupVariant;
  orderVariant?: OrderVariant;
}) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const [order, setOrder] = useState<CheckboxType[]>(checkboxLabels);

  useEffect(() => {
    swiperInstance?.slideTo(0);
  }, [selectedCheckboxes.length]);

  const childArray = Children.toArray(children).filter(
    (child): child is React.ReactElement<CheckboxGroupFieldProps> =>
      isValidElement<CheckboxGroupFieldProps>(child)
  );

  return (
    <CheckboxGroupContext.Provider
      value={{
        order,
        setOrder,
        selectedCheckboxes,
        setSelectedCheckboxes,
        variant,
        orderVariant,
      }}
    >
      <MainWrapper>
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
          {variant === "withAll" && (
            <SwiperSlide style={swiperSlideStyles}>
              <AllCheckbox />
            </SwiperSlide>
          )}
          {order.map((item) => {
            const Element = childArray.find(
              ({ props }) => props.checkboxName === item
            );
            return (
              <SwiperSlide key={item + "-checkbox"} style={swiperSlideStyles}>
                {Element}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </MainWrapper>
    </CheckboxGroupContext.Provider>
  );
}

const swiperSlideStyles = {
  width: "max-content",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

CheckboxGroup.Field = CheckboxGroupField;
