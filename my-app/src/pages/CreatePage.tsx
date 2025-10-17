import { useState } from "react";
import { CreateForm } from "../components/CreateForm/CreateForm";
import { PageWrapper } from "../components/PageWrapper";
import { FormDataProvider } from "../providers/FormDataProvider";
import { Recommendation, RecommendationFormData } from "../interfaces";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router";
import { useUserData } from "../providers/UserDataProvider";

export const CreatePage = () => {
  const [formData, setFormData] = useState<RecommendationFormData>();
  const { setUserData } = useUserData();

  const navigate = useNavigate();

  return (
    <FormDataProvider formData={formData} setFormData={setFormData}>
      <PageWrapper>
        <CreateForm
          onSubmit={(formData) => {
            const id = uuid();
            const recommendation: Recommendation = {
              ...formData,
              id,
              completed: false,
              favourite: false,
              addedBy: "keira",
              dateAdded: new Date().toUTCString(),
            };
            setUserData((prevUserData) => ({
              ...prevUserData,
              recommendations: [
                ...(prevUserData.recommendations ?? []),
                recommendation,
              ],
            }));
            navigate(`/${id}`);
          }}
        />
      </PageWrapper>
    </FormDataProvider>
  );
};
