export interface BusinessData {
  limits: {
    email: {
      daily: number;
      monthly: number;
    };
    searches: {
      daily: number;
      monthly: number;
    };
  };
  collaborators: any[]; // Altere o tipo conforme necessário
  // Adicione outros campos conforme necessário
}
