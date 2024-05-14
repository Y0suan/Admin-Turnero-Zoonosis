import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import Link from "next/link";

const columns = [
  { name: "Categoria", uid: "categoria" },
  { name: "Hora", uid: "horaTurno" },
  { name: "Dia", uid: "diaTurno" },
  { name: "Disponibles", uid: "cantidadDisponible" },
  { name: "Acciones", uid: "acciones" },
];

export default function TablasDisponible({ Turnos }) {
  const [turnos, setTurnos] = useState([]);

function formatDate(fechaString) {
    const fecha = new Date(fechaString);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
}

  

  const renderCell = (Turnos, columnKey) => {
    if (columnKey === "acciones") {
      return (
        <div className="flex gap-2 " >
          <Link href={'/CrearTurno/Lista/' +Turnos._id} className="hover:text-violet-700" >
          <EyeIcon/>
          </Link>
          <Link href={'/CrearTurno/delete/' + Turnos._id} className="hover:text-red-700">
            <DeleteIcon />
          </Link>
        </div>
      );
    } else {
      return Turnos[columnKey];
    }
  };

  return (
    <Table 
       aria-label="Tabla de Turnos"
       color="secondary"
       selectionMode="single" 
       defaultSelectedKeys={["2"]} 
       >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn  key={column.uid} align={column.uid === "acciones" ? "center" : "center"}>
            {column.name}
          </TableColumn>
        )}

      </TableHeader>
      <TableBody>
  {Turnos.map(Turno => (
    <TableRow key={Turno.id}>
      {columns.map(column => (
        <TableCell key={column.uid} className=" hover:bg-gray-100/50 cursor-pointer" >
          {column.uid === "diaTurno" ? formatDate(Turno[column.uid]) : renderCell(Turno, column.uid)}
        </TableCell>
      ))}
    </TableRow>
  ))}
</TableBody>

    </Table>
  );
}
