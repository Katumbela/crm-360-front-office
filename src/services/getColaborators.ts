import { useCallback } from "react";
import { UserModel } from "../domain/models";
import { firestore } from "../firebase";
import { collection, query, where, getDocs, doc, getDoc, getFirestore } from "firebase/firestore"; // Importe as funções necessárias

export interface IColaborator {
    id?: string
    name: string;
    bi: string;
    phone: string;
    city: string;
    email: string;
    password: string;
}



export const fetchColData = async (user: UserModel): Promise<IColaborator[]> => {
    try {
        const db = getFirestore();
        const businessDocRef = doc(collection(db, "business"), `${user.id.substring(0, 4)}_${user.company_name}`);

        const businessDocSnapshot = await getDoc(businessDocRef);
        const businessData = businessDocSnapshot.data();

        // Extrai colaboradores ou inicializa como um array vazio
        const fetchedCollaborators: IColaborator[] = businessData?.collaborators ? Object.values(businessData.collaborators) : [];
        return fetchedCollaborators; // Retorna os colaboradores encontrados
    } catch (error) {
        console.error("Erro ao buscar colaboradores:", error);
        return []; // Retorna um array vazio em caso de erro
    } finally {
        console.log("Busca de colaboradores concluída"); // Indica que a busca foi concluída
    }
};
