import Layout from "@/components/Layout";
import SolicitudDeTurno from "@/components/solicitudDeTurno";



export default function NewProduct(){
   return (
    <Layout>
      <div className="mx-auto max-w-2xl text-center mb-16 sm:mb-20 " >
      <h1>Nuevo Turno</h1>
      <p className="mt-2 text-lg leading-8 text-gray-600" >Lorem ipsum dolor sit amet consectetur adipiscing elit tincidunt dignissim laoreet </p>
      </div>
      <SolicitudDeTurno/>
    </Layout>
   );
}