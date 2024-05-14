import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Configuración de pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function ListaDisponible() {
  const [turnosSolicitados, setTurnosSolicitados] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/solicitudDeTurno')
      .then(response => {
        // Filtrar los objetos que tengan el valor específico en la propiedad turnoSeleccionado
        const filteredTurnos = response.data.filter(turno => turno.turnoSeleccionado == id);
        // Imprimir los objetos filtrados
        setTurnosSolicitados(filteredTurnos);
      })
      .catch(error => {
        console.error('Error al recuperar los turnos:', error);
      });
  }, [id]);

  // Función para generar y descargar el PDF
  const descargarPDF = () => {
    if (!turnosSolicitados) {
      return;
    }

    const documentDefinition = {
      content: [
        {
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "auto", "auto", "auto" , "auto" ],
            body: [
              ["Nombre y Apellido", "Telefono", "DNI", "Nombre Mascota", "DNI", "Barrio" ],
              ...turnosSolicitados.map(turno => [turno.nombreApellido, turno.telefono, turno.dni, turno.nombreMascota, turno.dni, turno.barrio,]) // Datos de los turnos
            ]
          }
        }
      ]
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download("turnosZoonosis.pdf");
  };

  return (
    <Layout>
      <div className="flex justify-end">
        <button className=" btn-primary-2 " onClick={descargarPDF}>Descargar PDF</button>
      </div>
      {turnosSolicitados !== null ? (
        <Table>
          <TableHeader>
            <TableColumn>Nombre y Apellido</TableColumn>
            <TableColumn>Telefono</TableColumn>
            <TableColumn>DNI</TableColumn>
            <TableColumn>Nombre Mascota</TableColumn>
            <TableColumn>DNI</TableColumn>
          </TableHeader>
          <TableBody>
            {turnosSolicitados.map(turno => (
              <TableRow key={turno.id}>
                <TableCell>{turno.nombreApellido}</TableCell>
                <TableCell>{turno.telefono}</TableCell>
                <TableCell>{turno.dni}</TableCell>
                <TableCell>{turno.nombreMascota}</TableCell>
                <TableCell>{turno.dni}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>Cargando...</p>
      )}
    </Layout>
  );
}
