/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
import { AnimatePresence } from "framer-motion";
import {
  ConditionalFieldWrapper,
  Form,
  TextInput,
} from "../../../../components";
import { List } from "../../../../interfaces";
import { v4 as uuid } from "uuid";
import { AdditionalListFields } from "./AdditionalListFields";
import { useUserData } from "../../../../providers";
import { useListForm } from "../../../../providers/ListFormProvider";
import { useDebounce } from "../../../../hooks";

export const CreateForm = () => {
  const { setUserData } = useUserData();
  const { listFormData, setListFormData } = useListForm();

  const showAdditionalFields = useDebounce(!!listFormData?.title, 2000);

  return (
    <Form
      handleSubmit={() =>
        setUserData((prevUserData) => {
          if (!prevUserData) {
            return prevUserData;
          }
          const newList: List = {
            title:
              listFormData?.title ??
              `List ${(prevUserData.lists?.length ?? 0) + 1}`,
            description: listFormData?.description,
            id: uuid(),
            createdBy: "keira",
            dateCreated: new Date().toUTCString(),
          };
          return {
            ...prevUserData,
            lists:
              prevUserData.lists && prevUserData.lists.length > 0
                ? [...prevUserData.lists, newList]
                : [newList],
          };
        })
      }
    >
      <Form.Title>Make a new list</Form.Title>
      <AnimatePresence>
        <ConditionalFieldWrapper>
          <TextInput
            label="Title"
            placeholder="Give your list a title"
            onChange={(val) =>
              setListFormData((prevList) => ({
                ...prevList,
                title: val,
              }))
            }
          />
        </ConditionalFieldWrapper>
      </AnimatePresence>
      {showAdditionalFields && <AdditionalListFields />}
    </Form>
  );
};
