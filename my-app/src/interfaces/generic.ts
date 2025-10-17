import {
  ObjectId as ObjectIdMongoDb,
  WithId as WithIdMongoDb,
  WithoutId as WithoutIdMongoDb,
} from "mongodb";

export type ObjectId = ObjectIdMongoDb;
export type WithId<T> = WithIdMongoDb<T>;
export type WithoutId<T> = WithoutIdMongoDb<T>;

export type DbSuccess<PayloadItem> = {
  success: true;
  payload: PayloadItem;
};

export type DbError = {
  success: false;
  message: string;
};
