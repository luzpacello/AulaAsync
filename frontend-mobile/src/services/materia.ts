import { authFetch } from './api';

export async function getMaterias() {
  const response = await authFetch("/materias");

  if (!response.ok)
    throw new Error("Error obteniendo materias");

  return response.json();
}

export async function createMateria(nombre: string) {
  const response = await authFetch("/materias", {
    method: "POST",
    body: JSON.stringify({
      nombre,
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || "Error al crear materia");
  }

  return json;
}