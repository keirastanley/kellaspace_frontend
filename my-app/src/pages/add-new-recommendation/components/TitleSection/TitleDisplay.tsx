/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Image } from "../../../../components";
import { useFormContext } from "react-hook-form";
import { RecommendationFormData } from "../../../../interfaces";

export const TitleDisplay = () => {
  const { watch } = useFormContext<RecommendationFormData>();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 5px;
        font-size: 14px;
      `}
    >
      <h2>Title</h2>
      <p>{watch("title")}</p>
      <Image
        src={watch("image")?.src}
        style={{
          width: "120px",
          height: "180px",
          borderRadius: "5px",
        }}
      />
    </div>
  );
};
