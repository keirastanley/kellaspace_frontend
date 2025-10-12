import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { RecommendationFormData } from "../interfaces";

type FormData = RecommendationFormData;

interface FormDataContextType {
  formData?: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData | undefined>>;
  formValues: Partial<FormData>;
  setFormValues: React.Dispatch<React.SetStateAction<Partial<FormData>>>;
  isValid: boolean;
}

const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined
);

export const FormDataProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>();
  const [isValid, setIsValid] = useState(false);
  const [formValues, setFormValues] = useState<Partial<FormData>>({});

  useEffect(() => {
    if ("title" in formValues && typeof formValues.title === "string") {
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
