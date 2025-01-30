'use client'

import { ErroType, UserType } from "@/app/_constructor/_Types"
import { useState } from "react"
import EditUserhamdle from "./EditUserhamdle"
import useGoRouter from "@/app/_constructor/GoRouter"
import LoadingPage from "@/app/_constructor/LoadingPage"
import { IoIosClose } from "react-icons/io"

export default function EditUserPage ({UserData}: {UserData:UserType}) {

  const [name, setName] = useState(UserData.UserName)
  const [senha, setSenha] = useState('')
  const [email, setEmail] = useState(UserData.Email)
  const [loading, setLoading] = useState(false)
  const [erros, setErros] = useState<ErroType[]>([]);
  const goToRoute = useGoRouter()

  async function hamdleSubmit(){
    setLoading(true)
    const NewEdit = {
      ID: UserData.ID,
      UserName: name,
      Password: senha,
      Email: email,
    }

     const result = await EditUserhamdle(NewEdit)

     if(result){
      setLoading(false)
      setErros(result)
      setTimeout(() => {
        setErros((prev) => prev.filter((e) => e.id !== result[0].id)); 
      }, 5000);
     }else{
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
      {
                loading ? <LoadingPage absolt={true} /> : ''
      }
      {erros.map((erro) => (
                <div
                  key={erro.id}
                  className=" absolute
                  w-2/4 top-0 bg-yellow-300 text-zinc-800 flex items-center p-2 rounded shadow-lg mt-4 text-xl"
                >
                  <p className="flex-1">{erro.message}</p>
                  <IoIosClose
                    className="cursor-pointer text-2xl ml-2"
                    onClick={() => setErros((prev) => prev.filter((e) => e.id !== erro.id))}
                  />
                </div>
              ))}
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
