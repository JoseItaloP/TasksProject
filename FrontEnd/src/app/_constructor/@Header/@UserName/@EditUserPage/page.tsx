'use client'

import { UserType } from "@/app/_constructor/_Types"
import { useState } from "react"
import EditUserhamdle from "./EditUserhamdle"
import useGoRouter from "@/app/_constructor/GoRouter"

export default function EditUserPage ({UserData}: {UserData:UserType}) {

  const [name, setName] = useState(UserData.UserName)
  const [senha, setSenha] = useState(UserData.Password)
  const [email, setEmail] = useState(UserData.Email)
  const goToRoute = useGoRouter()

  async function hamdleSubmit(){
    const NewEdit = {
      ID: UserData.ID,
      UserName: name,
      Password: senha,
      Email: email,
    }
     const result = await EditUserhamdle(NewEdit)
     console.log('Result do editUserP: ', result)
     if(result){
      console.log('Result do editUserP in IF: ', result)
      goToRoute('Login')
     }
    
  }

  return (
    <form onSubmit={(e)=>{
      e.preventDefault()
      hamdleSubmit()
    }}
    className="h-full w-full flex flex-col items-center justify-between p-2"
    >
      <label htmlFor="" className="flex flex-col w-full">
        <h1 className="font-semibold">Nome</h1>
        <input type="text" name="" id="" value={name} onChange={(e)=>setName(e.target.value)} className="w-full bg-cold-800 text-hot-800 rounded p-1 border border-white"/>
      </label>
      
      <label htmlFor="" className="flex flex-col w-full">
        <h1 className="font-semibold">Senha</h1>
        <input type="password" name="" id="" value={senha} onChange={(e)=>setSenha(e.target.value)} className="w-full bg-cold-800 text-hot-800 rounded p-1 border border-white"/>
      </label>

      <label htmlFor="" className="flex flex-col w-full">
        <h1 className="font-semibold" >Email</h1>
        <input type="email" name="" id="" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full bg-cold-800 text-hot-800 rounded p-1 border border-white"/>
      </label>
      <button type="submit" className="buttonHAnimation bg-cold-800 text-hot-800 rounded border border-hot-600 p-2 text-xl w-2/4">Editar</button>
    </form>
  )
}
