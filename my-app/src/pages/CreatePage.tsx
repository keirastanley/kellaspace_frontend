import { useState } from "react";
import { CreateForm } from "../components/CreateForm/CreateForm";
import { PageWrapper } from "../components/PageWrapper";
import { FormDataProvider } from "../providers/FormDataProvider";
import { Recommendation, RecommendationFormData } from "../interfaces";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router";
import { useUserData } from "../providers/UserDataProvider";
import { updateUserRecommendations } from "../providers/utils/api";

export const CreatePage = () => {
  const [formData, setFormData] = useState<RecommendationFormData>();
  const { setUserData, userData } = useUserData();

  const navigate = useNavigate();

  return (
    <FormDataProvider formData={formData} setFormData={setFormData}>
      <PageWrapper>
        <CreateForm
          onSubmit={(formData) => {
            const recommendation_id = uuid();
            const newRecommendation: Recommendation = {
              ...formData,
              id: recommendation_id,
              completed: false,
              favourite: false,
              addedBy: "keira",
              dateAdded: new Date().toUTCString(),
            };
            updateUserRecommendations(userData._id, newRecommendation).then(
              (data) => {
                if (data.success) {
                  setUserData(data.payload);
                }
              }
            );
            navigate(`/${recommendation_id}`);
          }}
        />
      </PageWrapper>
    </FormDataProvider>
  );
};
