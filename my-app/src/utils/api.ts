import { Recommendation, DbError, DbSuccess, UserData } from "../interfaces";

const origin = "http://localhost:4000";
const path = "api/kellaspace/users";
const baseUrl = `${origin}/${path}`;

export const getUserById = async (id: string) =>
  fetch(`${baseUrl}/${id}`)
    .then((response) => response.json())
    .then((data) => data as DbSuccess<UserData>)
    .catch((error) => error as DbError);

export const updateUserRecommendations = (
  id: string,
  newRecommendation: Recommendation
) =>
  fetch(`${baseUrl}/${id}/recommendations`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecommendation),
  })
    .then((response) => response.json())
    .then((data) => data as DbSuccess<UserData>)
    .catch((error) => error as DbError);
