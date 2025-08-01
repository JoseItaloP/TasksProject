import { ErroType, taskType } from "@/app/_constructor/_Types";
import { AuthContext } from "@/app/contexts/AuthContext";
import Link from "next/link";
import { useContext, useState } from "react";
import { IoIosClose } from "react-icons/io";



export function LiTaks({ task }: { task: taskType }) {

  const [openDelete, setOpenDelete] = useState(false)
  const [showDeletOption, setShowDeleteOption] = useState(false)
  const [erros, setErros] = useState<ErroType[]>()
  const { deleteTask } = useContext(AuthContext)

  async function hamdleDelete() {
    const returnOfDelete = await deleteTask(task.id)
    if (returnOfDelete) {
      setErros(returnOfDelete)
      setShowDeleteOption(false)
    }
    setShowDeleteOption(false)
  }

  const getPriorityC = () => {
    switch (task.Priority) {
      case "baixa":
        return "text-baixa";
      case "media":
        return "text-media";
      case "alta":
        return "text-alta";
      default:
        return "";
    }
  };

  const getStatusC = () => {
    switch (task.Status) {
      case "atuando":
        return "text-atuando";
      case "completa":
        return "text-completa";
      case "abandonada":
        return "text-abandonada";
      default:
        return "";
    }
  };

  return (
    <li>
      {
        showDeletOption ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-cold-900 border-hot-800 border p-6 rounded-lg shadow-lg text-white">
              <h1 className="text-xl font-bold mb-4">Deseja realmente deletar esta task?</h1>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => hamdleDelete()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold"
                >
                  Sim
                </button>
                <button
                  onClick={() => {
                    setShowDeleteOption(false)
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md font-semibold"
                >
                  Não
                </button>
              </div>
            </div>
          </div>
        ) : ''
      }
      {erros ? <div className="absolute top-0" key={erros.length}>
        {erros.map((erro) => (
          <div
            key={erro.erroId}
            className="w-full bg-yellow-300 text-zinc-800 flex items-center p-2 rounded shadow-lg mt-4 text-xl"
          >
            <p className="flex-1">{erro.message}</p>
            <IoIosClose
              className="cursor-pointer text-2xl ml-2"
              onClick={() =>

                setErros((prev) => {
                  if (prev) {
                    return prev.filter((e) => e.erroId !== erro.erroId)
                  }
                })}

            />
          </div>
        ))}
      </div>
        : ''
      }
      <Link
        href={`/User/Task/${task.id}`}
        data-testid={`test_${task.id}`}
        className="bg-cold-900 border border-hot-800
         rounded flex items-center justify-between
         my-2 h-16 p-2 buttonHAnimation relative"
        onMouseEnter={() => setOpenDelete(true)}
        onMouseLeave={() => setOpenDelete(false)}
      >

        <h1 className="text-2xl font-bold mr-4 left-0 w-1/6 overflow-hidden whitespace-nowrap">
          {task.Nome}
        </h1>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap w-4/6">
          {task.Descricao}
        </p>
        <section
          className="ml-4 w-1/6 flex items-center max-[900px]:flex-col max-[900px]:mr-2  ">
          <h2 className={`text-sm font-bold ${getPriorityC()}`}>
            {task.Priority}
          </h2>
          <strong className="mx-1 
          max-[900px]:rotate-90 max-[900px]:-my-1">|</strong>
          <h2 className={`text-sm font-bold ${getStatusC()}`}>{task.Status}</h2>
          <strong className="mx-1 
          max-[900px]:rotate-90 max-[900px]:-my-1">|</strong>
          <h2
            className={`text-sm font-bold 
          ${openDelete ? "text-cold-900" : "text-red-500"} 
          hover:underline`}
            onClick={(e) => {
              e.preventDefault();
              setShowDeleteOption(true)
            }}
          >Deletar</h2>
        </section>
      </Link>
    </li>
  );
}
