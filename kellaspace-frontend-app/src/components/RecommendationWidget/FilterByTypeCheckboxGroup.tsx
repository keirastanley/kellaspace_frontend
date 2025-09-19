/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { RecommendationFilter } from "../../interfaces/recommendationFilters";
import { MediaType } from "../../interfaces/recommendations";
import { Swiper, SwiperSlide } from "swiper/react";
import "./slider-styles.css";

export const FilterByTypeCheckboxGroup = ({
  selectedFilters,
  setSelectedFilters,
  mediaTypes,
}: {
  selectedFilters: RecommendationFilter[];
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<RecommendationFilter[]>
  >;
  mediaTypes: MediaType[];
}) => {
  const filters: RecommendationFilter[] = ["All", ...mediaTypes];

  return (
    <div
      role="checkboxgroup"
      css={css`
        input[type="checkbox"] {
          display: none;
        }
      `}
    >
      <Swiper spaceBetween={10} slidesPerView="auto" id="filter-slider">
        {filters.map((filter, i) => {
          const checked = selectedFilters?.includes(filter);

          return (
            <SwiperSlide key={filter} id={`filter-slide-${i}`}>
              <label
                key={filter}
                css={css`
                  display: inline-block;
                  padding: 5px 10px;
                  border: 1px solid black;
                  border-radius: 15px;
                  background-color: white;
                  color: black;
                  cursor: pointer;
                  user-select: none;
                  transition: all 0.3s ease;
                  font-size: 12px;
                  text-align: center;
                  ${checked &&
                  css`
                    background-color: grey;
                    color: white;
                  `}
                `}
              >
                <input
                  type="checkbox"
                  name={filter}
                  value={filter}
                  checked={checked}
                  onChange={(e) => {
                    const filter = e.target.value as RecommendationFilter;
                    setSelectedFilters((prevFilters) => {
                      if (filter === "All") {
                        return filters;
                      }

                      const filteredByAll = prevFilters.includes("All");

                      if (prevFilters.includes(filter)) {
                        const indexOfFilterToRemove =
                          prevFilters.indexOf(filter);
                        return [
                          ...prevFilters.slice(
                            filteredByAll ? 1 : 0,
                            indexOfFilterToRemove
                          ),
                          ...prevFilters.slice(indexOfFilterToRemove + 1),
                        ];
                      }

                      return [
                        ...(filteredByAll ? prevFilters.slice(1) : prevFilters),
                        filter,
                      ];
                    });
                  }}
                />
                {filter}
              </label>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
