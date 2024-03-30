// Função para calcular o score de popularidade numa escala de 0 a 10
export function calculatePopularityScore(views: number, likes: number) {
  // Define os pesos para visualizações e curtidas
  const weightViews = 0.5;
  const weightLikes = 0.5;

  // Calcula a pontuação de popularidade
  const popularityScore = weightViews * views + weightLikes * likes;

  // Define o mínimo e o máximo da pontuação de popularidade
  const minScore = 1000;
  const maxScore = 1000000;

  // Normaliza a pontuação para o intervalo de 0 a 10
  const normalizedScore =
    ((popularityScore - minScore) / (maxScore - minScore)) * 10;

  // Arredonda o score normalizado para facilitar a exibição
  const roundedScore = Math.round(normalizedScore);

  return roundedScore;
}
