
export interface Video {
    titulo: string;
    descricao: string;
    link: string;
    autor: string;
    fotoPerfilAutor: string;
    visualizacoes: number;
    dataPublicacao: Date;
    thumbnail: string;
    sentimento: string; // Adiciona a propriedade sentimento
  }