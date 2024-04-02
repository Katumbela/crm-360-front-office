export const formatSeguidores = (seguidores: number) => {
    if (seguidores >= 1000000) {
      return `${(seguidores / 1000000).toFixed(1)}m`;
    } else if (seguidores >= 1000) {
      return `${(seguidores / 1000).toFixed(1)}k`;
    } else {
      return seguidores;
    }
  };