import axios from "axios";

const API_URL = "http://localhost:3035/";

class AuthService {
  login(email:string, password:string) {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token); // Assumindo que o token está sendo retornado
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("token"); // Removendo o token ao fazer logout
  }

  register( email:string, password:string) {
    return axios.post(API_URL + "signup", {
      email,
      password,
    });
  }

  getCurrentUserId(): string {
    // Implemente a lógica para decodificar o token e obter informações do usuário, se necessário
    const user = localStorage.getItem("user");
    return user as string ;
  }
}

export default new AuthService();
