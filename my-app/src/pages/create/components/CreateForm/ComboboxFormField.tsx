/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Field,
  Label,
} from "@headlessui/react";
import { SearchResult } from "../../../../interfaces";
import { Image } from "../../../../components";
import { AnimatePresence, motion } from "framer-motion";

export const ComboboxFormField = ({
  label,
  setQuery,
  onChange,
  value,
  searchResults,
}: {
  label: string;
  onChange: (value: SearchResult | null) => void;
  setQuery: (value?: string) => void;
  searchResults?: SearchResult[];
  value?: SearchResult;
}) => {
  return (
    <Field
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 350px;
      `}
      as={motion.div}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
    >
      <Label>{label}</Label>
      <Combobox value={value} onChange={onChange} onClose={() => setQuery("")}>
        <ComboboxInput
          aria-label="Assignee"
          displayValue={(person) => String(person)}
          onChange={(event) => setQuery(event.target.value)}
          css={css`
            height: 30px;
            font-size: 16px;
            width: 100%;
            box-sizing: border-box;
            padding-bottom: 0px;
          `}
        />
        <AnimatePresence>
          {searchResults && searchResults.length > 0 && (
            <ComboboxOptions
              anchor="bottom"
              css={css`
                display: flex;
                flex-direction: column;
                gap: 10px;
                position: relative;
                width: calc(100% - 20px);
                max-height: 200px !important;
                overflow-y: hidden;
                padding: 0px;
                border: 1px solid grey;
                margin: 0 !important;
                padding: 10px 10px 5px 10px;
                box-sizing: border-box;
                border-radius: 2px;
                width: 349px;
              `}
              static
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              as={motion.ul}
            >
              {searchResults.map((result) => (
                <ComboboxOption
                  key={result.search_id}
                  value={result}
                  css={css`
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 14px;
                  `}
                  as={motion.li}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.2 },
                  }}
                  exit={{
                    opacity: 0,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                >
                  {result.image && (
                    <Image
                      src={result.image.src}
                      style={{ width: "50px", borderRadius: "5px" }}
                    />
                  )}
                  {result.title}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </AnimatePresence>
      </Combobox>
    </Field>
  );
};
