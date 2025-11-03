import { PageWrapper } from "../../components";
import { ListFormProvider } from "../../providers/ListFormProvider";
import { CreateForm } from "./components/CreateForm/CreateForm";

export const CreateListPage = () => {
  return (
    <PageWrapper>
      <ListFormProvider>
        <CreateForm />
      </ListFormProvider>
    </PageWrapper>
  );
};
