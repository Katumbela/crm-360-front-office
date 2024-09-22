import { UserModel } from "../domain/models";
import { firestore } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore"; // Importe as funções necessárias

export interface IColaborator {
    id?: string
    name: string;
    bi: string;
    phone: string;
    city: string;
    email: string;
    password: string;
}

export const fetchCollaborators = async (user: UserModel): Promise<IColaborator[]> => {
    try {
        // Crie uma consulta para a coleção "clientes" onde o empresaId corresponde ao id da empresa logada
        const clientsRef = collection(firestore, "clientes");
        const q = query(clientsRef, where("empresaId", "==", `${user.id.substring(0, 4)}_${user.company_name}`));

        // Obtém os documentos que correspondem à consulta
        const querySnapshot = await getDocs(q);

        // Cria um array para armazenar os colaboradores
        const collaborators: IColaborator[] = [];

        // Verifica se existem colaboradores
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const data = doc.data() as IColaborator; // Cast para IColaborator
                collaborators.push(data); // Adiciona o colaborador ao array
            });
        } else {
            throw new Error("Nenhum colaborador encontrado");
        }

        console.log(collaborators);
        return collaborators;
    } catch (error: any) {
        console.error("Erro ao buscar colaboradores:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}
