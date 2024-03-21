export interface UserModel {
  id: string;
  name: string;
  email: string;
  first_name: string;
  last_name: string;
  company_name: string;
  website: string;
  shortname: string;
  password: string;
  address: string;
  zipcode: string;
  team: string;
  contacts: [];
  city: string;
  country: string;
  plan: string,
  online_selling: "no" | "yes";
}

export type AccountModel = {
  user: UserModel;
  access_token: string;
  token_type: string;
  expires_in: number;
  ends_at: Date;
  dw_cookies: any;
};
