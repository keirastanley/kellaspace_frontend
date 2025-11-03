import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { RecommendationFormData } from "../interfaces";

type FormData = RecommendationFormData;
export type FormValues = Partial<RecommendationFormData> | undefined;

interface FormDataContextType {
  formData?: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData | undefined>>;
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  isValid: boolean;
}

const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined
);

export const FormDataProvider = ({
  formData,
  setFormData,
  children,
}: { children: ReactNode } & Pick<
  FormDataContextType,
  "formData" | "setFormData"
>) => {
  const [isValid, setIsValid] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>();

  useEffect(() => {
    if (
      formValues &&
      "title" in formValues &&
      typeof formValues.title === "string"
    ) {
      if (
        "mediaType" in formValues &&
        typeof formValues.mediaType === "string"
      ) {
        setIsValid(true);
      }
    }
  }, [formValues]);

  return (
    <FormDataContext.Provider
      value={{
        formData,
        setFormData,
        formValues,
        setFormValues,
        isValid,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = (): FormDataContextType => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within an FormDataProvider");
  }
  return context;
};
