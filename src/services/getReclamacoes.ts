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

export interface ReclamacaoData {
    anexos: string[];                  // URLs dos anexos
    empresaId?: string;                // ID da empresa (opcional)
    nomeEmpresa?: string;              // Nome da empresa (opcional)
    cliente: string;         
    classificacao: number          // Nome do cliente
    emailCliente: string;              // Email do cliente
    status: "nao-respondido" | "respondido"; // Status da reclamação
    quando: string;                    // Data formatada
    photo?: string;
    historia: string;        // URL da foto do usuário (opcional)
    timestamp: string; // Timestamp do Firestore
    // Adicione outros campos necessários
}


export const fetchReclamacoes = async (user: UserModel): Promise<ReclamacaoData[]> => {
    try {
        // Crie uma consulta para a coleção "clientes" onde o empresaId corresponde ao id da empresa logada
        const clientsRef = collection(firestore, "reclamacoes");
        const q = query(clientsRef, where("empresaId", "==", `${user.id}`));

        // Obtém os documentos que correspondem à consulta
        const querySnapshot = await getDocs(q);

        // Cria um array para armazenar os colaboradores
        const collaborators: ReclamacaoData[] = [];

        // Verifica se existem colaboradores
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const data = doc.data() as ReclamacaoData; // Cast para IColaborator
                collaborators.push(data); // Adiciona o colaborador ao array
            });
        } else {
            throw new Error("Nenhuma reclamacao encontrada para empresa " + user.id);
        }

        console.log(collaborators);
        return collaborators;
    } catch (error: any) {
        console.error("Erro ao buscar reclamacoes:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}
