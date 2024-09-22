import { BusinessData } from "@/domain/models";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getBusinessData(docId: string): Promise<BusinessData> {
  try {
    const docRef = doc(db, "business", docId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
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
