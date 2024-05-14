import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteTurnoCreado() {
    const router = useRouter();
    const [turnoInfo, setTurnoInfo] = useState(null);
    const { id } = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/nuevoTurno?id=' + id)
            .then(response => {
                setTurnoInfo(response.data);
            })
            .catch(error => {
                console.error("Error fetching product:", error);
            });
    }, [id]);

    function goBack() {
        router.push('/');
    }

    async function deleteProduct() {
        try {
            await axios.delete('/api/nuevoTurno?id=' + id);
            goBack();
        } catch (error) {
            console.error("Error deleting Turnos:", error);
        }
    }

    return (
        <Layout>
            <div className=" m-auto flex justify-center flex-col items-center  " >
            <h2 className="text-center mb-8 ">¿Estás seguro que quieres eliminar el Turno "{turnoInfo?.diaTurno}"?</h2>
            <div className="flex gap-2 justify-center">
                <button onClick={deleteProduct} className="btn-red">
                    Sí
                </button>
                <button onClick={goBack} className="btn-default">
                    No
                </button>
            </div>
            </div>
        </Layout>
    );
}
