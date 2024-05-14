import FormTurnosNuevos from "@/components/FormTurnosNuevos";
import Layout from "@/components/Layout";



export default function NewTurno(){
   return (
    <Layout>
      <div className="mx-auto max-w-2xl text-center mb-16 sm:mb-20 " >
      <h1>Crea Nuevo Turno</h1>
      <p className="mt-2 text-lg leading-8 text-gray-600" >Lorem ipsum dolor sit amet consectetur adipiscing elit tincidunt dignissim laoreet </p>
      </div>
      <FormTurnosNuevos/>
    </Layout>
   );
}