
import { IoIosClose } from "react-icons/io";
import { taskType } from "./_Types";
import Link from "next/link";

export default function taskBody(task: taskType){
    return (<div>
    
        <section
        className="bg-cold-700 p-2 text-hot-800
            border-b-2 border-hot-900 rounded-t-lg
            top-0 w-full
            flex items-center justify-between
            "
      >
        <h1>{task.Nome}</h1>
        <Link href={"/User"}>
          <IoIosClose className="text-2xl" />
        </Link>
      </section>
      <section className="m-4 h-full">
        <div className="h-4/5">
          <h2 className="flex justify-between items-center" >
            <p>Descrição</p>
            <button>Editar</button>
          </h2>
          <p
            className="bg-cold-600 border border-hot-800 rounded text-hot-800 p-2 
                    h-full
                    overflow-auto text-ellipsis 
                    "
          >
            {task.Descricao}
          </p>
        </div>
        {/* <div className="flex mt-6">
          <h3>Status </h3>:
          <p
            className={` ml-2 ${getStatus} 
                        ${ColorLineS ? "textoLinha" : ""}
                        `}
          >
            {" "}
            {task.Status}
          </p>
        </div>
        <div className="flex">
          <h3>Prioridade </h3>:
          <p
            className={`ml-2 ${getPriority}
                        ${ColorLineP ? "textoLinha" : ""}
                        `}
          >
            {" "}
            {task.Priority}
          </p>
        </div> */}
      </section>
      </div>
    )
}