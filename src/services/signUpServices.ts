
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "../domain/models";
import firebase from "@/firebase/firebase.init";

// Função de Cadastro
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
  logoFile,
  capaFile,
}: UserModel): Promise<UserModel> {
  try {
    // Verificar se as imagens foram selecionadas
    if (!logoFile || !capaFile) {
      throw new Error("Logo e capa não foram selecionadas!");
    }

    // Criar usuário no Firebase Authentication
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Upload de logo e capa para o Firebase Storage
    const logoFileName = `empresas/${uuidv4()}_${logoFile.name}`;
    const capaFileName = `empresas/${uuidv4()}_${capaFile.name}`;
    const storageRef = firebase.storage().ref();

    // Upload da logo
    const logoFileRef = storageRef.child(logoFileName);
    await logoFileRef.put(logoFile);
    const logoFileURL = await logoFileRef.getDownloadURL();

    // Upload da capa
    const capaFileRef = storageRef.child(capaFileName);
    await capaFileRef.put(capaFile);
    const capaFileURL = await capaFileRef.getDownloadURL();

    // Enviar os dados para o Firestore
    const empresaRef = firebase.firestore().collection("empresa");

    // Adicionar os dados da empresa no Firestore
    const empresaDocRef = await empresaRef.add({
      email: email,
      company_name: company_name,
      address: address,
      contacts: contacts,
      country: country,
      name: name,
      online_selling: online_selling,
      phone: phone,
      team: team,
      website: website,
      userId: user.uid,
      logo: logoFileURL,
      capa: capaFileURL,
      plan: "Free",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Retorna os dados do usuário
    const userData: UserModel = {
      id: user.uid,
      name: name,
      email: email,
      company_name: company_name,
      phone: phone,
      website: website,
      password: password,
      address: address,
      team: team,
      contacts: contacts,
      city: "",
      country: country,
      plan: "Free",
      online_selling: online_selling,
    };

    return userData;
  } catch (error) {
    console.error("Erro ao cadastrar empresa:", error);
    const userData: UserModel = {
      id: "",
      name: "",
      email: "",
      company_name: "",
      phone: 0,
      website: "",
      password: "",
      address: "",
      team: "",
      contacts: "",
      city: "",
      country: "",
      plan: "Free",
      online_selling: "no",
    };
    return userData;
  }
}
