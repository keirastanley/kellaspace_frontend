import { ComponentProps } from "react";
import { Dialog } from "../Dialog";

export const EditListDialog = (props: ComponentProps<typeof Dialog>) => {
  return <Dialog {...props}></Dialog>;
};
