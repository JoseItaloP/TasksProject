"use client"
import NewTask from "../_constructor/_Tasks/@NewTask/page"
import Tasks from "../_constructor/_Tasks/@Tasks/page"
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import LoadingPage from "../_constructor/LoadingPage"
import { useRouter } from "next/navigation"
import { UserType } from "../_constructor/_Types"

export default function Main() {
  const {  loading, getLoginUser, user } = useContext(AuthContext)
  const router = useRouter()
  const [, setUserInUse] = useState<UserType | null>(null)

  useEffect(() => {
    async function getData(){

      const usuario = await getLoginUser()
      if(usuario){
        setUserInUse(usuario)
      }else{
        router.push('/')
      }
    }
    if(user === null){
      getData()
    }
  }, [])



      return (
        <main className="h-full flex flex-col justify-between">
          {loading ? <LoadingPage absolt={true} /> : ''}
            <h1 className="ml-2">Tarefas de {user?.UserName}</h1>
            
            <NewTask />
  
            <Tasks />
  
        </main>
      )
      
    
}
