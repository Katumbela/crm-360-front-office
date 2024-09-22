// Importar os módulos necessários do Firebase
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { UserModel } from "../domain/models";
import { auth, db } from "../firebase"; // Assegure-se de que 'db' é o Firestore inicializado

export interface AuthProps {
  email: string;
  password: string;
}

export async function handleLoginService(
  { email, password }: AuthProps
): Promise<UserModel> {
  try {
    // Autenticação com Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user: User | null = userCredential.user;

    if (user) {
      console.log("Consultando dados do usuário...");

      // Consultar Firestore para obter os dados do usuário
      const userQuery = query(collection(db, "empresa"), where("emailEmpresa", "==", email));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        throw new Error("Usuário não encontrado no Firestore: " + email);
      }

      // Pega o primeiro documento retornado pela consulta
      const userDoc = querySnapshot.docs[0].data();

      // Para verificar todos os documentos na coleção "empresa"
      const allDocsQuery = query(collection(db, "empresa"));
      const allDocsSnapshot = await getDocs(allDocsQuery);

      // Exibir todos os documentos no console
      allDocsSnapshot.docs.forEach(doc => {
        // console.log(doc.data());
      });


      // Cria o objeto userData com os dados do Firestore
      const userData: UserModel = {
        id: user.uid,
        name: userDoc?.nomeResponsavel || user.displayName || "", // Mapeie para 'nomeResponsavel'
        email: userDoc?.emailEmpresa || "", // Mapeie para 'emailEmpresa'
        company_name: userDoc?.nomeEmpresa || "", // Mapeie para 'nomeEmpresa'
        website: userDoc?.siteEmpresa || "", // Mapeie para 'siteEmpresa'
        phone: userDoc?.whatsapp || 0, // Ou utilize o campo correto para telefone
        password: "", // Não armazenamos senhas
        address: userDoc?.enderecoEmpresa || "", // Mapeie para 'enderecoEmpresa'
        team: userDoc?.team || "", // Mantenha conforme necessário
        contacts: userDoc?.contato || "", // Adicione um campo para contatos, se existir
        city: userDoc?.cidade || "", // Mapeie para 'cidade' se existir
        country: userDoc?.pais || "", // Mapeie para 'pais' se existir
        plan: userDoc?.plano || "Free", // Mapeie para 'plano' se existir
        online_selling: userDoc?.selo ? "yes" : "no", // Mapeie corretamente
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
