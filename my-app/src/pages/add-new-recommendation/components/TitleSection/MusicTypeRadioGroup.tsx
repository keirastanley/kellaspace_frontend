/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { RadioGroup } from "../../../../components";

export const MusicTypeRadioGroup = ({
  searchMusicBy,
  setSearchMusicBy,
}: {
  searchMusicBy: "track" | "album" | undefined;
  setSearchMusicBy: React.Dispatch<
    React.SetStateAction<"track" | "album" | undefined>
  >;
}) => {
  const [order, setOrder] = useState([
    { label: "Track", value: "track" as const },
    { label: "Album", value: "album" as const },
  ]);

  useEffect(() => {
    if (searchMusicBy) {
      setOrder((prevOrder) => [
        ...prevOrder.filter(({ value }) => value === searchMusicBy),
        ...prevOrder.filter(({ value }) => value !== searchMusicBy),
      ]);
    }
  }, [searchMusicBy]);

  return (
    <RadioGroup value={searchMusicBy} withSwiper={false}>
      <RadioGroup.Legend>
        <h2>Search for music by...</h2>
      </RadioGroup.Legend>
      {order.map(({ label, value }) => (
        <RadioGroup.Field
          radioName={value}
          key={value + "key"}
          onChange={() => setSearchMusicBy(value)}
        >
          {label}
        </RadioGroup.Field>
      ))}
    </RadioGroup>
  );
};
