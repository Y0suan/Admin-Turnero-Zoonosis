import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { TurnoNuevo } from "@/models/turnoNuevo";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
    await isAdminRequest(req, res);

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await TurnoNuevo.findOne({ _id: req.query.id }));
        } else {
            res.json(await TurnoNuevo.find());
        }
    }

    if (method === 'POST') {
        const { 
            cantidadDisponible,
            categoria,
            diaTurno,
            horaTurno,
        } = req.body;

        const turnoNuevoDoc = await TurnoNuevo.create({
            cantidadDisponible,
            categoria,
            diaTurno,
            horaTurno,
        });

        res.json(turnoNuevoDoc);
    }

    if (method === 'PUT') {
        if (req.query?.id) {
            const { cantidadDisponible } = req.body;
            const turnoId = req.query.id;

            try {
                const updatedTurno = await TurnoNuevo.findByIdAndUpdate(
                    turnoId,
                    { $inc: { cantidadDisponible: -1 } }, // Decrementar en 1 la cantidad disponible
                    { new: true }
                );
                res.json(updatedTurno);
            } catch (error) {
                res.status(500).json({ error: "Error al actualizar el turno." });
            }
        } else {
            const { 
                cantidadDisponible,
                categoria,
                diaTurno,
                horaTurno,
                _id
            } = req.body;

            await TurnoNuevo.updateOne(
                { _id },
                { 
                    cantidadDisponible,
                    categoria,
                    diaTurno,
                    horaTurno,
                }
            );

            res.json(true);
        }
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await TurnoNuevo.deleteOne({ _id: req.query.id });
            res.json(true);
        }
    }
}
