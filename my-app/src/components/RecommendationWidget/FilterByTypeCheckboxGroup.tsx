/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Transition } from "motion/react";
import * as motion from "motion/react-client";
import { useMemo, useState } from "react";
import { MediaType } from "../../interfaces/recommendations";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "./slider-styles.css";

const CheckboxGroup = styled.div`
  display: flex;
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

export const FilterByTypeCheckboxGroup = ({
  mediaTypes,
  selectedFilters,
  setSelectedFilters,
}: {
  mediaTypes: MediaType[];
  selectedFilters: MediaType[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<MediaType[]>>;
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const [order, setOrder] = useState<MediaType[]>(mediaTypes);

  const handleToggle = (item: MediaType, checked: boolean) => {
    const newSelectedFilters = checked
      ? [...selectedFilters, item]
      : selectedFilters.filter((selectedItem) => selectedItem !== item);

    setSelectedFilters(newSelectedFilters);

    const newOrder = [
      ...newSelectedFilters,
      ...order.filter((item) => !newSelectedFilters.includes(item)),
    ];
    setOrder(newOrder);
    swiperInstance?.slideTo(0);
  };

  const handleSelectAll = () =>
    setSelectedFilters(
      isAllSelected
        ? []
        : [
            ...selectedFilters,
            ...mediaTypes.filter(
              (mediaType) => !selectedFilters.includes(mediaType)
            ),
          ]
    );

  const isAllSelected = useMemo(
    () => selectedFilters.length === mediaTypes.length,
    [mediaTypes, selectedFilters]
  );

  const allCheckboxLabel = "All";

  return (
    <CheckboxGroup>
      <Swiper
        spaceBetween={10}
        slidesPerView="auto"
        id="filter-slider"
        onSwiper={setSwiperInstance}
      >
        <SwiperSlide id={`filter-slide-all`}>
          <MotionLabel
            layout
            transition={spring}
            css={selectedStyle(selectedFilters.length === mediaTypes.length)}
            htmlFor={allCheckboxLabel}
          >
            <input
              type="checkbox"
              id={allCheckboxLabel}
              checked={isAllSelected}
              onChange={handleSelectAll}
            />
            {allCheckboxLabel}
          </MotionLabel>
        </SwiperSlide>
        {order.map((item) => (
          <SwiperSlide key={item} className="filter-slide">
            <MotionLabel
              key={item}
              layout
              transition={spring}
              htmlFor={item}
              css={selectedStyle(selectedFilters.includes(item))}
            >
              <input
                type="checkbox"
                checked={selectedFilters.includes(item)}
                onChange={(e) => handleToggle(item, e.target.checked)}
                id={item}
                name={item}
              />
              {item}
            </MotionLabel>
          </SwiperSlide>
        ))}
      </Swiper>
    </CheckboxGroup>
  );
};

const spring: Transition = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

const selectedStyle = (isSelected: boolean) =>
  css`
    background-color: ${isSelected ? "grey" : "white"};
  `;
