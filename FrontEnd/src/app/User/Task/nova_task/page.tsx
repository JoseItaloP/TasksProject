"use client";

import { ErroType, newTaskType } from "@/app/_constructor/_Types";
import LoadingPage from "@/app/_constructor/LoadingPage";
import { AuthContext } from "@/app/contexts/AuthContext";
import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

export default function NovaTask() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("atuando");
  const [taskPriority, setTaskPriority] = useState("baixa");
  const [loading, setLoading] = useState(false)
  const {createNewTask,  getLoginUser} = useContext(AuthContext)

  const [erros, setErros] = useState<ErroType[]>([]);
  const router = useRouter()

  useEffect(()=>{
    async function GetUser(){
      const user = await getLoginUser()
      if(user === null){
        router.push('/')
      }
    }
    GetUser()
  }, [])

  async function hamdleSubmit() {

    setLoading(true)

    const NewTask: newTaskType = {
      Name: taskName,
      Descrição: taskDescription,
      Status: taskStatus,
      Priority: taskPriority,
      UserID: ''
    }
    const User = await getLoginUser()
    const data = {NewTask, User}
    const resultCrete = await createNewTask(data)

    if(resultCrete){
      setLoading(false)
      setErros(resultCrete)
      setTimeout(() => {
        setErros((prev) => prev.filter((e) => e.id !== resultCrete[0].id)); 
      }, 5000);
      
    }else{
      router.refresh()
      redirect('/User')
    }

  }

  return (
    <main className="h-full w-full flex items-center justify-center">
      {
        loading ? <LoadingPage absolt={true} /> : ''
      }
      <div className="absolute top-0">
              {erros.map((erro) => (
                <div
                  key={erro.id}
                  className="w-full bg-yellow-300 text-zinc-800 flex items-center p-2 rounded shadow-lg mt-4 text-xl"
                >
                  <p className="flex-1">{erro.message}</p>
                  <IoIosClose
                    className="cursor-pointer text-2xl ml-2"
                    onClick={() => setErros((prev) => prev.filter((e) => e.id !== erro.id))}
                  />
                </div>
              ))}
            </div>
      <section className="p-5 bg-cold-900 h-4/6 max-h-full w-2/4 border border-hot-900 rounded-xl flex flex-col items-center">
        <form
          className="flex flex-col justify-around w-2/3 h-full max-h-full overflow-clip"
          onSubmit={(e) => {
            e.preventDefault();
            hamdleSubmit();
          }}
        >
          <label>
            <h1 className="mb-2">Nome da task</h1>
            <input
              className=" text-base p-1 w-full bg-cold-800 rounded"
              type="text"
              name="Nome"
              id="Nome"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </label>
          <label>
            <h1 className="mb-2">Descrição da task</h1>
            <textarea
              name="Descrição"
              id="Descrição"
              className="w-full h-full bg-cold-800 p-1 resize-none"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            ></textarea>
          </label>
          <label className="flex items-center mb-4 mt-8">
            <h1 className="mr-2">Status inicial: </h1>
            <select
              className="bg-hot-800 text-cold-800 text-lg"
              onChange={(e) => {
                
                setTaskStatus(e.target.value);
              }}
              name="status"
              id="status"
            >
              <option value="atuando">Atuando</option>
              <option value="completa">Completa</option>
              <option value="abandonada">Abandonada</option>
            </select>
          </label>
          <label className="flex items-center mb-4">
            <h1 className="mr-2">Prioridade inicial: </h1>
            <select
              className="bg-hot-800 text-cold-800 text-lg"
              name="prioridade"
              id="prioridade"
              onChange={(e) => {

                setTaskPriority(e.target.value);
              }}
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </label>
          
          <input
            type="submit"
            value="Enviar"
            className="w-full p-2 bg-hot-700 text-cold-700 rounded buttonHAnimationINV"
          />
        </form>
      </section>
    </main>
  );
}
