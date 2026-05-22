const MOCK_COLEGIOS = [
    { id: "1", nombreComodo: "CTPOBA",   nombre: "Colegio Técnico Provincial, Olga B. de Arko"},
    { id: "2", nombreComodo: "KLOKETEN", nombre: "Colegio Provincial Kloketen"}
];

// Simulación fetch de una API, tiempo de respuesta 1.5 segundos
export const getColegiosDropdown = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const dataDropdown = MOCK_COLEGIOS.map((col) => ({
                label: col.nombreComodo,
                value: col.id,
            }));
            resolve(dataDropdown);
        }, 1000);
    });
};