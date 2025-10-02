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
import { RadioGroupField, RadioGroupFieldProps } from "./RadioGroupField";
import { RadioGroupContext } from "./RadioGroupContext";

const MainWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  input[type="radio"] {
    position: absolute;
    opacity: 0;
  }
`;

export function RadioGroup({
  selectedRadio,
  setSelectedRadio,
  order,
  children,
}: PropsWithChildren & {
  selectedRadio?: string;
  setSelectedRadio: React.Dispatch<React.SetStateAction<string | undefined>>;
  order: string[];
}) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();

  useEffect(() => {
    swiperInstance?.slideTo(0);
  }, [selectedRadio]);

  const childArray = Children.toArray(children).filter(
    (child): child is React.ReactElement<RadioGroupFieldProps> =>
      isValidElement<RadioGroupFieldProps>(child)
  );

  return (
    <RadioGroupContext.Provider
      value={{
        selectedRadio,
        setSelectedRadio,
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
          {order.map((item) => {
            const Element = childArray.find(
              ({ props }) => props.radioName === item
            );
            return (
              <SwiperSlide key={item + "-checkbox"} style={swiperSlideStyles}>
                {Element}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </MainWrapper>
    </RadioGroupContext.Provider>
  );
}

const swiperSlideStyles = {
  width: "max-content",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

RadioGroup.Field = RadioGroupField;
