'use client'
import { useContext, useEffect } from "react";
import TaskModal from "./taskModal";
import { AuthContext } from "@/app/contexts/AuthContext";

export default function Page({ params }: { params: Promise<{ id: string }>; }) {
  
  const {getLoginUser} = useContext(AuthContext)

  useEffect(()=>{
    async function pegarUser(){
      await getLoginUser()
    }
    pegarUser()
  },[])

  
  return <TaskModal params={params}/>
}
