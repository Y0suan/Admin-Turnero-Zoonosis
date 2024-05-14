import  Link  from "next/link";
import { useSession } from "next-auth/react";


export default function Logo(){
  const {data:session}=useSession();
    return(
        <Link href={'/'} className=" flex gap-1 text-xl font-semibold  text-gray-900 ">
            {/* <img className=" w-12 "  src="https://res.cloudinary.com/dzqdjsrez/image/upload/v1714050042/castracion_90x90_iokpys.png" ></img> */}
            Turnos Zoonosis
        </Link>
    )
}