export interface UserDetailsModel {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company_name: string;
  website: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
  team: string;
  contacts: string;
  online_selling: "yes" | "no"; // Defina os possíveis valores para online_selling
  plan: string;
}
