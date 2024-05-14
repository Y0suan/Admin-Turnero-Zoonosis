import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "@/components/Layout";
import { TurnoSeleccionado } from "@/components/TurnoSeleccionado";
import { useSession } from "next-auth/react";
import Image from "next/image";
import TablasDisponible from '@/components/TablaDisponible';
import Link from 'next/link';


export default function Home() {
    const { data: session } = useSession();
    const [turnos, setTurnos] = useState([]);
    const [turnoSeleccionadoId, setTurnoSeleccionadoId] = useState(null);

    useEffect(() => {
        axios.get('/api/nuevoTurno').then(response => {
            setTurnos(response.data);
        })
    }, []);

   

    const handleLeerClick = (id) => {
        setTurnoSeleccionadoId(id);
    };

    return (
        <Layout>

      <div className="flex justify-end">
        <Link className=" btn-primary-2 " href={'/CrearTurno/new'} >Nuevo Turno</Link>
      </div>
            <div className="text-gray-900 flex flex-col justify-between  ">
                <div className="mt-5 rounded divide-y divide-gray-100" >
                    <h1 className=" py-2  " >
                        Turnos
                    </h1>
                    <div className="flex bg-white gap-1 text-gray-900 rounded-lg overflow-hidden">
                        <TablasDisponible Turnos={turnos} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

