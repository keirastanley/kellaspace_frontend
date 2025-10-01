/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Transition } from "motion/react";
import * as motion from "motion/react-client";
import { useState } from "react";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Mousewheel } from "swiper/modules";
import { AllCheckbox } from "./AllCheckbox";

const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
  }
`;

const MotionLabel = styled(motion.label)`
  padding: 5px 15px;
  font-size: 12px;
  text-align: center;
  border-radius: 15px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

type CheckboxGroupVariant = "withoutAll" | "withAll";
type OrderVariant = "addToEnd" | "addToStart";

export function CheckboxGroup<CheckboxType extends string>({
  checkboxLabels,
  selectedCheckboxes,
  setSelectedCheckboxes,
  variant = "withoutAll",
  orderVariant = "addToStart",
}: {
  checkboxLabels: CheckboxType[];
  selectedCheckboxes: CheckboxType[];
  setSelectedCheckboxes: React.Dispatch<React.SetStateAction<CheckboxType[]>>;
  variant?: CheckboxGroupVariant;
  orderVariant?: OrderVariant;
}) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const [order, setOrder] = useState<CheckboxType[]>(checkboxLabels);

  const handleToggle = (item: CheckboxType, checked: boolean) => {
    const newSelectedCheckboxes = checked
      ? orderVariant === "addToStart"
        ? [item, ...selectedCheckboxes]
        : [...selectedCheckboxes, item]
      : selectedCheckboxes.filter((selectedItem) => selectedItem !== item);

    setSelectedCheckboxes(newSelectedCheckboxes);

    const newOrder = [
      ...newSelectedCheckboxes,
      ...order.filter((item) => !newSelectedCheckboxes.includes(item)),
    ];
    setOrder(newOrder);
    swiperInstance?.slideTo(0);
  };

  return (
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
          <SwiperSlide
            style={{
              width: "max-content",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AllCheckbox
              checkboxLabels={checkboxLabels}
              selectedCheckboxes={selectedCheckboxes}
              setSelectedCheckboxes={setSelectedCheckboxes}
            />
          </SwiperSlide>
        )}
        {order.map((item) => (
          <SwiperSlide
            key={item}
            style={{
              width: "max-content",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MotionLabel
              key={item}
              layout
              transition={spring}
              htmlFor={item}
              css={selectedStyle(selectedCheckboxes.includes(item))}
            >
              <input
                type="checkbox"
                checked={selectedCheckboxes.includes(item)}
                onChange={(e) => handleToggle(item, e.target.checked)}
                id={item}
                name={item}
              />
              {item}
            </MotionLabel>
          </SwiperSlide>
        ))}
      </Swiper>
    </MainWrapper>
  );
}

const spring: Transition = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

const selectedStyle = (isSelected: boolean) =>
  css`
    background-color: ${isSelected ? "grey" : "white"};
    color: ${isSelected ? "white" : "black"};
  `;
