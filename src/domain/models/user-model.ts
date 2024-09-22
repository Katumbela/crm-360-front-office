export interface UserModel {
  id: string;
  name: string;
  email: string;
  company_name: string;
  phone: number;
  website: string;
  password: string;
  address: string;
  team: string;
  contacts: string;
  city: string;
  country: string;
  plan: "Free" | "Basic" | "Premium";
  online_selling: "no" | "yes";
  logoFile?: File; // Adicionado para suportar o upload de logo
  capaFile?: File; // Adicionado para suportar o upload de capa
}

export type AccountModel = {
  user: UserModel;
};
