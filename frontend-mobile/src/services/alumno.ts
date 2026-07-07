import { authFetch } from "./api";

export async function getCurso(id: number) {
  const response = await authFetch(`/cursos/${id}`);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || "Error obteniendo curso");
  }

  return json;
}

export async function importarAlumnos(
  cursoId: number,
  alumnos: {
    nombre: string;
    apellido: string;
    documento: string;
  }[]
) {
  const response = await authFetch(
    `/cursos/${cursoId}/alumnos/importar`,
    {
      method: "POST",
      body: JSON.stringify({ alumnos }),
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || "Error importando alumnos");
  }

  return json;
}