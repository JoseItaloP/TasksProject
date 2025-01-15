
import { redirect } from "next/navigation";
import { LogoutLocalUser } from "../../UserValue";
import Link from "next/link";

export default function UserName(name: string) {
  
  return (
    <div className="flex flex-col items-center group hover:cursor-pointer">
      <Link href='/User' className="g">
        {name}
    </Link>
      <section className={`absolute z-50 mt-8 mr-20 `}>
        <ul className="list-none 
        bg-hot-800 border border-cold-700 
        rounded-l-lg
        text-base text-cold-700 
        p-4
        invisible
        opacity-0
        group-hover:visible
        group-hover:opacity-100
        ease-in
        duration-150
        ">
          <li>
            <form action={async () =>{
                'use server';
                await LogoutLocalUser();
                redirect('/')
            }}>

            <button type="submit" className="
                hover:cursor-pointer
                hover:underline
                hover:decoration-1
            ">Logout</button>
            </form>
          </li>
        </ul>
      </section>
    </div>
  );
}
