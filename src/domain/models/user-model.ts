export interface UserModel {
  id: string;
  name:  string;
  email:  string;
  company_name:  string;
  phone: number;
  website:  string;
  password:  string;
  address:  string;
  team:  string;
  contacts:  "";
  city:  string;
  country:  string;
  plan:  "Free" | "Basic" | "Premium";
  online_selling:  "no" | "yes";
}

export type AccountModel = {
  user:  UserModel;
};
