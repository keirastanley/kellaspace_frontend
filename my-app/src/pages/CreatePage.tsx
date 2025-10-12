import { useState } from "react";
import { CreateForm } from "../components/CreateForm/CreateForm";
import { PageWrapper } from "../components/PageWrapper";
import { FormDataProvider } from "../providers/FormDataProvider";
import { Recommendation, RecommendationFormData } from "../interfaces";
import { useRecommendations } from "../providers/RecommendationsProvider";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router";

export const CreatePage = () => {
  const [formData, setFormData] = useState<RecommendationFormData>();
  const { setRecommendations } = useRecommendations();

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
            setRecommendations((prevRecommendations) => [
              ...prevRecommendations,
              recommendation,
            ]);
            navigate(`/${id}`);
          }}
        />
      </PageWrapper>
    </FormDataProvider>
  );
};
