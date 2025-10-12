import { CreateForm } from "../components/CreateForm/CreateForm";
import { PageWrapper } from "../components/PageWrapper";
import { FormDataProvider } from "../providers/FormDataProvider";

export const CreatePage = () => {
  return (
    <FormDataProvider>
      <PageWrapper>
        <CreateForm />
      </PageWrapper>
    </FormDataProvider>
  );
};
