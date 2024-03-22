import axios from "axios";

// Função para fazer a requisição à API
export async function testApiRequest(formData: {
  email: string;
  password: string;
}) {
  try {
    const apiUrl = "https://crm-360-api.vercel.app/login";

    const response = await axios.post(apiUrl, formData);

    console.log(response.status)
    if (response.status === 200) {
      console.log("Requisição bem-sucedida!");
      console.log("Dados recebidos:", response.data);
      return response.data; // Retornar os dados recebidos da API
    } else {
      console.error("Erro na requisição:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erro ao fazer requisição:", error);
    return null;
  }
}
