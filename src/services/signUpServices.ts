import axios from "axios";
import { UserModel } from "../domain/models";
import { env } from "../main/config";

export async function handleSignupService({
  email,
  password,
  address,
  company_name,
  contacts,
  country,
  name,
  online_selling,
  phone,
  team,
  website,
}: UserModel): Promise<UserModel> {
    
  try {
    const formData = {
      email: email,
      password: password,
      address: address,
      city: "---------",
      company_name: company_name,
      contacts: contacts,
      country: country,
      name: name,
      online_selling: online_selling,
      phone: phone,
      plan: "Free",
      team: team,
      website: website,
    };

    const response = await axios.post(env.apiUrl + "/signup", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("Requisição bem-sucedida!");
      console.log("Dados recebidos:", response.data);

      const userData: UserModel = response.data;

      return userData;
    } else {
      console.error("Erro na requisição:", response.statusText);
      const userData: UserModel = {
        id: "",
        name: "",
        email: "",
        company_name: "",
        website: "",
        phone: 0,
        password: "",
        address: "",
        team: "",
        contacts: "",
        city: "",
        country: "",
        plan: "Free",
        online_selling: "no",
      }; // Atribuir um array vazio de UserModel
      return userData;
    }
  } catch (error) {
    const userData: UserModel = {
      id: "",
      name: "",
      email: "",
      company_name: "",
      website: "",
      password: "",
      address: "",
      team: "",
      phone: 0,
      contacts: "",
      city: "",
      country: "",
      plan: "Free",
      online_selling: "no",
    }; // Atribuir um array vazio de UserModel
    return userData;
  }
}
