'use context'
import { useContext, useEffect } from "react";
import TaskModal from "./taskModal";
import { AuthContext } from "@/app/contexts/AuthContext";

export default  function Page({ params }: {  params: {id: number }}){
  const IDparams =  params.id
  const {getLoginUser} = useContext(AuthContext)
  useEffect(()=>{
    async function pegarUser(){
      await getLoginUser()
    }
    pegarUser()
  },[])

  
  return <TaskModal params={Number(IDparams)}/>
}
