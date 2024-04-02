import axios from "axios";

async function testApiRequest() {
  try {
    const formData = {
      email: "example@gmail.com",
      password: "password123",
    };

    const apiUrl = "https://crm-360-api.vercel.app/login";

    const response = await axios.post(apiUrl, formData, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Echo Link 360 - API", // Substitua com o seu User-Agent adequado
      },
    });

    if (response.status === 200) {
      console.log("Requisição bem-sucedida!");
      console.log("Dados recebidos:", response.data);
    } else {
      console.error("Erro na requisição:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao fazer requisição:", error);
  }
}

// Chamar a função para testar a requisição
testApiRequest();
