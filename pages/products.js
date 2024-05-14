import Link from "next/link";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Tablas from "@/components/Tabla";


export default function Products(){
    const [turnos,setTurnos] = useState([]);
    useEffect(()=>{
        axios.get('/api/solicitudDeTurno').then(response =>{
            setTurnos(response.data);
        })
    },[]);
    return(
        <Layout>
            <div className=" flex justify-end gap-2">
            <Link className="btn-primary-2 mb-2" href={'/Turnos/new'}>
             Solicita Un Nuevo Turno
            </Link>
            <Link className="btn-secondary mb-2" href={'/CrearTurno/new'}>
             Crea Nuevos Turnos
            </Link>
            </div>
            <Tablas cliente={turnos} ></Tablas>
        </Layout>
    )
}