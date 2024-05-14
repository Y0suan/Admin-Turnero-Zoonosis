import { signOut } from "next-auth/react";
import  Link  from "next/link";
import { useRouter } from "next/router";
import Logo from "./Logo";

export default function Nav({show}){
    const inactiveLink = ' text-gray-900 text-sm hover:pl-4 font-medium hover:bg-blue-100 rounded hover:text-gray-600 flex gap-1 p-2 border-b-2 border-white ease-out duration-300';
    const activeLink = 'flex p-2 gap-1 text-violet-500 font-medium ';
    const inactiveIcon = 'w-5 h-5 ';
    const activeIcon = 'w-5 h- text-violet-500';
    const router = useRouter();
    const {pathname} = router;
    async function logout(){
        await router.push('/');
        await signOut();
    }


    return(
    <aside class={(show?'left-0':'-left-full')+" top-0 text-gray-600  fixed w-full bg-white min-h-screen md:static md:w-auto transition-all  "}>
        <div class=" p-4 pl-6 pr-16 border-gray-200 border-r border-b  ">
            <Logo />
        </div> 
        <nav class=" h-[80%] flex flex-col gap-2 p-4 pr-16 border-gray-200 border-r border-b   ">
            <Link href={'/'} class={pathname === '/' ? activeLink : inactiveLink}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class={pathname === '/' ? activeIcon : inactiveIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Dashboard
            </Link>
            <Link href={'/admins'} class={pathname.includes('/admins') ? activeLink : inactiveLink }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  class={pathname === '/admins' ? activeIcon : inactiveIcon}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            Admin
            </Link> 
            <Link href={'/products'} class={pathname.includes('/categories') ? activeLink : inactiveLink }>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class={pathname === '/categories' ? activeIcon : inactiveIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            Turnos
            </Link>
            <button onClick={logout} class={inactiveLink}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class={inactiveIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Cerrar Sesión
            </button>            
        </nav>
        <div>
            <p className="text-gray-300 text-sm p-2 text-center" >
                Dpto. De Desarrollo Tecnologico Robotica e Innovacion
            </p>
        </div>
    </aside>
    )
}