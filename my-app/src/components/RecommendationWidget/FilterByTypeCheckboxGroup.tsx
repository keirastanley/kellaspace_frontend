/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Transition } from "motion/react";
import * as motion from "motion/react-client";
import { useMemo, useState } from "react";
import { MediaType } from "../../interfaces/recommendations";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import "./slider-styles.css";

const CheckboxGroup = styled.div`
  display: flex;
  gap: 10px;
  input[type="checkbox"] {
    display: none;
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

  return (
    <CheckboxGroup>
      <Swiper spaceBetween={10} slidesPerView="auto" id="filter-slider">
        <SwiperSlide id={`filter-slide-all`}>
          <MotionLabel
            layout
            transition={spring}
            css={selectedStyle(selectedFilters.length === mediaTypes.length)}
          >
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
            />
            All
          </MotionLabel>
        </SwiperSlide>
        {order.map((item) => (
          <SwiperSlide key={item} className="filter-slide">
            <MotionLabel
              key={item}
              layout
              transition={spring}
              css={selectedStyle(selectedFilters.includes(item))}
            >
              <input
                type="checkbox"
                checked={selectedFilters.includes(item)}
                onChange={(e) => handleToggle(item, e.target.checked)}
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
