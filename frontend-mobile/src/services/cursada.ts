import { authFetch } from "./api";

export async function getCursada(id: number) {
  const response = await authFetch(`/cursadas/${id}`);

  if (!response.ok)
    throw new Error("Error obteniendo cursada");

  return response.json();
}