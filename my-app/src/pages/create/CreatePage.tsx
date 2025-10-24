/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { CreateForm } from "./components/CreateForm/CreateForm";
import { PageWrapper } from "../../components";
import { FormDataProvider } from "../../providers";
import { Recommendation, RecommendationFormData } from "../../interfaces";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router";
import { useUserData } from "../../providers";
import { updateUserRecommendations } from "../../utils";
import { useLoader } from "../../providers";
import { searchForMovie } from "./components/CreateForm/utils/api";

export const CreatePage = () => {
  const [formData, setFormData] = useState<RecommendationFormData>();
  const { setUserData, userData } = useUserData();

  const navigate = useNavigate();

  const { isLoading, setIsLoading } = useLoader();
  useEffect(() => {
    if (isLoading) {
      searchForMovie("test", () => setIsLoading(false));
    }
  }, []);

  return (
    <FormDataProvider formData={formData} setFormData={setFormData}>
      <PageWrapper>
        <CreateForm
          onSubmit={(formData) => {
            const recommendation_id = uuid();
            const newRecommendation: Recommendation = {
              ...formData,
              search_id: formData.search_id ?? null,
              id: recommendation_id,
              completed: false,
              favourite: false,
              addedBy: "keira",
              dateAdded: new Date().toISOString(),
            };
            userData &&
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
