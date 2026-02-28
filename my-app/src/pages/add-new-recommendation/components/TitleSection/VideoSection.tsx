/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TextInput } from "../../../../components";
import { useState } from "react";
import { searchForVideo } from "../CreateForm/utils/api";
import { getYouTubeId } from "../CreateForm/utils/create-utils";
import { SearchResult } from "../../../../interfaces";

export const VideoSection = ({
  setSelectedResult,
}: {
  setSelectedResult: React.Dispatch<React.SetStateAction<SearchResult | null>>;
}) => {
  const [videoLink, setVideoLink] = useState<string>();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: calc(100% - 20px);
        box-sizing: border-box;
        font-size: 16px;
      `}
    >
      <TextInput
        label="Paste a YouTube link below"
        type="url"
        placeholder="www.youtube.com/"
        onChange={(val) => setVideoLink(val)}
      />
      <button
        onClick={() =>
          videoLink &&
          searchForVideo({
            videoId: getYouTubeId(videoLink),
            onSuccess: (result) => setSelectedResult(result),
          })
        }
      >
        Add
      </button>
    </div>
  );
};
