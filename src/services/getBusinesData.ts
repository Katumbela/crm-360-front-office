import { BusinessData } from "@/domain/models";
import { firestore } from "../firebase";

export async function getBusinessData(docId: string) {
  try {
    const docRef = firestore.collection("business").doc(docId);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      const businessData = docSnapshot.data() as BusinessData;
      return businessData;
    } else {
      throw new Error("Documento não encontrado");
    }
  } catch (error) {
    console.error("Erro ao obter dados da empresa:", error);
    throw error;
  }
}
