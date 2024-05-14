import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import Link from "next/link";

const columns = [
  { name: "Nombre", uid: "nombreApellido" },
  { name: "Teléfono", uid: "telefono" },
  { name: "DNI", uid: "dni" },
  { name: "Turno", uid: "turnoSeleccionado" },
  { name: "Acciones", uid: "acciones" },
];

export default function Tablas({ cliente }) {
  const [turnos, setTurnos] = useState([]);


  useEffect(() => {
    axios.get('/api/nuevoTurno').then(response => {
        // Filter the response data here
        const filteredTurnos = response.data.filter(turno => turno._id === "663df30c0e33ba480cf25052");
        
        // Set the filtered data to the state
        setTurnos(filteredTurnos);
    });
}, []);
console.log(turnos)

  

  

  const renderCell = (cliente, columnKey) => {
    if (columnKey === "acciones") {
      return (
        <div className="flex gap-2 " >
          <Link href={'/Turnos/edit/' + cliente._id} className="hover:text-violet-700" >
            <EditIcon />
          </Link>
          <Link href={'/Turnos/delete/' + cliente._id} className="hover:text-red-700">
            <DeleteIcon />
          </Link>
        </div>
      );
    } else {
      return cliente[columnKey];
    }
  };

  return (
    <Table aria-label="Tabla de Turnos">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "acciones" ? "center" : "center"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {cliente.map(client => (
          <TableRow key={client.id}>
            {columns.map(column => (
              <TableCell key={column.uid}>{renderCell(client, column.uid)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
