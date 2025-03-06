import { mediaType } from "./media.type";

export type categoryType = {
  _id: string;
  name: string;
  vendor: string;
  image: mediaType;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
