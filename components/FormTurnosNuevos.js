import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function FormTurnosNuevos({
  _id,
  cantidadDisponible: existingCantidadDisponible,
  categoria: existingCategoria,
  diaTurno: existingDiaTurno,
  horaTurno: existingHoraTurno,
}) {
  const [cantidadDisponible, setCantidadDisponible] = useState(
    existingCantidadDisponible || ""
  );
  const [categoria, setCategoria] = useState(existingCategoria || "");
  const [diaTurno, setDiaTurno] = useState(existingDiaTurno || "");
  const [horaTurno, setHoraTurno] = useState(existingHoraTurno || "");

  const [goToTurnos, setGoToTurnos] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Aquí puedes realizar cualquier inicialización necesaria, como cargar datos adicionales
  }, []);

  useEffect(() => {
    if (goToTurnos) {
      router.push("/products");
    }
  }, [goToTurnos]);

  async function saveTurnoFelinos(ev) {
    ev.preventDefault();
    const data = {
      cantidadDisponible,
      categoria,
      diaTurno,
      horaTurno,
    };
    if (_id) {
      // Actualizar
      await axios.put("/api/nuevoTurno", { ...data, _id });
    } else {
      // Crear
      await axios.post("/api/nuevoTurno", data);
    }
    setGoToTurnos(true);
  }

  return (
    <form className="  " onSubmit={saveTurnoFelinos}>
      <div>
        <label>Cantidad de turnos disponibles</label>
        <input
          type="number"
          placeholder="0"
          value={cantidadDisponible}
          onChange={(ev) => setCantidadDisponible(ev.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tipoAnimal">Selecciona un tipo de animal</label>
        <select
          id="tipoAnimal"
          name="tipoAnimal"
          value={categoria}
          onChange={(ev) => setCategoria(ev.target.value)}
        >
          <option value="selecciona">Selecciona</option>
          <option value="felinos">Felinos</option>
          <option value="caninos">Caninos</option>
        </select>
      </div>

      <div>
        <label>Dia</label>
        <input
          type="date"
          placeholder="dia"
          value={diaTurno}
          onChange={(ev) => setDiaTurno(ev.target.value)}
        />
      </div>
      <div>
        <label>Hora</label>
        <input
          type="time"
          placeholder="hora"
          value={horaTurno}
          onChange={(ev) => setHoraTurno(ev.target.value)}
        />
      </div>

      <button type="submit" className="btn-primary-2 w-fit">
        Guardar
      </button>
    </form>
  );
}
