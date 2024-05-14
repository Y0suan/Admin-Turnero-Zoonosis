import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const TurnoSeleccionado = ({ turnoSeleccionado }) => {
    const [turnos, setTurnos] = useState([]);

    useEffect(() => {
        const fetchTurnos = async () => {
            try {
                const response = await axios.get(`/api/solicitudDeTurno?turnoSeleccionado=${turnoSeleccionado}`);
                setTurnos(response.data);
            } catch (error) {
                console.error('Error al obtener los turnos:', error);
            }
        };

        fetchTurnos();
    }, [turnoSeleccionado]); // Asegúrate de ejecutar la solicitud nuevamente cuando turnoSeleccionado cambie

    return (
        <div>
            <h5>Turnos con turnoSeleccionado igual a {turnoSeleccionado}</h5>
            <ul>
                {turnos.map(turno => (
                    <li key={turno._id}>
                        <p>Nombre: {turno.nombreApellido}</p>
                        <p>Teléfono: {turno.telefono}</p>
                        <p>Correo: {turno.correo}</p>
                        {/* Agrega aquí los demás campos que deseas mostrar */}
                    </li>
                ))}
            </ul>
        </div>
    );
};
