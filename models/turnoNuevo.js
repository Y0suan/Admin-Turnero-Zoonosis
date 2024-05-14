import mongoose from 'mongoose';

const { Schema, models, model } = mongoose;

const turnoNuevoSchema = new Schema({
  cantidadDisponible: {
    type: Number,
  },
  categoria: {
    type: String,
  },
  diaTurno: {
    type: Date,
  },
  horaTurno: {
    type: String,
  },
}, { timestamps: true });

export const TurnoNuevo = models.TurnoNuevo || model('TurnoNuevo', turnoNuevoSchema);


