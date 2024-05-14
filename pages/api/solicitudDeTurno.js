import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { SolicitudDeTurno } from "@/models/solicitudDeTurno";


export default async function handle(req, res){
    const { method } = req;
    await mongooseConnect();
    await isAdminRequest(req, res);

    if (method === 'GET') {
        if (req.query?.turnoSeleccionado) {
            const { turnoSeleccionado } = req.query;
            res.json(await SolicitudDeTurno.find({ turnoSeleccionado }));
        } else if (req.query?.id) {
            const { id } = req.query;
            res.json(await SolicitudDeTurno.findOne({ _id: id }));
        } else {
            res.json(await SolicitudDeTurno.find());
        }
    }
    

    if (method === 'POST'){
        const { 
            nombreApellido,
            telefono,
            correo,
            direccion,
            dni,
            barrio,
            nombreMascota,
            razaEstilo,
            sexo,
            edad,
            tallaTamano,
            turnoSeleccionado,
        } = req.body;

        const solicitudDeTurnoDoc = await SolicitudDeTurno.create({
            nombreApellido,
            telefono,
            correo,
            direccion,
            dni,
            barrio,
            nombreMascota,
            razaEstilo,
            sexo,
            edad,
            tallaTamano,
            turnoSeleccionado,
        });

        res.json(solicitudDeTurnoDoc);
    }

    if (method === 'PUT'){
        const { 
            nombreApellido,
            telefono,
            correo,
            direccion,
            dni,
            barrio,
            nombreMascota,
            razaEstilo,
            sexo,
            edad,
            tallaTamano,
            turnoSeleccionado,
            _id
        } = req.body;

        await SolicitudDeTurno.updateOne(
            { _id },
            { 
                nombreApellido,
                telefono,
                correo,
                direccion,
                dni,
                barrio,
                nombreMascota,
                razaEstilo,
                sexo,
                edad,
                tallaTamano,
                turnoSeleccionado,
            }
        );

        res.json(true);
    }

    if (method === 'DELETE'){
        if (req.query?.id){
            await SolicitudDeTurno.deleteOne({ _id: req.query.id });
            res.json(true);
        }
    }
}
