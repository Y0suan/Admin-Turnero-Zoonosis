const mongoose = require('mongoose');

const { Schema, models, model } = mongoose;

const solicitudDeTurnoSchema = new Schema({
  nombreApellido: String,
  telefono: String,
  correo: String,
  direccion: String,
  dni: String,
  barrio: String,
  nombreMascota: String,
  razaEstilo: String,
  sexo: String,
  edad: String,
  tallaTamano: String,
  turnoSeleccionado: String,
}, { timestamps: true });

export const SolicitudDeTurno = models.SolicitudDeTurno || model('SolicitudDeTurno', solicitudDeTurnoSchema);

