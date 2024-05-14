import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
    const router = useRouter();
    const [turnoInfo, setTurnoInfo] = useState(null);
    const { id } = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/TurnosFelinos?id=' + id)
            .then(response => {
                setProductInfo(response.data);
            })
            .catch(error => {
                console.error("Error fetching product:", error);
            });
    }, [id]);

    function goBack() {
        router.push('/TurnosFelinos');
    }

    async function deleteProduct() {
        try {
            await axios.delete('/api/TurnosFelinos?id=' + id);
            goBack();
        } catch (error) {
            console.error("Error deleting Turnos:", error);
        }
    }

    return (
        <Layout>
            <h1 className="text-center">¿Estás seguro que quieres eliminar el Turno "{turnoInfo?.nombre}"?</h1>
            <div className="flex gap-2 justify-center">
                <button onClick={deleteProduct} className="btn-red">
                    Sí
                </button>
                <button onClick={goBack} className="btn-default">
                    No
                </button>
            </div>
        </Layout>
    );
}
