import { response, type NextFunction, type Request, type Response } from "express";
import { ColegioService } from "../services/colegio.service.js";

// creacion de colegios desde ajustes
export const crearColegio = async (req: Request, res: Response) => {
    try {
        const { nombre, nombreComodo } = req.body;
        const usuarioId = req. user?.id;

        const nuevo = await ColegioService.createColegio({
            nombre,

            nombreComodo,
            usuarioId: usuarioId!
        });
        res.status(201).json(nuevo);
    } catch ( error ) {
        res.status(400).json({ error: "Error al crear"});
    }
};

export const getColegioId = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: 'Id inválido' });

        const colegio = await ColegioService.getColegioId(id);

        if (!colegio) return res.status(404).json({ error: 'Colegio no encontrado' });

        res.json(colegio);
    } catch ( error ) {
        next( error );
    }
};

//listado de colegios para el login
export const getColegiosPublic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const colegios = await ColegioService.getColegios();
        res.json(colegios);
    } catch (error) {
        next(error);
    }
};

// lista de colegios para tabla de ajustes
export const listColegios = async (req: Request, res: Response) => {
    try {
        const colegios = await ColegioService.getColegios();
        res.json(colegios);
    } catch (error) {
        res.status(500).json({ error: "error al obtener colegios"});
    }
};

export const updateColegio = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)){
            return res.status(400).json({ error: 'ID invalido' });
        }

        const { nombre, nombreComodo } = req.body;

        const datosActualizados = {
            ...(nombre && { nombre }),
            ...(nombreComodo && { nombreComodo })
        };

        if (Object.keys(datosActualizados).length === 0) {
            return res.status(400).json({ error: 'No se enviaron campos válidos para actualizar' });
        }
        const actualizado = await ColegioService.updateColegio(id, datosActualizados);

        res.json(actualizado);
    } catch ( error: any ) {
        //error del service
        if (error.message.includes('no existe')) {
            return res.status(404).json({ error: error.message });
        }
        // otro tipo de error
        next(error);
    }
}


    