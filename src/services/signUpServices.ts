import { v4 as uuidv4 } from "uuid";
import { UserModel } from "../domain/models";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "../firebase";

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
    // Criar usuário no Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Upload de logo e capa para o Firebase Storage
    const logoFileName = `empresas/${uuidv4()}_${logoFile?.name}`;
    const capaFileName = `empresas/${uuidv4()}_${capaFile?.name}`;

    // Referências no Storage
    const logoFileRef = ref(storage, logoFileName);
    const capaFileRef = ref(storage, capaFileName);
    /*
    // Upload da logo
    await uploadBytes(logoFileRef, logoFile);
    const logoFileURL = await getDownloadURL(logoFileRef);

    // Upload da capa
    await uploadBytes(capaFileRef, capaFile);
    const capaFileURL = await getDownloadURL(capaFileRef);
*/
    // Enviar os dados da empresa para o Firestore
    const empresaRef = collection(db, "empresa");

    // Adicionar os dados da empresa no Firestore
    await addDoc(empresaRef, {
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
      logo: "logoFileURL",
      capa: "capaFileURL",
      plan: "Free",
      timestamp: serverTimestamp(),
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
  } catch (error: any) {
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
