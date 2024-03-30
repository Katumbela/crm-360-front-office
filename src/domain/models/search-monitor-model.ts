export interface SearchResult {
    title: string;
    snippet: string;
    url: string;
    domain: string;
    position: number;
    sentiment: "Positivo" | "Negativo" | "Neutro";
}

export interface SearchResponse {
    status: "OK" | undefined;
    request_id: string;
    data: SearchResult[];
}
