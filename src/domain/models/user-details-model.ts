export interface UserDetailsModel {
  id: string;
  email: string;
  name: string;
  company_name: string;
  website: string;
  password: string;
  address: string;
  team: string;
  city: string;
  country: string;
  contacts: "",
  plan: "Free" | "Basic" | "Premium";
  online_selling: "no" | "yes";
}
