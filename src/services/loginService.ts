import axios from "axios";
import { UserModel } from "../domain/models";
import { env } from "../main/config";

export interface AuthProps {
  email: string;
  password: string;
}

export async function handleLoginService(
  { email, password }: AuthProps
): Promise<UserModel> {
  try {
    const formData = {
      email: email,
      password: password,
    };

    const response = await axios.post(env.apiUrl + "/login", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("Requisição bem-sucedida!");
    //   console.log("Dados recebidos:", response.data);

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
        password: "",
        address: "",
        team: "",
        contacts: [],
        city: "",
        country: "",
        plan: "",
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
      contacts: [],
      city: "",
      country: "",
      plan: "",
      online_selling: "no",
    }; // Atribuir um array vazio de UserModel
    return userData;
  }
}
