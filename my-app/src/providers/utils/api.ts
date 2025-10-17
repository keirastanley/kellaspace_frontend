import { DbError, DbSuccess } from "../../interfaces/generic";
import { UserData } from "../../interfaces/userData";

const origin = "http://localhost:4000";
const path = "api/kellaspace/users";
const baseUrl = `${origin}/${path}`;

export const getUserById = async (id: string) =>
  fetch(`${baseUrl}/${id}`)
    .then((response) => response.json())
    .then((data) => data.payload as DbSuccess<UserData>)
    .catch((error) => error as DbError);
