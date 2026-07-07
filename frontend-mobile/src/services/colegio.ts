import { authFetch, API_URL } from "./api";

export async function getColegiosDropdown() {

    const response = await fetch(
        `${API_URL}/colegios/selector`
    );

    if(!response.ok)
        throw new Error("No se pudieron obtener los colegios");

    const colegios = await response.json();

    return colegios.map((c:any)=>({
        label:c.nombreComodo,
        value:c.id
    }));
}