
import { UserModel } from "../models";

// Função para armazenar os dados do usuário no localStorage
export function storeUserDataInLocalStorage(userData: UserModel) {
    localStorage.setItem('user', JSON.stringify(userData));
  }
  
  // Função para recuperar os dados do usuário do localStorage
  export function retrieveUserDataFromLocalStorage(): UserModel | null {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      return JSON.parse(userDataString);
    }
    return null;
  }
  
  // Função para remover os dados do usuário do localStorage
  export function removeUserDataFromLocalStorage() {
    localStorage.removeItem('user');
  }
  
