'use client'

import { redirect, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import EditUserPage from "./@EditUserPage/page";
import LogginOutUser from "./LogginOutUser";
import { IoIosClose } from "react-icons/io";
import LoadingPage from "../../LoadingPage";
import { AuthContext } from "@/app/contexts/AuthContext";
import { UserType } from "../../_Types";


export default function UserName() {
  const pathName = usePathname();
  const { user } = useContext(AuthContext);
  const [UsedUser, setUsedUser]= useState<UserType|null>(null)
  const [editUser, setEditUser] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  useEffect(()=>{
    setUsedUser(user)
    setLoading(false)
  },[user, pathName])

  async function LogOut(){
    setLoading(true)
    const LogUser = await LogginOutUser()
    if(LogUser){
      setLoading(false)
      redirect('/')
    }
  }

  function handleSet(){
    return setEditUser(!editUser)
  }

  function ToUser(){
    setLoading(true)
    router.push('/User')
  }
    if(UsedUser){

      return editUser ? 
      (<div className="flex flex-col items-center group">

        <Link href='/User' >
          {UsedUser.UserName}
        </Link>

      <section className="w-full h-full absolute z-30 left-0 top-0 flex flex-col items-center justify-center bg-cold-900/30 ">

        <section className=" bg-hot-700 text-cold-700 w-1/3 h-1/3 border border-hot-400 rounded-t-lg flex flex-col">

          <h1 className="bg-cold-800 text-hot-500 w-full max-h-[10%] p-2 flex justify-between rounded-t-lg mb-2">

            <p>Editando {UsedUser.UserName}</p>

            <button onClick={handleSet}>
              <IoIosClose className="text-2xl cursor-pointer"/>
            </button>
          </h1>

          <div className="flex-grow overflow-auto">
            <EditUserPage UserData={UsedUser} />
          </div>
          
        </section>
      </section>
      </div>
      )
      :
      (<div className="flex flex-col items-center group hover:cursor-pointer">
        {
          loading ? <LoadingPage absolt={true} /> : ''
        }
      
        <button onClick={ToUser} className="g">
          {UsedUser.UserName}
        </button>
        <section className={`absolute z-20 mt-8 mr-20 `}>
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
              <form onSubmit={(e)=>{
                e.preventDefault()
                LogOut()
              }}>
  
              <button type="submit" className="
                  hover:cursor-pointer
                  hover:underline
                  hover:decoration-1
              ">Logout</button>
              </form>
            </li>
            <li>
              <button onClick={handleSet} className="
                  hover:cursor-pointer
                  hover:underline
                  hover:decoration-1
              ">
                Edit
              </button>
            </li>
          </ul>
        </section>
      </div>)
    }else{
      return <h1>User</h1>
    }
    }


