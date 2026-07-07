import { authFetch } from "./api";

export async function getCursada(id: number) {
  const response = await authFetch(`/cursadas/${id}`);

  if (!response.ok)
    throw new Error("Error obteniendo cursada");

  return response.json();
}

export async function createCursada(data:any){

    const response = await authFetch("/cursadas",{
        method:"POST",
        body:JSON.stringify(data)
    });

    const json = await response.json();

    if(!response.ok){
        throw new Error(json.error);
    }

    return json;
}