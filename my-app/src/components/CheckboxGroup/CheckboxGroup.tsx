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
import { CheckboxGroupProvider } from "./CheckboxGroupProvider";
import {
  CheckboxGroupField,
  CheckboxGroupFieldProps,
} from "./CheckboxGroupField";

const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
  }
`;

type CheckboxGroupVariant = "withoutAll" | "withAll";
type OrderVariant = "addToEnd" | "addToStart";

export function CheckboxGroup<CheckboxType extends string>({
  checkboxLabels,
  selectedCheckboxes,
  setSelectedCheckboxes,
  variant = "withoutAll",
  orderVariant = "addToStart",
  children,
}: PropsWithChildren & {
  checkboxLabels: string[];
  selectedCheckboxes: string[];
  setSelectedCheckboxes: React.Dispatch<React.SetStateAction<string[]>>;
  variant?: CheckboxGroupVariant;
  orderVariant?: OrderVariant;
}) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const [order, setOrder] = useState<string[]>(checkboxLabels);

  useEffect(() => {
    swiperInstance?.slideTo(0);
  }, [selectedCheckboxes.length]);

  const childArray = Children.toArray(children).filter(
    (child): child is React.ReactElement<CheckboxGroupFieldProps> =>
      isValidElement<CheckboxGroupFieldProps>(child)
  );

  return (
    <CheckboxGroupProvider
      {...{
        checkboxLabels,
        selectedCheckboxes,
        setSelectedCheckboxes,
        variant,
        orderVariant,
        order,
        setOrder,
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
              <SwiperSlide key={item} style={swiperSlideStyles}>
                {Element}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </MainWrapper>
    </CheckboxGroupProvider>
  );
}

const swiperSlideStyles = {
  width: "max-content",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

CheckboxGroup.Field = CheckboxGroupField;
