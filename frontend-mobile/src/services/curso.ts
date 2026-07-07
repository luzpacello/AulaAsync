import { authFetch } from "./api";

export async function getCursos() {
  const response = await authFetch("/cursos");

  const json = await response.json();

  if (!response.ok)
    throw new Error(json.error);

  return json;
}

export async function createCurso(data: {
  anio: number;
  division: string;
  ciclo: string;
  orientacion: string | null;
}) {
  const response = await authFetch("/cursos", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok)
    throw new Error(json.error);

  return json;
}