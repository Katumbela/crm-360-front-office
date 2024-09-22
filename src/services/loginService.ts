
import "firebase/auth";
import { UserModel } from "../domain/models";
import firebase from "@/firebase/firebase.init";

export interface AuthProps {
  email: string;
  password: string;
}

export async function handleLoginService(
  { email, password }: AuthProps
): Promise<UserModel> {
  try {
    // Autenticação com Firebase
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const user = userCredential.user;

    if (user) {
      // Preencher os dados do usuário com informações do Firebase
      const userData: UserModel = {
        id: user.uid,
        name: user.displayName || "", // Nome pode ser vazio
        email: user.email || "", // Email retornado pelo Firebase
        company_name: "", // Aqui você pode obter outros dados de Firestore se necessário
        website: "",
        phone: 0, // Pode ser obtido de outro lugar se necessário
        password: "", // Não armazenamos senhas
        address: "",
        team: "",
        contacts: "",
        city: "",
        country: "",
        plan: "Free", // Defina um valor padrão ou obtenha de outro lugar
        online_selling: "no", // Defina um valor padrão ou obtenha de outro lugar
      };

      return userData;
    } else {
      throw new Error("Usuário não encontrado");
    }
  } catch (error: any) {
    console.error("Erro ao fazer login:", error.message);

    // Retornar dados vazios em caso de erro
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
    };
    return userData;
  }
}
