"use client";
import { ErroType, newTaskType } from "@/app/_constructor/_Types";
import LoadingPage from "@/app/_constructor/LoadingPage";
import { createNewTask } from "@/app/_constructor/TaskValue";
import { AuthContext } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { IoIosClose } from "react-icons/io";

export default function NovaTaskModal() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("atuando");
  const [taskPriority, setTaskPriority] = useState("baixa");
  const [loading, setLoading] = useState(false)
  const {user} = useContext(AuthContext)
  const router = useRouter()

  const [erros, setErros] = useState<ErroType[]>([]);

  async function hamdleSubmit() {
    setLoading(true)
    const NewTask: newTaskType = {
      Name: taskName,
      Descrição: taskDescription,
      Status: taskStatus,
      Priority: taskPriority,
      UserID: ''
    }
    const resultCrete = await createNewTask(NewTask, user)
    if(resultCrete){
      setLoading(false)
      setErros(resultCrete)
      setTimeout(() => {
        setErros((prev) => prev.filter((e) => e.id !== resultCrete[0].id)); 
      }, 5000);
      
    }else{
      router.push('/User')
    }

  }

  return (
    <section
      className=" absolute
      bg-cold-900 text-hot-700 border-hot-900
      p-5 h-2/3 w-2/3 border rounded-xl 
      flex flex-col items-center"
    >
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
      <div className="w-full flex justify-end">
        <button onClick={()=>router.back()}>
          <IoIosClose className="text-2xl" />
        </button>
      </div>
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
              console.log(taskStatus);
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
              console.log(taskPriority);
              setTaskPriority(e.target.value);
            }}
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </label>
        {/* created_at: Date; */}
        <input
          type="submit"
          value="Enviar"
          className="w-full p-2 bg-hot-700 text-cold-700 rounded"
        />
      </form>
    </section>
  );
}
