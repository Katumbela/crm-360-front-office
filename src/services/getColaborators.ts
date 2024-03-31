import { UserModel } from "../domain/models";
import { firestore } from "../firebase";

export const fetchCollaborators = async (user: UserModel) => {
    try {
        // Referência para o documento na coleção "business" com o ID adequado
        const businessDocRef = firestore.collection("business").doc(`${user.id.substring(0, 4)}_${user.company_name}`);

        // Obtém os dados do documento
        const businessDocSnapshot = await businessDocRef.get();
        const businessData = businessDocSnapshot.data();

        // Verifica se existem colaboradores e os define no estado
        if (businessData && businessData.collaborators) {
            return businessData.collaborators
        }
    } catch (error: any) {
        console.error("Erro ao buscar colaboradores:", error);
        return "erro ao pegar colaboradores"
    } 
}