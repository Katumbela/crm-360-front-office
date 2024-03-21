import React from "react";

export function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <h1 className="text-2xl">Página não encontrada!</h1>
      <p>
        O conteúdo que está a tentar aceder não existe ou não está disponível
      </p>
    </div>
  );
}
