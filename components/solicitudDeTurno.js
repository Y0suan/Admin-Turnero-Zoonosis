import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SolicitudDeTurno({
  _id,
  nombreApellido: existingNombreApellido,
  telefono: existingTelefono,
  correo: existingCorreo,
  direccion: existingDireccion,
  dni: existingDni,
  barrio: existingBarrio,
  nombreMascota: existingNombreMascota,
  razaEstilo: existingRazaEstilo,
  sexo: existingSexo,
  edad: existingEdad,
  tallaTamano: existingTallaTamano,
  turnoSeleccionado: existingTurnoSeleccionado,
}) {
  const [nombreApellido, setNombreApellido] = useState(existingNombreApellido || '');
  const [telefono, setTelefono] = useState(existingTelefono || '');
  const [correo, setCorreo] = useState(existingCorreo || '');
  const [direccion, setDireccion] = useState(existingDireccion || '');
  const [dni, setDni] = useState(existingDni || '');
  const [barrio, setBarrio] = useState(existingBarrio || '');
  const [nombreMascota, setNombreMascota] = useState(existingNombreMascota || '');
  const [razaEstilo, setRazaEstilo] = useState(existingRazaEstilo || '');
  const [sexo, setSexo] = useState(existingSexo || '');
  const [edad, setEdad] = useState(existingEdad || '');
  const [tallaTamano, setTallaTamano] = useState(existingTallaTamano || '');
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(existingTurnoSeleccionado || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [goToTurnos, setGoToTurnos] = useState(false);

  useEffect(() => {
    // Additional initialization can be performed here if needed
  }, []);

  function formatDate(fechaString) {
    const fecha = new Date(fechaString);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    return `${dia}/${mes}`;
  }

  const [turnos, setTurnos] = useState([]);
  useEffect(() => {
    axios.get('/api/nuevoTurno').then(response => {
      setTurnos(response.data);
    });
  }, []);

  useEffect(() => {
    if (goToTurnos) {
      router.push("/products");
    }
  }, [goToTurnos]);

  async function saveTurnoFelinos(ev) {
    ev.preventDefault();
  
    const data = {
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
    };
  
    try {
      if (_id) {
        // Update
        await axios.put(`/api/solicitudDeTurno?id=${_id}`, data);
      } else {
        // Create
        const response = await axios.post("/api/solicitudDeTurno", data);
      }
  
      // Decrementar la cantidad disponible del turno seleccionado
      await axios.put(`/api/nuevoTurno?id=${turnoSeleccionado}&cantidadDisponible=${1}`);
  
      setGoToTurnos(true);
    } catch (error) {
      // Manejar errores
      setError(error.message);
    }
  }
  
  return (
    <form className="  "  onSubmit={saveTurnoFelinos}>
      <div>
      <label>Nombre y Apellido</label>
      <input 
        type='text' 
        placeholder="Nombre y Apellido"
        value={nombreApellido}
        onChange={ev => setNombreApellido(ev.target.value)}
      />
      </div>
      <div>
      <label>Teléfono</label>
      <input 
        type='text' 
        placeholder="Teléfono"
        value={telefono}
        onChange={ev => setTelefono(ev.target.value)}
      />
      </div>
      <div>
      <label>Correo</label>
      <input 
        type='email' 
        placeholder="Correo"
        value={correo}
        onChange={ev => setCorreo(ev.target.value)}
      />
      </div>
      <div>
      <label>Dirección</label>
      <input 
        type='text' 
        placeholder="Dirección"
        value={direccion}
        onChange={ev => setDireccion(ev.target.value)}
      />
      </div>
      <div>
      <label>DNI</label>
      <input 
        type='text' 
        placeholder="DNI"
        value={dni}
        onChange={ev => setDni(ev.target.value)}
      />
      </div>
      <div>
      <label>Barrio</label>
      <input 
        type='text' 
        placeholder="Barrio"
        value={barrio}
        onChange={ev => setBarrio(ev.target.value)}
      />
      </div>
      <div>
      <label>Nombre de la Mascota</label>
      <input 
        type='text' 
        placeholder="Nombre de la Mascota"
        value={nombreMascota}
        onChange={ev => setNombreMascota(ev.target.value)}
      />
      </div>
      <div>
      <label>Raza o Estilo</label>
      <input 
        type='text' 
        placeholder="Raza o Estilo"
        value={razaEstilo}
        onChange={ev => setRazaEstilo(ev.target.value)}
      />
      </div>
      <div>
      <label>Sexo</label>
      <input 
        type='text' 
        placeholder="Sexo"
        value={sexo}
        onChange={ev => setSexo(ev.target.value)}
      />
      </div>
      <div>
      <label>Edad</label>
      <input 
        type='text' 
        placeholder="Edad"
        value={edad}
        onChange={ev => setEdad(ev.target.value)}
      />
      </div>
      <div>
      <label>Talla Tamaño</label>
      <input 
        type='text' 
        placeholder="Talla Tamaño"
        value={tallaTamano}
        onChange={ev => setTallaTamano(ev.target.value)}
      />
      </div>
      <div>
      <label>Turno Seleccionado</label>
      <select value={turnoSeleccionado && turnoSeleccionado._id} onChange={ev => setTurnoSeleccionado(ev.target.value)}>
  {turnos.map(turno => (
    // Verifica si la cantidad disponible es mayor que 0 antes de mostrar el turno como una opción
    turno.cantidadDisponible > 0 && (
      <option key={turno._id} value={turno._id}>
        {formatDate(turno.diaTurno)} {turno.horaTurno} {turno.categoria}
      </option>
    )
  ))}
</select>

      </div>

      <button 
        type="submit" 
        className="btn-primary-2 w-fit">Guardar</button>
    </form>
  );
}
