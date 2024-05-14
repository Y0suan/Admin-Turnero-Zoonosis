import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import SolicitudDeTurno from "@/components/solicitudDeTurno";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/solicitudDeTurno?id='+id).then(response => {
      setProductInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1 className="mb-8" >Editar Turno</h1>
      {productInfo && (
        <SolicitudDeTurno {...productInfo} />
      )}
    </Layout>
  );
}