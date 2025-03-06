import { mediaType } from "./media.type";

export type companyType = {
  _id: string;
  shopName: string;
  domains: string[];
  fullAddress: string;
  phone: string;
  location: string;
  owners: string[];
  logo: mediaType;
  facebook: string;
  instagram: string;
  brandColor: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  khaltikey?: string;
};
